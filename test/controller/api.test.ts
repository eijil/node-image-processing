import { createApp, close, createHttpRequest } from "@midwayjs/mock";
import { Framework } from "@midwayjs/web";
import { Application } from "egg";
import * as assert from 'assert';

describe("test/controller/api.test.ts", () => {
  let app: Application;

  beforeAll(async () => {
    // create app
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

 it("should upload a file", async () => {
    const request = createHttpRequest(app);

    // 模拟一个文件上传请求
    const response = await request
      .post('/api/upload')
      .attach('file', `${process.cwd()}/.eslintrc.json`); // 使用 .attach 方法添加文件

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);
  });
  

});
