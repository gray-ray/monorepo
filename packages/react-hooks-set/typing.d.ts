
declare namespace HooksApi {

  export type ApiRes<T> = {
    data: T,
    success?: boolean;
    code?: number;
    [prop: string]: any
  }

  export type  PageList<T extends Record<string, any>> = {
    list: T[],
    total: number;
    [prop: string]: any;
  }


}
