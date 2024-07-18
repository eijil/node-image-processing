import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';
import { join } from 'path';

export default (appInfo: MidwayAppInfo) => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1691744861141_5965',
    egg: {
      port: 7001,
    },
    security: {
      csrf: {
        enable: false,
      },
      xframe: {
        enable: false,
      },
    },
    upload: {
      tmpdir: join(process.cwd(), 'upload-files'),
      cleanTimeout: 5 * 60 * 1000,
      whitelist: [
        '.jpg',
        '.jpeg',
        '.png',
        '.gif',
        '.bmp',
        '.wbmp',
        '.webp',
        '.tif',
        '.tiff',
        '.psd',
        '.svg',
        '.js',
        '.jsx',
        '.json',
        '.css',
        '.less',
        '.html',
        '.htm',
        '.xml',
        '.pdf',
        '.zip',
        '.gz',
        '.tgz',
        '.gzip',
        '.mp3',
        '.mp4',
        '.avi',
        '.woff2',
        '.ttf',
        '.xlsx',
      ],
      match: /\/api\/upload(.*)?/,
    },
    validate: {
      validationOptions: {
        //删除接口未定义参数，全局生效
        stripUnknown: true,
      },
    },

    OSS: {
      OSS_ACCESSKEY: '',
      OSS_SECRET: '',
      OSS_ENDPOINT: '',
      OSS_BUCKET: '',
    },
  } as MidwayConfig;
};
