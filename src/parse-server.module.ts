import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { PARSE_SERVER_OPTION_PROVIDER } from './parse-server.constants';
import { ParseServerExplorer } from './parse-server.explorer';
import { ParseServerService } from './parse-server.service';
import { ParseServerModuleAsyncOptions, ParseServerOptionsInterface } from '.';
const debug = require('debug')('nest-parse-server:ParseServerModule');
@Module({
  imports: [DiscoveryModule],
  providers: [ParseServerService, ParseServerExplorer],
  exports: [ParseServerService, ParseServerExplorer],
})
export class ParseServerModule implements OnModuleInit {
  private readonly logger = new Logger(ParseServerModule.name);
  constructor(private readonly parseServerService: ParseServerService) {}

  onModuleInit() {}

  configure(consumer: MiddlewareConsumer) {
    const dashboard = this.parseServerService.getDashBoard();
    if (dashboard) {
      let { mountPath: dashboardMountPath, dashboardPublicURL } =
        this.parseServerService.getDashboardConfig();
      this.logger.log('dashboard: ' + dashboardPublicURL);
      consumer.apply(dashboard).forRoutes(dashboardMountPath || 'dashboard');
    }

    const { mountPath, graphQLPath, publicServerURL } =
      this.parseServerService.getConfig();
    this.logger.log('parse-server: ' + publicServerURL);
    consumer
      .apply(this.parseServerService.getParseServer().app)
      .forRoutes(mountPath);

    if (Reflect.has(this.parseServerService.parseGraphQLServer || {}, 'app')) {
      this.logger.log('parse-GraphQLServer path: ' + graphQLPath);
      consumer
        .apply(this.parseServerService.parseGraphQLServer.app)
        .forRoutes(graphQLPath);
    }
  }

  public static forRootAsync(
    options: ParseServerModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: ParseServerModule,
      imports: options.imports,
      providers: [
        {
          provide: PARSE_SERVER_OPTION_PROVIDER,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        ParseServerExplorer,
        ParseServerService,
      ],
      exports: [],
      global: true,
    };
  }
}
