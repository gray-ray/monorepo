"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDayAfter = exports.getDayBefore = exports.getWeekStartEnd = exports.getMonthStartEnd = exports.getYearStartEnd = exports.getDaysArr = void 0;
/**
 * @description 业务开发过程中常见的时间（段）获取
 */
var dayjs_1 = __importDefault(require("dayjs"));
var DAY_UNIT = 24 * 60 * 60 * 1000;
/** 根据开始、结束时间字符串 生成 该时间段内日期数组  */
var getDaysArr = function (_a) {
    var _b, _c, _d, _e, _f;
    var start = _a[0], end = _a[1];
    if (!start || !end)
        return [];
    var sTime = (_b = (0, dayjs_1.default)(start)) === null || _b === void 0 ? void 0 : _b.valueOf();
    var eTime = (_c = (0, dayjs_1.default)(end)) === null || _c === void 0 ? void 0 : _c.valueOf();
    var arr = [];
    var curTime = sTime;
    do {
        var obj = {
            year: (_d = new Date(curTime)) === null || _d === void 0 ? void 0 : _d.getFullYear(),
            month: ((_e = new Date(curTime)) === null || _e === void 0 ? void 0 : _e.getMonth()) + 1,
            day: (_f = new Date(curTime)) === null || _f === void 0 ? void 0 : _f.getDate(),
            week: new Date(curTime).getDay(),
            date: (0, dayjs_1.default)(curTime).format('YYYY-MM-DD'),
            timeStamp: curTime
        };
        arr === null || arr === void 0 ? void 0 : arr.push(obj);
        curTime += DAY_UNIT;
    } while (curTime < eTime);
    return arr;
};
exports.getDaysArr = getDaysArr;
/** 获取指定日期所在的一年 */
var getYearStartEnd = function (value) {
    var date = (0, dayjs_1.default)(value);
    var start = date.startOf("year");
    var end = date.endOf("year");
    return (0, exports.getDaysArr)([start, end]);
};
exports.getYearStartEnd = getYearStartEnd;
/** 获取指定日期的 月份起止 dayjs 具体格式可以按需求转换 */
var getMonthStartEnd = function (value) {
    var date = (0, dayjs_1.default)(value);
    var start = date.startOf("month");
    var end = date.endOf("month");
    return (0, exports.getDaysArr)([start, end]);
};
exports.getMonthStartEnd = getMonthStartEnd;
/** 获取指定日期所在的一周 */
var getWeekStartEnd = function (value) {
    var date = (0, dayjs_1.default)(value);
    var start = date.startOf("week");
    var end = date.endOf("week");
    return (0, exports.getDaysArr)([start, end]);
};
exports.getWeekStartEnd = getWeekStartEnd;
/** 获取指定日期 之前的多少天 */
var getDayBefore = function (days, date) {
    if (date === void 0) { date = new Date(); }
    var dis = Math.ceil(days);
    var start = (0, dayjs_1.default)(date).subtract(dis, 'day');
    var end = (0, dayjs_1.default)(date);
    return (0, exports.getDaysArr)([start, end]);
};
exports.getDayBefore = getDayBefore;
/** 获取指定日期 之后的多少天 */
var getDayAfter = function (days, date) {
    if (date === void 0) { date = new Date(); }
    var dis = Math.ceil(days);
    var end = (0, dayjs_1.default)(date).add(dis, 'day');
    var start = (0, dayjs_1.default)(date);
    return (0, exports.getDaysArr)([start, end]);
};
exports.getDayAfter = getDayAfter;
exports.default = {
    getDaysArr: exports.getDaysArr,
    getYearStartEnd: exports.getYearStartEnd,
    getMonthStartEnd: exports.getMonthStartEnd,
    getWeekStartEnd: exports.getWeekStartEnd,
    getDayBefore: exports.getDayBefore,
    getDayAfter: exports.getDayAfter,
};
