/**
 * @description 业务开发过程中常见的时间（段）获取
 */
import dayjs  from 'dayjs';
const DAY_UNIT = 24 * 60 * 60 * 1000;

export type DayItem = {
  year: number;
  month: number;
  day: number;
  week: number;
  date: string;
  timeStamp: number;
}


/** 根据开始、结束时间字符串 生成 该时间段内日期数组  */
export const getDaysArr = ([start, end]: [dayjs.ConfigType, dayjs.ConfigType]): DayItem[] => {
  if (!start || !end) return [];

  const sTime = dayjs(start)?.valueOf();

  const eTime = dayjs(end)?.valueOf();

  const arr: DayItem[] =[];

  let curTime = sTime;

  do {
    const obj: DayItem = {
      year: new Date(curTime)?.getFullYear(),
      month:  new Date(curTime)?.getMonth() + 1,
      day: new Date(curTime)?.getDate(),
      week: new Date(curTime).getDay(),
      date: dayjs(curTime).format('YYYY-MM-DD'),
      timeStamp: curTime
    }
    arr?.push(obj);
    curTime += DAY_UNIT;
  }while(curTime < eTime)

  return arr;

}

/** 获取指定日期所在的一年 */


export const getYearStartEnd = (value?:  dayjs.ConfigType): DayItem[] => {
  const date = dayjs(value);

  const start = date.startOf("year");

  const end = date.endOf("year");

  return getDaysArr([start, end]);

}

/** 获取指定日期的 月份起止 dayjs 具体格式可以按需求转换 */

export const getMonthStartEnd = (value?:  dayjs.ConfigType): DayItem[] => {
  const date = dayjs(value);

  const start = date.startOf("month");

  const end = date.endOf("month");

  return getDaysArr([start, end]);

}

/** 获取指定日期所在的一周 */


export const getWeekStartEnd = (value?:  dayjs.ConfigType): DayItem[]=> {
  const date = dayjs(value);

  const start = date.startOf("week");

  const end = date.endOf("week");

  return getDaysArr([start, end]);

}

/** 获取指定日期 之前的多少天 */
export const getDayBefore = (days: number, date: dayjs.ConfigType = new Date()): DayItem[] => {
  const dis = Math.ceil(days);

  const start = dayjs(date).subtract(dis, 'day');

  const end = dayjs(date)

  return getDaysArr([start, end]);

}

/** 获取指定日期 之后的多少天 */
export const getDayAfter = (days: number, date: dayjs.ConfigType = new Date()): DayItem[] => {
  const dis = Math.ceil(days);

  const end = dayjs(date).add(dis, 'day');

  const start = dayjs(date)

  return getDaysArr([start, end]);

}

export default {
  getDaysArr,
  getYearStartEnd,
  getMonthStartEnd,
  getWeekStartEnd,
  getDayBefore,
  getDayAfter,
}