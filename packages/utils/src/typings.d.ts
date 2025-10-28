declare module '*.ts';

declare type MemoizeOptions<T extends (...args: any[]) => any> = {
  ttl?: number;
  maxSize?: number;
  resolver?: (...args: Parameters<T>) => string;
};

declare namespace Tree {
  type TreeNode = Record<string, any>;

  interface TreeOption {
    indexKey?: string; // 默认 'id'
    childKey?: string; // 默认 'children'
  }
}
