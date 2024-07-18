import {
  App,
  Controller,
  Fields,
  Files,
  Get,
  Inject,
  Post,
} from '@midwayjs/core';
import { Application, Context } from 'egg';
import { ResponseMiddleware } from '../middleware/response';
import { IUploadFiles } from '../interface';
import { UploadFieldsDTO } from '../dto/upload';
import { UploadService } from '../service/upload';

@Controller('/api', { middleware: [ResponseMiddleware] })
export class APIController {
  @App()
  app: Application;
  @Inject()
  ctx: Context;

  @Inject()
  uploadService: UploadService;

  @Get('/')
  async getUser() {
    return 'hello';
  }

  @Post('/upload')
  async upload(
    @Files() files: IUploadFiles[],
    @Fields() fields: UploadFieldsDTO
  ) {
    const result = await this.uploadService.upload(files, fields);
    await this.ctx.cleanupRequestFiles();
    //返回的格式是个数组，其它和v2一样，暂时先不动
    return [result];
  }

  @Post('/upload_v2')
  async upload_v2(
    @Files() files: IUploadFiles[],
    @Fields() fields: UploadFieldsDTO
  ) {
    const result = await this.uploadService.upload(files, fields);
    await this.ctx.cleanupRequestFiles();
    return result;
  }
}
