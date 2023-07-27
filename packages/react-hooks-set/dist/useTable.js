/// <reference types="../typing.d.ts" />
import { useState, useEffect } from "react";
const useTable = (props) => {
    const { api } = props;
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [queryParams, setQueryParams] = useState({
        pageNum: 1,
        pageSize: 10,
    });
    const handleSearch = async (values) => {
        setQueryParams(() => ({ ...values, pageNum: 1, pageSize: 10 }));
    };
    const fetchData = async () => {
        if (!api)
            return;
        const res = await api?.(queryParams);
        setList(res?.data?.list ?? []);
        setTotal(res?.data?.total ?? 0);
    };
    const handlePageChange = (pageNum = 1, pageSize = 10) => {
        setQueryParams((pre) => ({ ...pre, pageNum, pageSize }));
    };
    const reloadTable = (cb) => {
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
