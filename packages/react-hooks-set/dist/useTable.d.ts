/// <reference types="../typing.d.ts" />
type Obj = Record<string | number | symbol, any>;
export type UseTableProps<Q extends Obj, R extends Obj> = {
    api?: (parma: Q) => Promise<HooksApi.ApiRes<HooksApi.PageList<R>>>;
};
declare const useTable: <Q extends Obj, R extends Obj>(props: UseTableProps<Q, R>) => {
    list: R[];
    total: number;
    queryParams: Obj;
    handleSearch: (values: Q) => Promise<void>;
    handlePageChange: (pageNum?: number, pageSize?: number) => void;
    reloadTable: (cb?: () => any) => void;
};
export default useTable;
