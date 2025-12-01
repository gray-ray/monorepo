/**
 * @description: 字符串相关操作
 */

/**
 * @description 字符串 填充
 * @param {string} str
 * @param {number} len
 * @param {string} [padStr = "*"]
 * @param { 'prefix' | 'suffix' } [type = "prefix"]
 * @returns {string}
 */

export function getPadStr(
  str: string,
  len: number,
  padStr: string = '*',
  type: 'prefix' | 'suffix' = 'prefix'
): string {
  if (typeof len !== 'number') {
    throw new Error('len must be a number');
  }
  if (!padStr) {
    throw new Error('padStr cannot be empty');
  }
  if (type == 'prefix') {
    return str.padStart(len, padStr);
  }
  return str.padEnd(len, padStr);
}

/**
 * @description: 随机生成汉字
 */

export function randomChineseStr(length?: number): string {
  const start = 0x4e00; // "一"
  const end = 0x9fa5; // "龥"

  let result = '';

  if (length && length > 1) {
    for (let i = 0; i < length; i++) {
      const charCode = Math.floor(Math.random() * (end - start + 1)) + start;
      result += String.fromCharCode(charCode);
    }
  } else {
    const charCode = Math.floor(Math.random() * (end - start + 1)) + start;
    result = String.fromCharCode(charCode);
  }

  return result;
}

/**
 * @description: 随机生成颜色的数组
 */

export function randomColorArray(length: number): string[] {
  const colors: string[] = [];
  for (let i = 0; i < length; i++) {
    const color = `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, '0')}`;
    colors.push(color);
  }
  return colors;
}
