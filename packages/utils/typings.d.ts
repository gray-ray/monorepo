declare module '*.ts'

declare type MemoizeOptions<T extends (...args: any[]) => any> = {
  ttl?: number
  maxSize?: number
  resolver?: (...args: Parameters<T>) => string
}
