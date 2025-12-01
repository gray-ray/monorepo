/**
 * @description: Array utilities
 */

/**
 * @description 对象数组去重
 */
export function uniqueArray<T>(arr: T[]): T[] {
  const map = new Map();
  for (const item of arr) {
    if (!map.has(item.id)) {
      map.set(item.id, item);
    }
  }
  const result = [...map.values()];
  return result;
}
