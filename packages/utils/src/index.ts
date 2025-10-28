/**
 * @description 工具函数集合
 */

import { OBJECT_TYPE } from './enum';

import TreeHelper, { findNodeByPredicate, updateNode, deleteNode, buildIndexMap } from './tree';

export { TreeHelper, findNodeByPredicate, updateNode, deleteNode, buildIndexMap };

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
 * @description 获取当前数据类型
 * @param {any} a
 * @returns {string}
 */
export function getValueType(a: any): OBJECT_TYPE {
  //@ts-ignore
  return Object.prototype.toString.call(a).match(/\[object (\w+)\]/)[1];
}

/**
 * @description 校验url query 格式是否正确
 * @param { string} url
 * @returns { boolean}
 */
export function validateUrlQuery(url: string): boolean {
  try {
    let decodedUrl;
    try {
      decodedUrl = decodeURIComponent(url);
    } catch (e) {
      return false; // 解码失败说明格式有问题
    }

    // 提取 query 部分的正则
    const queryMatch = decodedUrl.match(/\?(.*)$/);
    if (!queryMatch) return true; // 没有 query 部分视为有效

    const query = queryMatch[1];
    if (!query) return true; // 空 query 部分（只有?）视为有效
    // 主校验正则：
    // 1. 允许键值对 key=value 或只有 key
    // 2. 键不能为空，值可以为空
    // 3. 允许被编码的字符
    // 4. 多个参数用 & 分隔
    // 5. 不允许以 & 开头或结尾，也不允许连续的 &&
    const queryRegex = /^(?:[^&=]+(?:=[^&=]*)?)(?:&[^&=]+(?:=[^&=]*)?)*$/;

    return queryRegex.test(query);
  } catch (error) {
    return false;
  }
}

/**
 * @description 函数缓存
 * @callback cb
 * @param { cb } fn  函数
 * @param { Object }
 * @description  功能 自定义校验key、 过期时间、 自动缓存清理、LRU缓存淘汰策略
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: (v: any) => any,
  { ttl = 0, maxSize = 100, resolver }: MemoizeOptions<T>
) {
  const cache = new Map<string, { value: ReturnType<T>; expireAt: number }>();

  return function (...args: Parameters<T>): ReturnType<T> {
    const key = resolver ? resolver(...args) : JSON.stringify(args);

    const now = Date.now();

    if (cache.has(key)) {
      const entry = cache.get(key)!;

      if (ttl == 0 || now - entry.expireAt < ttl) {
        // LRU: 重新移动到末尾（最近最少使用）
        cache.delete(key);

        cache.set(key, entry);

        return entry?.value;
      } else {
        // expired
        cache.delete(key);
      }
    }

    // LRU 淘汰
    // @ts-ignore
    const result = fn.apply(this, args);

    const expireAt = ttl > 0 ? now + ttl : Infinity;

    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value!;

      cache.delete(firstKey);
    }

    cache.set(key, { value: result, expireAt });

    return result;
  } as T;
}

export default {
  getPadStr,
  getValueType,
  validateUrlQuery,
  memoize,
  TreeHelper,
  findNodeByPredicate,
  updateNode,
  deleteNode,
  buildIndexMap
};
