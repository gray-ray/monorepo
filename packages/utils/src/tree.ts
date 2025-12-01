/**
 * @description 树结构数据相关操作
 */
import { getValueType } from './index';
import { OBJECT_TYPE } from './enum';

export function isArrayType(value: any): boolean {
  return getValueType(value) === OBJECT_TYPE.Array;
}

type TreeNode = Record<string, any>;

interface TreeOption {
  indexKey?: string; // 默认 'id'
  childKey?: string; // 默认 'children'
}
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

    if (isArrayType(children)) {
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
  const childParentMap = buildChildParentIndexMap(tree, indexKey, childKey);
  const parentNode = childParentMap.get(indexValue);

  let targetArray: T[];

  if (!parentNode) {
    targetArray = tree;
  } else {
    targetArray = parentNode[childKey] as T[];
  }

  const idx = targetArray.findIndex((item) => item?.[indexKey] === indexValue);
  if (idx > -1) {
    targetArray.splice(idx, 1);
    return true;
  }
  return false;
}

/**
 * @description 构建子节点ID => 父节点Map,
 * @param tree
 * @param indexKey
 * @param childKey
 * @returns
 */

export function buildChildParentIndexMap<T extends Record<string, any>>(
  tree: T[],
  indexKey: string = 'id',
  childKey: string = 'children'
): Map<any, T> {
  const indexMap = new Map<any, T>();
  const stack: T[] = [...tree];

  while (stack?.length) {
    const node = stack?.pop()!;

    const children = node?.[childKey] as T[] | undefined;

    if (isArrayType(children)) {
      for (const child of children!) {
        indexMap?.set(child[indexKey], node);
        stack.push(child);
      }
    }
  }

  return indexMap;
}

/**
 * @description 构建节点索引 Map
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
    indexMap?.set(node[indexKey], node);

    const children = node?.[childKey] as T[] | undefined;

    if (isArrayType(children)) {
      for (const child of children!) {
        stack.push(child);
      }
    }
  }
  return indexMap;
}

export default class TreeHelper<T extends TreeNode> {
  private tree: T[];
  private indexKey: string;
  private childKey: string;
  private indexChildParentMap: Map<any, T> = new Map();
  private indexMap: Map<any, T> = new Map();

  constructor(tree: T[], options?: TreeOption) {
    this.tree = tree;
    this.childKey = options?.childKey || 'children';
    this.indexKey = options?.indexKey || 'id';

    this.indexChildParentMap = buildChildParentIndexMap(tree, this.indexKey, this.childKey);
    this.indexMap = buildIndexMap(tree, this.indexKey, this.childKey);
  }

  /** 获取 子节点 =>父节点 Map 索引 */
  getChildParentIndexMap() {
    return this.indexChildParentMap;
  }

  /** 获取 节点索引 Map */
  getIndexMap() {
    return this.indexMap;
  }

  /** 获取当前树 */
  getTree() {
    return this.tree;
  }
  /** 新增节点 */
  addNode(parentId: any, newNode: T): boolean {
    const parentNode = this.indexMap.get(parentId);
    if (!parentNode) {
      // 添加到根节点
      this.tree.push(newNode);
    } else {
      if (!isArrayType(parentNode[this.childKey])) {
        (parentNode as any)[this.childKey] = [];
      }
      parentNode[this.childKey].push(newNode);
    }
    // 更新索引Map
    this.indexMap.set(newNode[this.indexKey], newNode);
    this.indexChildParentMap.set(newNode[this.indexKey], parentNode!);
    return true;
  }

  /** 自定义条件 节点查找 instance?.findNode((x) => x?.id === 1) */
  findNode(predicate: (e: T) => boolean): T | undefined {
    return findNodeByPredicate(this.tree, predicate, this.childKey);
  }

  /** 通过索引键值 查找节点 */
  findNodeByIndexKey(indexValue: any): T | undefined {
    return this.indexMap.get(indexValue);
  }

  /** 节点更新 */
  updateNode(id: any, newData: Partial<T>): boolean {
    const node = updateNode(this.tree, id, newData, this.indexKey, this.childKey);

    return node;
  }

  /** 节点删除 */
  deleteNode(id: any): boolean {
    const deleted = deleteNode(this.tree, id, this.indexKey, this.childKey);
    if (deleted) {
      this.clearIndexAndChildrenMap(this.indexMap.get(id)!);
    }
    return deleted;
  }

  /** 批量删除 */
  deleteNodes(ids: any[]) {
    if (!isArrayType(ids) || ids.length === 0) return false;

    const deletedIds: any[] = [];
    for (const id of ids) {
      if (deletedIds.includes(id)) continue;

      const parentNode = this.indexChildParentMap.get(id);

      let targetArray: T[];

      if (!parentNode) {
        targetArray = this.tree;
      } else {
        targetArray = parentNode[this.childKey] as T[];
      }

      const idx = targetArray.findIndex((item) => item?.[this.indexKey] === id);
      if (idx > -1) {
        const [removeNode] = targetArray.splice(idx, 1);
        deletedIds.push(id);
        // 重新维护索引Map
        this.clearIndexAndChildrenMap(removeNode);
      }
    }
    return deletedIds.length > 0;
  }

  private deleteIndexMp(id: any) {
    this.indexChildParentMap?.delete(id);
    this.indexMap?.delete(id);
  }

  /**
   *
   * @param node 删除节点及其子节点的索引Map
   */
  private clearIndexAndChildrenMap(node: T) {
    const nodeId = node[this.indexKey];

    this.deleteIndexMp(nodeId);

    const stack: T[] = (node?.[this.childKey] as T[]) || [];
    while (stack?.length) {
      const currentNode = stack?.pop()!;

      const currentNodeId = currentNode[this.indexKey];
      this.deleteIndexMp(currentNodeId);

      const currentChildren = currentNode?.[this.childKey] as T[] | undefined;

      if (isArrayType(currentChildren)) {
        for (const child of currentChildren!) {
          stack.push(child);
        }
      }
    }
  }
}
