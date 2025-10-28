/**
 * @description 树结构数据相关操作
 */
import { getValueType } from './index';
import { OBJECT_TYPE } from './enum';
/**
 * @description 树遍历多条件查找
 * @param {  Array } data
 * @param {string} childKey
 * @param { Function } predicate
 * @returns { T | undefined }
 */
export function findNodeByPredicate<T extends Record<string, any>>(
  tree: T[],
  predicate: (e: T) => boolean,
  childKey: string = 'children'
): T | undefined {
  const stack = [...tree];

  while (stack?.length) {
    const node: T = stack?.pop()!;

    if (predicate(node)) {
      return node;
    }

    const children = node?.[childKey];

    if (getValueType(children) === OBJECT_TYPE.Array) {
      stack?.push(...children);
    }
  }
  return undefined;
}

/**
 * @description 树修改
 * @param { Array } tree
 * @param { any } indexValue
 * @param { Partial<T> } data
 * @param { string } indexKey
 * @param { string } childKey
 * @returns { boolean }
 *
 */

export function updateNode<T extends Record<string, any>>(
  tree: T[],
  indexValue: any,
  data: Partial<T>,
  indexKey: string = 'id',
  childKey: string = 'children'
) {
  const node = findNodeByPredicate(tree, (n) => n?.[indexKey] === indexValue, childKey);
  if (!node) return false;
  Object.assign(node, data);
  return true;
}

/**
 * @description 树删除
 * @param tree
 * @param indexValue
 * @param indexKey
 * @param childKey
 * @returns
 */

export function deleteNode<T extends Record<string, any>>(
  tree: T[],
  indexValue: any,
  indexKey: string = 'id',
  childKey: string = 'children'
): boolean {
  const stack: Array<{ parent: T | null; node: T }> = tree.map((node) => ({ node, parent: null }));

  while (stack?.length) {
    const { node, parent } = stack?.pop()!;
    if (node?.[indexKey] === indexValue) {
      const targetArray = parent ? (parent[childKey] as T[]) : tree;
      const idx = targetArray.findIndex((item) => item?.[indexKey] === indexValue);
      if (idx > -1) {
        targetArray.splice(idx, 1);
        return true;
      }
    }
    const children = node?.[childKey];
    if (getValueType(children) === OBJECT_TYPE.Array) {
      for (const child of children) {
        stack.push({ parent: node, node: child });
      }
    }
  }
  return false;
}

/**
 * @description 构建辅助Map, 子节点ID => 父节点
 * @param tree
 * @param indexKey
 * @param childKey
 * @returns
 */

export function buildIndexMap<T extends Record<string, any>>(
  tree: T[],
  indexKey: string = 'id',
  childKey: string = 'children'
): Map<any, T> {
  const indexMap = new Map<any, T>();
  const stack: T[] = [...tree];

  while (stack?.length) {
    const node = stack?.pop()!;

    const children = node?.[childKey] as T[] | undefined;

    if (getValueType(children) === OBJECT_TYPE.Array) {
      for (const child of children!) {
        indexMap?.set(child[indexKey], node);
        stack.push(child);
      }
    }
  }

  return indexMap;
}

export default class TreeHelper<T extends Tree.TreeNode> {
  private tree: T[];
  private indexKey: string;
  private childKey: string;
  private indexMap: Map<any, T> = new Map();

  constructor(tree: T[], options?: Tree.TreeOption) {
    this.tree = tree;
    this.childKey = options?.childKey || 'children';
    this.indexKey = options?.indexKey || 'id';

    buildIndexMap(tree, this.indexKey, this.childKey);
  }

  /** 获取 Map 索引 */
  getIndexMap() {
    return this.indexMap;
  }

  /** 获取当前树 */
  getTree() {
    return this.tree;
  }

  /** 自定义条件 节点查找 instance?.findNode((x) => x?.id === 1) */
  findNode(predicate: (e: T) => boolean): T | undefined {
    return findNodeByPredicate(this.tree, predicate, this.childKey);
  }

  /** 节点更新 */
  updateNode(id: any, newData: Partial<T>): boolean {
    const node = updateNode(this.tree, id, newData, this.indexKey, this.childKey);

    // NOTE: 同步indexMap

    return node;
  }
  /** 节点删除 */
  deleteNode(id: any): boolean {
    const deleted = deleteNode(this.tree, id, this.indexKey, this.childKey);
    if (deleted) {
      this.indexMap?.delete(id);
    }
    return deleted;
  }
}
