import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
const uuid = require('uuid');
const {
  default: ParseServer,
  ParseGraphQLServer,
  InMemoryCacheAdapter,
  logger,
} = require('parse-server');
const {
  ParseServerOptions,
  LiveQueryOptions,
} = require('parse-server/lib/Options/Definitions');
const parseDashboard = require('parse-dashboard/Parse-Dashboard/app');
import { ParseServerOptionsInterface } from '.';
const express = require('express');
const url = require('url');
const debug = require('debug')('nest-parse-server:ParseServerService');

@Injectable()
export class ParseServerService {
  private readonly logger = new Logger(ParseServerService.name);
  private static parseServer: any;
  private readonly parseOptions: ParseServerOptionsInterface;
  public readonly parseGraphQLServer: any;
  public readonly expressApp;
  private static dashboard: any = undefined;
  private dashboardConfig: any = undefined;

  constructor(
    private readonly configService: ConfigService,
    private adapterHost: HttpAdapterHost,
    @Inject('PARSE_SERVER_OPTION_PROVIDER')
    providerOptions: ParseServerOptionsInterface,
  ) {
    const parseOptions = (this.parseOptions = this.getConfig());
    const options = this.parseOptions;

    if (providerOptions) {
      Object.assign(options, providerOptions);
      debug('providerOptions', options);
    }

    const parseServer = (ParseServerService.parseServer = new ParseServer(
      options,
    ));

    if (options.mountGraphQL === true) {
      this.parseGraphQLServer = new ParseGraphQLServer(parseServer, {
          graphQLPath: '*',
        });
      const app = new express();
      this.parseGraphQLServer.applyGraphQL(app);
      this.parseGraphQLServer.app = app;
      // this.logger.log(options.graphQLPath, 'parseGraphQLServer');
    }
  }

  // onModuleInit() {
  onApplicationBootstrap() {
    this.startQueryServer();
  }

  startQueryServer() {
    let parseOptions = this.getConfig();
    if (
      parseOptions.liveQuery !== undefined &&
      Array.isArray(parseOptions.liveQuery.classNames) &&
      parseOptions.liveQuery.classNames.length > 0
    ) {
      this.logger.log(
        'Parse-LiveQueryServer live classes: ' +
          parseOptions.liveQuery.classNames.join(','),
      );
      ParseServer.createLiveQueryServer(
        this.adapterHost.httpAdapter.getHttpServer(),
        this.parseOptions.liveQuery,
      );
    } else {
      this.logger.log('Parse-LiveQueryServer: 不启用liveq query');
    }
  }

  /**
   *
   * @returns ParseServer instance
   */
  getParseServer() {
    return ParseServerService.parseServer;
  }

  getConfig(): ParseServerOptionsInterface {
    if (this.parseOptions) {
      return this.parseOptions;
    }

    const config: any = this.getParseOptionFromEnv();
    // Reflect.set(config, 'loggerAdapter', this.getLoggerAdapter());

    // 设置默认日志
    if (!Reflect.has(config, 'loggerAdapter')) {
      let PARSE_SERVER_LOGGER_ADAPTER = {
        module: 'parse-server/lib/Adapters/Logger/WinstonLoggerAdapter',
        options: {
          logsFolder: './logs',
          jsonLogs: true,
          logLevel: 'debug',
          silent: false,
          maxLogFiles: 10,
        },
      };
      Reflect.set(config, 'loggerAdapter', PARSE_SERVER_LOGGER_ADAPTER);
    }

    // 设置默认缓存
    if (!Reflect.has(config, 'cacheAdapter')) {
      let PARSE_SERVER_CACHE_ADAPTER = {
        module: 'parse-server/lib/Adapters/Cache/InMemoryCacheAdapter',
        options: {
          ttl: 5000,
          maxSize: 10000,
        },
      };
      Reflect.set(config, 'cacheAdapter', PARSE_SERVER_CACHE_ADAPTER);
    }

    config.serverStartComplete = (err) => {
      if (err) {
        this.logger.error(err);
      } else {
        this.logger.log('on serverStartComplete');
      }
    };

    return config;
  }

  private getParseOptionFromEnv() {
    let getOptionFromDefinitions = (
      Definitions: typeof ParseServerOptions | typeof LiveQueryOptions,
    ) => {
      let options = {};
      Object.keys(Definitions).forEach((key) => {
        let { env, action } = Reflect.get(Definitions, key);

        let value = this.configService.get(env);

        if (value !== undefined) {
          // debug('Definitions', env, value);
          Reflect.set(
            options,
            key,
            typeof action === 'function' ? action(value) : value,
          );
        }
      });
      return options;
    };

    const liveQuery = getOptionFromDefinitions(LiveQueryOptions);
    const parseOptions = getOptionFromDefinitions(ParseServerOptions);
    Reflect.set(parseOptions, 'liveQuery', liveQuery);

    return parseOptions;
  }

  getDashBoard() {
    if (ParseServerService.dashboard) {
      return ParseServerService.dashboard;
    }

    let config = this.getDashboardConfig();
    if (!config) {
      return;
    }
    debug('getDashBoard this.dashboard', config);
    let dash = parseDashboard(config, {
      allowInsecureHTTP: true,
      cookieSessionSecret: uuid.v4(),
      dev: true,
    });
    let app = express();
    app.use(config.mountPath, dash);
    ParseServerService.dashboard = dash;
    return dash;
  }

  getDashboardConfig() {
    if (this.dashboardConfig) {
      return this.dashboardConfig;
    }

    if (!this.configService.get<String>('PARSE_DASHBOARD_MOUNTPATH')) {
      return;
    }

    const {
      publicServerURL,
      appId,
      masterKey,
      readOnlyMasterKey,
      graphQLPath,
    } = this.getConfig();
    this.dashboardConfig = {
      apps: [
        {
          serverURL: publicServerURL,
          graphQLServerURL:
            this.parseOptions.mountGraphQL &&
            url.resolve(publicServerURL, graphQLPath),
          appId: appId,
          masterKey: masterKey,
          readOnlyMasterKey: readOnlyMasterKey,
          appName: this.configService.get<String>(
            'PARSE_DASHBOARD_APP_NAME',
            'parse-server',
          ),
          production: true,
          primaryBackgroundColor: this.configService.get<String>(
            'PARSE_DASHBOARD_PRIMARY_COLOR',
            '#0c5582',
          ), // default light blue
          secondaryBackgroundColor: this.configService.get<String>(
            'PARSE_DASHBOARD_SECONDARY_COLOR',
            '#169cee;',
          ), // OrangeRed
        },
      ],
      users: [
        {
          user: this.configService.get<String>(
            'PARSE_DASHBOARD_USERNAME',
            'admin',
          ),
          pass: this.configService.get<String>(
            'PARSE_DASHBOARD_PASSWORD',
            uuid.v4(),
          ),
          apps: [{ appId }],
        },
        {
          user: this.configService.get<String>(
            'PARSE_DASHBOARD_USERNAME_RO',
            'user',
          ),
          pass: this.configService.get<String>(
            'PARSE_DASHBOARD_PASSWORD_RO',
            uuid.v4(),
          ),
          apps: [{ appId, readOnly: true }],
        },
      ],
      trustProxy: true,
      mountPath: this.configService.get<String>(
        'PARSE_DASHBOARD_MOUNTPATH',
        '/dashboard',
      ),
      dashboardPublicURL: url.resolve(
        publicServerURL,
        this.configService.get<String>(
          'PARSE_DASHBOARD_MOUNTPATH',
          '/dashboard',
        ),
      ),
    };

    if (this.dashboardConfig.mountPath.indexOf('/') !== 0) {
      this.dashboardConfig.mountPath = '/' + this.dashboardConfig.mountPath;
    }
    return this.dashboardConfig;
  }
}
