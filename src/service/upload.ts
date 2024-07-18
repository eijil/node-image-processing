import { App, Inject, Provide } from '@midwayjs/core';
import { Application } from 'egg';
import { UploadFieldsDTO } from '../dto/upload';
import { CompressType, IUploadFiles } from '../interface';

import sharp from 'sharp';
import { IMG_REGEXP } from '../lib/upload/constanst';
import { compressImage } from '../lib/upload/compress';
import TinyPng from '../lib/upload/tinypng';
import { OutPutHandler, uuidFileName } from '../lib/upload/utils';
import { OssService } from './ossService';

@Provide()
export class UploadService {
  @App()
  app: Application;

  @Inject()
  ossService: OssService;

  public async upload(files: IUploadFiles[], fields: UploadFieldsDTO) {
    let response: any = {};
    const file = files[0];

    const isImage = IMG_REGEXP.test(file.data);

    const startTime = Date.now();
    //compress
    const { compress, webp, resize, quality } = fields;

    let extraInfo: any = {};
    //set new filename
    file.filename = uuidFileName(file);

    if (!isImage) {
      return await this.ossService.uploadOss(file);
    }

    // tinyPng
    if (compress === CompressType.TinyPng) {
      const info: any = await TinyPng(file.data);
      extraInfo = OutPutHandler(info);
    }

    // Normal
    if (compress === CompressType.Normal) {
      const info: any = await compressImage(file.data, quality);
      extraInfo = OutPutHandler(info);
      if (extraInfo.path) {
        file.data = extraInfo.path;
      }
    }

    response = await this.ossService.uploadOss(file);

    // 有webp参数就生成webp图片
    if (webp === 'true') {
      const buffer = await sharp(file.data).webp().toBuffer();
      const uploadRes = await this.ossService.uploadOss({
        filename: `${file.filename}.webp`,
        data: buffer,
      });
      if (uploadRes.url) {
        response.webp_url = uploadRes.url;
      }
    }

    if (resize) {
      const sizes = resize.split(',');
      for (const size of sizes) {
        if (size === 'undefined' || size === '' || size === undefined) {
          break;
        }
        const resize = parseInt(size);
        if (resize <= 0) {
          break;
        }

        const buffer = await sharp(file.data)
          .resize({
            width: resize,
          })
          .toBuffer();
        const uploadRes = await this.ossService.uploadOss({
          filename: `w${resize}_${file.filename}`,
          data: buffer,
        });
        if (uploadRes.url) {
          response[`${size}_resize_url`] = uploadRes.url;
        }
        //如果有webp参数就生成webp图片
        if (webp === 'true') {
          const webp_buffer = await sharp(buffer).webp().toBuffer();
          const uploadRes = await this.ossService.uploadOss({
            filename: `w${resize}_${file.filename}.webp`,
            data: webp_buffer,
          });
          if (uploadRes.url) {
            response[`${size}_resize_webp_url`] = uploadRes.url;
          }
        }
      }
    }

    // 计算接口耗时
    const endTime = Date.now();
    response.processTime = endTime - startTime;
    response.extraInfo = extraInfo;

    return response;
  }
}
