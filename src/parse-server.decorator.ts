import { CustomDecorator, SetMetadata } from '@nestjs/common';
import type Parse from 'parse';
import * as ParseServerConst from './parse-server.constants';

// job & func
export function ParseCloudJob(name: string): CustomDecorator {
  return SetMetadata(ParseServerConst.PARSE_SERVER_CLOUD_JOB_OPTIONS, name);
}

export function ParseCloudFunction(name: string): CustomDecorator {
  return SetMetadata(ParseServerConst.PARSE_SERVER_CLOUD_FUNC_OPTIONS, name);
}

// cloud save triggers
export function ParseCloudBeforeSave(
  name: string | string[] | Object,
): CustomDecorator {
  return SetMetadata(
    ParseServerConst.PARSE_SERVER_CLOUD_BEFORE_SAVE_OPTIONS,
    name,
  );
}
export function ParseCloudAfterSave(
  name: string | string[] | Parse.Object,
): CustomDecorator {
  return SetMetadata(
    ParseServerConst.PARSE_SERVER_CLOUD_AFTER_SAVE_OPTIONS,
    name,
  );
}

// cloud delete triggers
export function ParseCloudBeforeDelete(
  name: string | string[] | Parse.Object,
): CustomDecorator {
  return SetMetadata(
    ParseServerConst.PARSE_SERVER_CLOUD_BEFORE_DELETE_OPTIONS,
    name,
  );
}
export function ParseCloudAfterDelete(
  name: string | string[] | Parse.Object,
): CustomDecorator {
  return SetMetadata(
    ParseServerConst.PARSE_SERVER_CLOUD_AFTER_DELETE_OPTIONS,
    name,
  );
}

// cloud find triggers
export function ParseCloudBeforeFind(
  name: string | string[] | Parse.Object,
): CustomDecorator {
  return SetMetadata(
    ParseServerConst.PARSE_SERVER_CLOUD_BEFORE_FIND_OPTIONS,
    name,
  );
}
export function ParseCloudAfterFind(
  name: string | string[] | Parse.Object,
): CustomDecorator {
  return SetMetadata(
    ParseServerConst.PARSE_SERVER_CLOUD_AFTER_FIND_OPTIONS,
    name,
  );
}

// session triggers
export function ParseCloudBeforeLogin(): CustomDecorator {
  return SetMetadata(
    ParseServerConst.PARSE_SERVER_CLOUD_BEFORE_LOGIN_OPTIONS,
    true,
  );
}
export function ParseCloudAfterLogout(): CustomDecorator {
  return SetMetadata(
    ParseServerConst.PARSE_SERVER_CLOUD_AFTER_LOGOUT_OPTIONS,
    true,
  );
}
