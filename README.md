# nest-parse-server

## Description

parse-server for nestjs

## Installation

```bash
$ npm install nest-parse-server --save
```

## Usage

### Import

nest-parse-server will register as a global module.

You can import with configuration

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ParseServerModule } from 'nest-parse-server';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    ParseServerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          appName: configService.get<string>('PARSE_SERVER_APP_NAME'),
          appId: configService.get<string>('PARSE_SERVER_APPLICATION_ID'),
          databaseURI: configService.get<string>('PARSE_SERVER_DATABASE_URI'),
          masterKey: configService.get<string>('PARSE_SERVER_MASTER_KEY'),
          serverURL: configService.get<string>('SERVER_URL'),
        }
      },
      inject: [ConfigService],
    })]
})
export class AppModule {}
```

## environment virables

```shell
PARSE_SERVER_APPLICATION_ID=YOUR_APP_ID
PARSE_SERVER_APP_NAME=YOUR_APP_NAME
PARSE_SERVER_MASTER_KEY=YOUR_MASTER_KEY
PARSE_SERVER_READ_ONLY_MASTER_KEY=YOUR_READ_ONLY_MASTER_KEY
PARSE_SERVER_MOUNT_PATH=/parse
# PARSE_SERVER_CLOUD=./cloud/main.js

# cloud-code下不用http访问parsse-server，内部直接访问， 需要负载均衡请设置false
PARSE_SERVER_DIRECT_ACCESS=true
PARSE_SERVER_ENABLE_EXPERIMENTAL_DIRECT_ACCESS=true

# 内网地址
SERVER_URL=http://localhost:1337/parse

# 外网地址
PARSE_PUBLIC_SERVER_URL=http://localhost:1337/parse


# 数据库，可选mongodb和postgre
# PARSE_SERVER_DATABASE_URI=mongodb://root:YOUR_PASSWORD@192.168.14.49:27017/data_server_local
PARSE_SERVER_DATABASE_URI=postgres://postgres:YOUR_PASSWORD@localhost:5432/datacenter?stringtype=unspecified&timezone=Asia/Shanghai&application_name=data-center

# 保护的字段,   JSON
PARSE_SERVER_PROTECTED_FIELDS={"*": { "*": ["ACL", "_rperm", "_wperm"], "": ["ACL", "_rperm", "_wperm"] },"_User":{"*":["email"]}}
# PARSE_SERVER_PROTECTED_FIELDS=ACL

# 允许客户端创建class， 可选值 true  false
PARSE_SERVER_ALLOW_CLIENT_CLASS_CREATION=true

# hook的key
PARSE_SERVER_WEBHOOK_KEY=YOUR_WEBHOOK_KEY

# 
# 日志，级别有 verbose debug info
PARSE_SERVER_LOG_LEVEL=debug

######### parse logger #########
#
# {
#	"module": "parse-server/lib/Adapters/Logger/WinstonLoggerAdapter",
#	"options": {
#		"logsFolder": "./logs",
#		"jsonLogs": true,
#		"logLevel": "verbose",
#		"silent": false, // 控制是否console输出
#		"maxLogFiles": 6
#	}
# }
#
PARSE_SERVER_LOGGER_ADAPTER={"module":"parse-server/lib/Adapters/Logger/WinstonLoggerAdapter","options":{"logsFolder":"./logs","jsonLogs":true,"logLevel":"verbose","silent":false,"maxLogFiles":6}}

######### parse 文件存储 #########
# 如果使用mongodb，可以不配置，默认用mongodb的gridFS
# 示例 {
#    "module": "@parse/fs-files-adapter",
#    "options": {
#      "filesSubDirectory": "my/files/folder", // optional, defaults to ./files
#      "encryptionKey": "someKey" //optional, but mandatory if you want to encrypt files
#    } 
#  }
#
PARSE_SERVER_FILES_ADAPTER={"module":"@parse/fs-files-adapter","options":{"filesSubDirectory":"./files"}}

# 文件存储的前缀
PARSE_SERVER_FILE_KEY=YOUR_FILE_KEY


######### parse的缓存 #########
#
# parse的redis缓存，parse-server的所有redis客户端都不会断开重连，断开后，会抛出异常终止程序，docker容器应该自动重启
# 注意，只能独享db，parse随时清理整个db
# 格式 PARSE_SERVER_REDIS_URL=[redis[s]:]//[[user][:password@]][host][:port][/db-number][?db=db-number[&password=bar[&option=value]]]

PARSE_SERVER_CACHE_ADAPTER={"module":"parse-server/lib/Adapters/Cache/RedisCacheAdapter","options":{"url": "redis://:YOUR_PASSWORD@localhost:6379?db=1"}}


######### live query 配置 #########
# 
# 配置支持 live query 的class， 格式: class1,class2,class3
PARSE_SERVER_LIVEQUERY_CLASSNAMES=GameScore

# 用于分布式live Query
# 格式 PARSE_SERVER_LIVEQUERY_REDIS_URL = [redis[s]:]//[[user][:password@]][host][:port][/db-number][?db=db-number[&password=bar[&option=value]]]
PARSE_SERVER_LIVEQUERY_REDIS_URL=redis://:YOUR_PASSWORD@localhost:6379?db=2



######### graphql 配置 #########

PARSE_SERVER_MOUNT_GRAPHQL=true
PARSE_SERVER_GRAPHQL_PATH=/graphql


PARSE_SERVER_ALLOW_ORIGIN=*
PARSE_SERVER_ALLOW_HEADERS=X-ENCRYPT-CONTEXT


PARSE_DASHBOARD_MOUNTPATH=/dashboard
PARSE_DASHBOARD_APP_NAME=YOUR_APP_NAME
PARSE_DASHBOARD_USERNAME=admin
PARSE_DASHBOARD_PASSWORD=admin
PARSE_DASHBOARD_USERNAME_RO=guest
PARSE_DASHBOARD_PASSWORD_RO=guest
```

## License

nest-parse-server is [MIT licensed](LICENSE).
