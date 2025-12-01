/**
 * @description: 日期相关操作
 *
 */
import moment, { Moment, DurationInputArg2, unitOfTime } from 'moment';

/**
 * @description 给出开始结束日期字符串，返回该日期范围内的所有日期数组
 * @param {string} startDate - 开始日期字符串
 * @param {string} endDate - 结束日期字符串
 * @param {string} [format='YYYY-MM-DD'] - 日期格式
 * @param {boolean} [isMomentObject=false] - 是否返回 moment 对象数组
 * @returns {string[] | Moment[]} - 日期字符串数组或 moment 对象数组
 *
 */
export function getDateRangeArray(
  startDate: string,
  endDate: string,
  format: string = 'YYYY-MM-DD',
  isMomentObject: boolean = false
): string[] | Moment[] {
  const start = moment(startDate);
  const end = moment(endDate);
  const dateArray: string[] = [];
  const dateMomentArray: moment.Moment[] = [];

  if (!start.isValid() || !end.isValid() || end.isBefore(start)) {
    throw new Error('Invalid date range');
  }

  let current = start.clone();
  while (current.isSameOrBefore(end)) {
    if (isMomentObject) {
      dateMomentArray?.push(current);
    } else {
      dateArray.push(current.format(format));
    }

    current.add(1, 'days');
  }

  return isMomentObject ? dateMomentArray : dateArray;
}

/**
 * @description 返回 间隔几个 年、月、日、小时、分钟、秒 的开始和结束时间
 * @param {number} duration - 间隔数量，正数表示未来，负数表示过去
 * @param {unitOfTime.DurationConstructor} unit - 间隔单位，如 'days', 'months', 'years' 等
 * @returns {[Moment, Moment]} - 包含开始时间和结束时间的数组
 */

export function getStartEndByDuration(
  duration: number = 0,
  unit: unitOfTime.DurationConstructor = 'days'
): Moment[] {
  const start = moment().add(duration, unit).startOf(unit);

  const end = moment().add(duration, unit).endOf(unit);

  return [start, end];
}

/**
 * @description 给出日期格式字符串 判断距离当前天，按照单位返回对应的数量
 * @param {string} dateStr - 日期字符串
 * @param {unitOfTime.Diff} unit - 计算单位，如 'days', 'months', 'years' 等
 * @returns {number} - 距离当前天的数量
 */
export function getDiffFromNow(dateStr: string, unit: unitOfTime.Diff = 'days'): number {
  const date = moment(dateStr);
  if (!date.isValid()) {
    throw new Error('Invalid date string');
  }
  return date.diff(moment(), unit);
}
