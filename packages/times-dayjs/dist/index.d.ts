/**
 * @description 业务开发过程中常见的时间（段）获取
 */
import dayjs from 'dayjs';
export type DayItem = {
    year: number;
    month: number;
    day: number;
    week: number;
    date: string;
    timeStamp: number;
};
/** 根据开始、结束时间字符串 生成 该时间段内日期数组  */
export declare const getDaysArr: ([start, end]: [dayjs.ConfigType, dayjs.ConfigType]) => DayItem[];
/** 获取指定日期所在的一年 */
export declare const getYearStartEnd: (value?: dayjs.ConfigType) => DayItem[];
/** 获取指定日期的 月份起止 dayjs 具体格式可以按需求转换 */
export declare const getMonthStartEnd: (value?: dayjs.ConfigType) => DayItem[];
/** 获取指定日期所在的一周 */
export declare const getWeekStartEnd: (value?: dayjs.ConfigType) => DayItem[];
/** 获取指定日期 之前的多少天 */
export declare const getDayBefore: (days: number, date?: dayjs.ConfigType) => DayItem[];
/** 获取指定日期 之后的多少天 */
export declare const getDayAfter: (days: number, date?: dayjs.ConfigType) => DayItem[];
declare const _default: {
    getDaysArr: ([start, end]: [string | number | Date | dayjs.Dayjs, string | number | Date | dayjs.Dayjs]) => DayItem[];
    getYearStartEnd: (value?: string | number | Date | dayjs.Dayjs) => DayItem[];
    getMonthStartEnd: (value?: string | number | Date | dayjs.Dayjs) => DayItem[];
    getWeekStartEnd: (value?: string | number | Date | dayjs.Dayjs) => DayItem[];
    getDayBefore: (days: number, date?: string | number | Date | dayjs.Dayjs) => DayItem[];
    getDayAfter: (days: number, date?: string | number | Date | dayjs.Dayjs) => DayItem[];
};
export default _default;
