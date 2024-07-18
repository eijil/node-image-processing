import { App, Init, Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { Application } from 'egg';
import OSS from 'ali-oss';
import { IUploadResponse } from '../interface';

@Provide()
@Scope(ScopeEnum.Singleton)
export class OssService {
  @App()
  app: Application;

  private client: OSS;

  @Init()
  async init() {
    const config = this.app.getConfig().OSS;
    const OSS_CONFIG = {
      accessKeyId: config.OSS_ACCESSKEY,
      accessKeySecret: config.OSS_SECRET,
      bucket: config.OSS_BUCKET,
      endpoint: config.OSS_ENDPOINT,
    };
    this.client = new OSS(OSS_CONFIG);
  }

  async uploadOss(file: {
    filename: string;
    data: string | Buffer;
  }): Promise<IUploadResponse> {
    return new Promise((resolve, reject) => {
      this.client
        .put('images/' + file.filename, file.data, {
          headers: {
            'x-oss-forbid-overwrite': 'true',
          },
        })
        .then(res => {
          resolve({
            name: file.filename,
            url: res.url.replace(
              'http://v-out.oss-ap-southeast-1.aliyuncs.com/',
              'https://v-mps.crazymaplestudios.com/'
            ),
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
