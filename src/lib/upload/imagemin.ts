/** 废弃 */
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import { TMP_DIR, IMG_REGEXP } from './constanst';
import fs from 'fs/promises';
import { ITinyResponse } from '../../interface';

export async function compressImage(
  path: string,
  quality = '80'
): Promise<Partial<ITinyResponse>> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      if (!IMG_REGEXP.test(path)) {
        resolve(null);
        return;
      }

      const inputStats = await fs.stat(path);
      const inputSize = inputStats.size;

      await imagemin([path], {
        destination: TMP_DIR,
        plugins: [
          imageminMozjpeg({
            quality: parseInt(quality),
          }),
          imageminPngquant(),
        ],
      });

      const outputStats = await fs.stat(path);
      const outputSize = outputStats.size;

      const result = {
        input: {
          size: inputSize,
        },
        output: {
          size: outputSize,
        },
      };

      resolve(result);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}
