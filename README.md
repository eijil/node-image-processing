# 图片处理服务

nodejs图片处理和上传OSS服务，图片处理基于[Sharp](https://sharp.pixelplumbing.com/)库，同时支持[TinyPng](https://tinypng.com/)压缩。


## 功能

 - jpg,png压缩
 - 批量裁剪
 - 转webp


## api

- **Host**: ``
- **API Endpoint**: `/api/upload_v2`
- **Method**: `POST`


### 请求参数

| 参数名        | 类型          | 描述                           | 是否必须 | 可选值示例         | 默认值 |
|---------------|---------------|--------------------------------|----------|--------------------|--------|
| file          | File          | 上传的文件                     | 必须      | -                   | -      |
| compress      | String        | 图片压缩类型 CompressType                  | 可选      | '0','1', '2'     | 2      |
| webp          | Boolean       | 是否生成Webp格式图片           | 可选      | true/false          | false  |
| resize        | string        | 根据宽度等比缩放,多个使用逗号分割             | 可选      | 250                   | -      |

**CompressType**
  * 0 : 使用sharp的api
  * 1 : tinyPng.com服务压缩
  * 2 : none 没有任何处理

### 请求示例

```json
{
  "file": "path/to/your/image.jpg",
  "compress": "1",
  "webp": true,
  "resize": 500
}

{
  "success": true,
  "message": "ok",
  "data": [
    {
      "file": "xxx.jpg",
      "name": "xx.jpg",
      "url": "https://example.com/path/to/image.jpg",
      "webp_url": "https://example.com/path/to/image.jpg.webp",
      "resize_url": "https://example.com/path/to/w500_xxx.jpg",
      "extraInfo": {
        "input": "100KB",
        "output": "50KB",
        "save": "50%"
      }
    }
  ]
}
```
### 响应字段说明
 * success: 请求是否成功。
 * message: 请求结果的描述信息。
 * data: 成功时返回的数据列表，包含以下字段：
    * file: 原文件名。
    * name: 新生成的唯一文件名。
    * url: 原图文件地址。
    * webp_url: Webp格式图片地址（如果生成）。
    * w{size}_resize_url: 缩放后的图片地址。
    * extraInfo: 额外信息，包括：
      * input: 原始文件大小。
      * output: 处理后的文件大小。
      * save: 节省的百分比。


### 前端使用示例

##### HTML
```
<form action="{api}" method="post" enctype="multipart/form-data">
  File: <input type="file" name="file" /><br />
  <input type="submit" value="Submit" />
</form>
```
##### FormData
```
const fileInput = document.querySelector('#your-file-input') ;
const formData = new FormData();
formData.append('file', fileInput.files[0]);

fetch('/api/upload', {
  method: 'POST',
  body: formData,
});
```


### Development

```bash
$ npm i
$ npm run dev

```

### Deploy



```
$ npm run build
$ npm start


```

### 部署可能会遇到的问题

nodejs版本 >= 20

``` bash


# centos7

RUN yum -y install build-essential nasm autoconf automake libtool nasm gcc g++ libpng libpng-devel

# alpine
apk add build-base autoconf automake libtool nasm libpng-dev
```
