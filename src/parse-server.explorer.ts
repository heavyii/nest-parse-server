import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
const Parse = require('parse/node');
import * as ParseServerConst from './parse-server.constants';

@Injectable()
export class ParseServerExplorer implements OnModuleInit {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
  ) {}

  onModuleInit() {
    this.explore();
  }

  explore() {
    // get all
    const providers: InstanceWrapper[] = this.discoveryService.getProviders();
    providers.forEach((wrapper: InstanceWrapper) => {
      const { instance } = wrapper;
      if (!instance) {
        return;
      }
      this.metadataScanner.scanFromPrototype(
        instance,
        Object.getPrototypeOf(instance),
        (key) => {
          this.parseCloudJob(instance, key);
          this.parseCloudFunction(instance, key);
          this.parseCloudBeforeSave(instance, key);
          this.parseCloudAfterSave(instance, key);
        },
      );
    });
  }

  parseCloudSetName(
    funcName: 'define' | 'job' | 'beforeSave' | 'afterSave',
    refKey: string,
  ) {
    return (instance: any, key: string) => {
      const name: any = this.reflector.get(refKey, instance[key]);
      if (!name) {
        return;
      }

      if (Array.isArray(name)) {
        name.forEach((myName) => {
          Parse.Cloud[funcName](myName, instance[key].bind(instance));
        });
      }
      if (name) {
        Parse.Cloud[funcName](name, instance[key].bind(instance));
      }
    };
  }

  parseCloudJob(instance: any, key: string) {
    this.parseCloudSetName(
      'job',
      ParseServerConst.PARSE_SERVER_CLOUD_JOB_OPTIONS,
    )(instance, key);
  }

  parseCloudFunction(instance: any, key: string) {
    this.parseCloudSetName(
      'define',
      ParseServerConst.PARSE_SERVER_CLOUD_FUNC_OPTIONS,
    )(instance, key);
  }

  parseCloudBeforeSave(instance: any, key: string) {
    this.parseCloudSetName(
      'beforeSave',
      ParseServerConst.PARSE_SERVER_CLOUD_BEFORE_SAVE_OPTIONS,
    )(instance, key);
  }

  parseCloudAfterSave(instance: any, key: string) {
    this.parseCloudSetName(
      'afterSave',
      ParseServerConst.PARSE_SERVER_CLOUD_AFTER_SAVE_OPTIONS,
    )(instance, key);
  }
}
