import fs from 'fs/promises';
import sharp from 'sharp';
import { isJPEG, isPNG } from './utils';
import { ITinyResponse } from '../../interface';
export async function compressImage(
  path: string,
  quality?: string
): Promise<Partial<ITinyResponse>> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async resolve => {
    try {
      const _quality = quality ? parseInt(quality) : 80;

      const inputStats = await fs.stat(path);
      const inputSize = inputStats.size;

      if (isJPEG(path)) {
        console.log({ isJPEG });
        const buttfer = await sharp(path)
          .jpeg({
            mozjpeg: true,
            quality: _quality,
          })
          .toBuffer();

        await fs.writeFile(path, buttfer);
      }

      if (isPNG(path)) {
        const buttfer = await sharp(path)
          .png({
            palette: true,
            quality: _quality,
          })
          .toBuffer();

        await fs.writeFile(path, buttfer);
      }

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
      resolve(null);
    }
  });
}
