/// <reference types="../typing.d.ts" />
import { useState, useEffect } from "react";
type Obj = Record<string | number | symbol, any>;

export type UseTableProps<Q extends Obj, R extends Obj> = {
  api?: (parma: Q) => Promise<HooksApi.ApiRes<HooksApi.PageList<R>>>;
};

const useTable = <Q extends Obj, R extends Obj>(props: UseTableProps<Q, R>) => {
  const { api } = props;
  const [list, setList] = useState<R[]>([]);
  const [total, setTotal] = useState(0);
  const [queryParams, setQueryParams] = useState<Obj>({
    pageNum: 1,
    pageSize: 10,
  });

  const handleSearch = async (values: Q) => {
    setQueryParams(() => ({ ...values, pageNum: 1, pageSize: 10 }));
  };

  const fetchData = async () => {
    if (!api) return;
    const res = await api?.(queryParams);
    setList(res?.data?.list ?? []);
    setTotal(res?.data?.total ?? 0);
  };

  const handlePageChange = (pageNum = 1, pageSize = 10) => {
    setQueryParams((pre) => ({ ...pre, pageNum, pageSize }));
  };

  const reloadTable = (cb?: () => any) => {
    cb?.();
    setQueryParams({ pageNum: 1, pageSize: 10 });
  };

  useEffect(() => {
    fetchData();
  }, [queryParams]);

  return {
    list,
    total,
    queryParams,
    handleSearch,
    handlePageChange,
    reloadTable,
  };
};
export default useTable;
