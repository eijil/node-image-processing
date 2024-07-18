import { ITinyResponse } from '../../interface';
import { v1 as uuidv1 } from 'uuid';

function RoundNum(num = 0, dec = 2, per = false) {
  // a**b表示a的b次方
  return per
    ? Math.round(num * 10 ** dec * 100) / 10 ** dec + '%'
    : Math.round(num * 10 ** dec) / 10 ** dec;
}

function OutPutHandler(output: ITinyResponse) {
  return {
    input: (output.input.size / 1000).toFixed(2) + 'KB',
    output: (output.output.size / 1000).toFixed(2) + 'KB',
    save: RoundNum(1 - output.output.size / output.input.size, 0, true),
  };
}

function uuidFileName(file: any) {
  const ext = file.filename.split('.').pop();
  return `${uuidv1()}.${ext}`;
}

export function isJPEG(filename: string) {
  return /\.(jpg|jpeg)$/i.test(filename);
}

export function isPNG(filename: string) {
  return /\.(png)$/i.test(filename);
}

export { OutPutHandler, RoundNum, uuidFileName };
