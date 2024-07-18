import fs from 'fs';
import https from 'https';
import * as path from 'path';
import { ITinyResponse } from '../../interface';

export default async function TinyPng(
  filePath: string
): Promise<ITinyResponse> {
  const data = await upload(filePath);
  const url = `${data.output.url}?/${path.basename(filePath)}`;
  await downloadFile(url, filePath);

  return data;
}

// 伪造请求头，生成随机ip，避免请求数量限制
function randomHeader(): any {
  // 随机生成4位的ip
  const ip = Array.from(Array(4))
    .map(() => Math.random() * 255)
    .join('.');
  // const index = Math.floor(Math.random() * 3) % 3
  return {
    headers: {
      rejectUnauthorized: false,
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Postman-Token': Date.now(),
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
      'X-Forwarded-For': ip,
      'X-Real-IP': ip,
    },
    hostname: 'tinypng.com',
    method: 'POST',
    path: '/backend/opt/shrink',
  };
}

const upload = async (filePath: string): Promise<ITinyResponse> => {
  const options = randomHeader();
  const file = fs.createReadStream(filePath);

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let responseData = '';

      res.on('data', chunk => {
        responseData += chunk;
      });

      res.on('end', () => {
        resolve(JSON.parse(responseData));
      });
    });

    req.on('error', error => {
      reject(error);
    });

    file.pipe(req);
  });
};

function downloadFile(url: string, destinationPath: string) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destinationPath);
    const request = https.get(url, response => {
      response.pipe(file);

      file.on('finish', () => {
        file.close(() => {
          resolve(destinationPath);
        });
      });
    });
    request.on('error', error => reject(error));
    file.on('error', error => reject(error));
  });
}
