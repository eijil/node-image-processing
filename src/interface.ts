/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: string;
}

export interface IGetUserResponse {
  success: boolean;
  message: string;
  data: IUserOptions;
}

export interface IUploadFiles {
  //文件名
  filename: string;
  //服务器临时地址
  data: string;
}

export enum CompressType {
  TinyPng = '1',
  Normal = '0',
  None = '2',
}

export interface IUploadFields {
  /**
   * 是否压缩
   */
  compress?: CompressType;
  /**
   * 是否生成webp
   */
  webp?: string;
  /**
   * 等比缩放
   */
  resize?: string;
}

// fanhui
export interface IUploadResponse {
  file?: string;
  name: string;
  url: string;
  extraInfo?: IExrtaInfo;
  processTime?: number;
}

export interface IExrtaInfo {
  input: string;
  output: string;
  save: string;
}

export interface ITinyResponse {
  input: {
    size: number;
    type?: string;
  };
  output: {
    size: number;
    width?: number;
    height?: number;
    type?: string;
    ratio?: number;
    url?: string;
  };
}
