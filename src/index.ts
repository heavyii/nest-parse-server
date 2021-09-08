import { ModuleMetadata } from '@nestjs/common';

export * from './parse-server.module';
export * from './parse-server.service';
export * from './parse-server.decorator';

export interface ParseServerOptionsInterface {
  /* Your Parse Application ID
    :ENV: PARSE_SERVER_APPLICATION_ID */
  appId: string;
  /* Your Parse Master Key */
  masterKey: string;
  /* URL to your parse server with http:// or https://.
    :ENV: PARSE_SERVER_URL */
  serverURL: string;
  /* Restrict masterKey to be used by only these ips, defaults to [] (allow all ips)
    :DEFAULT: [] */
  masterKeyIps?: string[];
  /* Sets the app name */
  appName?: string;
  /* Add headers to Access-Control-Allow-Headers */
  allowHeaders?: string[];
  /* Sets the origin to Access-Control-Allow-Origin */
  allowOrigin?: string;
  /* Adapter module for the analytics */
  analyticsAdapter?: any;
  /* Adapter module for the files sub-system */
  filesAdapter?: any;
  /* Configuration for push, as stringified JSON. See http://docs.parseplatform.org/parse-server/guide/#push-notifications */
  push?: any;
  /* Configuration for push scheduling, defaults to false.
    :DEFAULT: false */
  scheduledPush?: boolean;
  /* Adapter module for the logging sub-system */
  loggerAdapter?: any;
  /* Log as structured JSON objects
    :ENV: JSON_LOGS */
  jsonLogs?: boolean;
  /* Folder for the logs (defaults to './logs'); set to null to disable file based logging
    :ENV: PARSE_SERVER_LOGS_FOLDER
    :DEFAULT: ./logs */
  logsFolder?: string;
  /* Set the logging to verbose
    :ENV: VERBOSE */
  verbose?: boolean;
  /* Sets the level for logs */
  logLevel?: string;
  /* Maximum number of logs to keep. If not set, no logs will be removed. This can be a number of files or number of days. If using days, add 'd' as the suffix. (default: null) */
  maxLogFiles?: number | string;
  /* Disables console output
    :ENV: SILENT */
  silent?: boolean;
  /* The full URI to your database. Supported databases are mongodb or postgres.
    :DEFAULT: mongodb://localhost:27017/parse */
  databaseURI: string;
  /* Options to pass to the database client
    :ENV: PARSE_SERVER_DATABASE_OPTIONS */
  databaseOptions?: string;
  /* Adapter module for the database */
  databaseAdapter?: any;
  /* Full path to your cloud code main.js */
  cloud?: string;
  /* A collection prefix for the classes
    :DEFAULT: '' */
  collectionPrefix?: string;
  /* Key for iOS, MacOS, tvOS clients */
  clientKey?: string;
  /* Key for the Javascript SDK */
  javascriptKey?: string;
  /* Key for Unity and .Net SDK */
  dotNetKey?: string;
  /* Key for encrypting your files
    :ENV: PARSE_SERVER_ENCRYPTION_KEY */
  encryptionKey?: string;
  /* Key for REST calls
    :ENV: PARSE_SERVER_REST_API_KEY */
  restAPIKey?: string;
  /* Read-only key, which has the same capabilities as MasterKey without writes */
  readOnlyMasterKey?: string;
  /* Key sent with outgoing webhook calls */
  webhookKey?: string;
  /* Key for your files */
  fileKey?: string;
  /* Enable (or disable) the addition of a unique hash to the file names
    :ENV: PARSE_SERVER_PRESERVE_FILE_NAME
    :DEFAULT: false */
  preserveFileName?: boolean;
  /* Personally identifiable information fields in the user table the should be removed for non-authorized users. Deprecated @see protectedFields */
  userSensitiveFields?: string[];
  /* Protected fields that should be treated with extra security when fetching details.
    :DEFAULT: {"_User": {"*": ["email"]}} */
  protectedFields?: any;
  /* Enable (or disable) anonymous users, defaults to true
    :ENV: PARSE_SERVER_ENABLE_ANON_USERS
    :DEFAULT: true */
  enableAnonymousUsers?: boolean;
  /* Enable (or disable) client class creation, defaults to true
    :ENV: PARSE_SERVER_ALLOW_CLIENT_CLASS_CREATION
    :DEFAULT: true */
  allowClientClassCreation?: boolean;
  /* Enable (or disable) custom objectId
    :ENV: PARSE_SERVER_ALLOW_CUSTOM_OBJECT_ID
    :DEFAULT: false */
  allowCustomObjectId?: boolean;
  /* Configuration for your authentication providers, as stringified JSON. See http://docs.parseplatform.org/parse-server/guide/#oauth-and-3rd-party-authentication
    :ENV: PARSE_SERVER_AUTH_PROVIDERS */
  auth?: any;
  /* Max file size for uploads, defaults to 20mb
    :DEFAULT: 20mb */
  maxUploadSize?: string;
  /* Set to `true` to require users to verify their email address to complete the sign-up process.
    <br><br>
    Default is `false`.
    :DEFAULT: false */
  verifyUserEmails?: boolean;
  /* Set to `true` to prevent a user from logging in if the email has not yet been verified and email verification is required.
    <br><br>
    Default is `false`.
    <br>
    Requires option `verifyUserEmails: true`.
    :DEFAULT: false */
  preventLoginWithUnverifiedEmail?: boolean;
  /* Set the validity duration of the email verification token in seconds after which the token expires. The token is used in the link that is set in the email. After the token expires, the link becomes invalid and a new link has to be sent. If the option is not set or set to `undefined`, then the token never expires.
    <br><br>
    For example, to expire the token after 2 hours, set a value of 7200 seconds (= 60 seconds * 60 minutes * 2 hours).
    <br><br>
    Default is `undefined`.
    <br>
    Requires option `verifyUserEmails: true`.
    */
  emailVerifyTokenValidityDuration?: number;
  /* Set to `true` if a email verification token should be reused in case another token is requested but there is a token that is still valid, i.e. has not expired. This avoids the often observed issue that a user requests multiple emails and does not know which link contains a valid token because each newly generated token would invalidate the previous token.
    <br><br>
    Default is `false`.
    <br>
    Requires option `verifyUserEmails: true`.
    :DEFAULT: false */
  emailVerifyTokenReuseIfValid?: boolean;
  /* The account lockout policy for failed login attempts. */
  accountLockout?: any;
  /* The password policy for enforcing password related rules. */
  passwordPolicy?: any;
  /* Adapter module for the cache */
  cacheAdapter?: any;
  /* Adapter module for email sending */
  emailAdapter?: any;
  /* Public URL to your parse server with http:// or https://.
    :ENV: PARSE_PUBLIC_SERVER_URL */
  publicServerURL?: string;
  /* The options for pages such as password reset and email verification. Caution, this is an experimental feature that may not be appropriate for production.
    :DEFAULT: {} */
  pages?: any;
  /* custom pages for password validation and reset
    :DEFAULT: {} */
  customPages?: any;
  /* parse-server's LiveQuery configuration object */
  liveQuery?: any;
  /* Session duration, in seconds, defaults to 1 year
    :DEFAULT: 31536000 */
  sessionLength?: number;
  /* Max value for limit option on queries, defaults to unlimited */
  maxLimit?: number;
  /* Sets wether we should expire the inactive sessions, defaults to true
    :DEFAULT: true */
  expireInactiveSessions?: boolean;
  /* When a user changes their password, either through the reset password email or while logged in, all sessions are revoked if this is true. Set to false if you don't want to revoke sessions.
    :DEFAULT: true */
  revokeSessionOnPasswordReset?: boolean;
  /* Sets the TTL for the in memory cache (in ms), defaults to 5000 (5 seconds)
    :DEFAULT: 5000 */
  cacheTTL?: number;
  /* Sets the maximum size for the in memory cache, defaults to 10000
    :DEFAULT: 10000 */
  cacheMaxSize?: number;
  /* Set to `true` if Parse requests within the same Node.js environment as Parse Server should be routed to Parse Server directly instead of via the HTTP interface. Default is `false`.
    <br><br>
    If set to `false` then Parse requests within the same Node.js environment as Parse Server are executed as HTTP requests sent to Parse Server via the `serverURL`. For example, a `Parse.Query` in Cloud Code is calling Parse Server via a HTTP request. The server is essentially making a HTTP request to itself, unnecessarily using network resources such as network ports.
    <br><br>
    ⚠️ In environments where multiple Parse Server instances run behind a load balancer and Parse requests within the current Node.js environment should be routed via the load balancer and distributed as HTTP requests among all instances via the `serverURL`, this should be set to `false`.
    :DEFAULT: false */
  directAccess?: boolean;
  /* Enables the default express error handler for all errors
    :DEFAULT: false */
  enableExpressErrorHandler?: boolean;
  /* Sets the number of characters in generated object id's, default 10
    :DEFAULT: 10 */
  objectIdSize?: number;
  /* The port to run the ParseServer, defaults to 1337.
    :ENV: PORT
    :DEFAULT: 1337 */
  port?: number;
  /* The host to serve ParseServer on, defaults to 0.0.0.0
    :DEFAULT: 0.0.0.0 */
  host?: string;
  /* Mount path for the server, defaults to /parse
    :DEFAULT: /parse */
  mountPath?: string;
  /* Run with cluster, optionally set the number of processes default to os.cpus().length */
  cluster?: number | boolean;
  /* middleware for express server, can be string or function */
  middleware?: (() => void) | string;
  /* Starts the liveQuery server */
  startLiveQueryServer?: boolean;
  /* Live query server configuration options (will start the liveQuery server) */
  liveQueryServerOptions?: any;
  /* Options for request idempotency to deduplicate identical requests that may be caused by network issues. Caution, this is an experimental feature that may not be appropriate for production.
    :ENV: PARSE_SERVER_EXPERIMENTAL_IDEMPOTENCY_OPTIONS
    :DEFAULT: false */
  idempotencyOptions?: any;
  /* Options for file uploads
    :ENV: PARSE_SERVER_FILE_UPLOAD_OPTIONS
    :DEFAULT: {} */
  fileUpload?: any;
  /* Full path to your GraphQL custom schema.graphql file */
  graphQLSchema?: string;
  /* Mounts the GraphQL endpoint
    :ENV: PARSE_SERVER_MOUNT_GRAPHQL
    :DEFAULT: false */
  mountGraphQL?: boolean;
  /* Mount path for the GraphQL endpoint, defaults to /graphql
    :ENV: PARSE_SERVER_GRAPHQL_PATH
    :DEFAULT: /graphql */
  graphQLPath?: string;
  /* Mounts the GraphQL Playground - never use this option in production
    :ENV: PARSE_SERVER_MOUNT_PLAYGROUND
    :DEFAULT: false */
  mountPlayground?: boolean;
  /* Mount path for the GraphQL Playground, defaults to /playground
    :ENV: PARSE_SERVER_PLAYGROUND_PATH
    :DEFAULT: /playground */
  playgroundPath?: string;
  /* Callback when server has started */
  serverStartComplete?: (error?: Error) => void;
  /* Callback when server has closed */
  serverCloseComplete?: () => void;
  /* The security options to identify and report weak security settings.
    :DEFAULT: {} */
  security?: any;
}

export interface ParseServerModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) => ParseServerOptionsInterface | Promise<ParseServerOptionsInterface>;
  inject?: any[];
}
