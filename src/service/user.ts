import { Provide, Inject } from '@midwayjs/core';
import { IUserOptions } from '../interface';

import { OssService } from './ossService';
@Provide()
export class UserService {
  @Inject()
  ossService: OssService;

  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: '',
    };
  }
}
