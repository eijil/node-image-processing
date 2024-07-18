import { Rule, RuleType } from '@midwayjs/validate';
import { CompressType } from '../interface';

export class UploadFieldsDTO {
  /**
   * 是否压缩
   */
  @Rule(
    RuleType.string()
      .allow('')
      .valid(...Object.values(CompressType))
      .description('compressType')
  )
  compress: string;
  /**
   * 是否生成webp
   */
  @Rule(RuleType.string().allow(''))
  webp: string;
  /**
   * 等比缩放
   */
  @Rule(RuleType.string().allow(''))
  resize: string;

  /**
   * 质量
   */
  @Rule(RuleType.string().allow(''))
  quality: string;
}
