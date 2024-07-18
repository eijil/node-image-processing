import { Middleware, IMiddleware, Provide } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/web';

@Provide()
@Middleware()
export class ResponseMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const result = await next();
      return {
        code: 0,
        msg: 'OK',
        data: result,
      };
    };
  }
  static getName(): string {
    return 'response';
  }
}
