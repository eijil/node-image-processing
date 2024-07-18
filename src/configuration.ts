import { Configuration, ILifeCycle } from '@midwayjs/core';

import * as upload from '@midwayjs/upload';
import { join } from 'path';
import * as egg from '@midwayjs/web';
import * as validate from '@midwayjs/validate';
import * as crossDomain from '@midwayjs/cross-domain';

@Configuration({
  imports: [
    egg,
    validate,
    upload,
    process.env.NODE_ENV === 'local' ? crossDomain : null,
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle implements ILifeCycle {}
