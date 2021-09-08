export interface ParseServerCloudOptions {
  type: 'function' | 'job' | 'beforeSave' | 'afterSave';
  name: string | string[] | Object;
}
