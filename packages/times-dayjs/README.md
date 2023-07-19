
## 基于dayjs 的常用 日期获取库

### 统一返回格式
  ```typescript
    type DayItem = {
      year: number;
      month: number;
      day: number;
      week: number;
      date: string;
      timeStamp: number;
    };

    type Data = DayItem[];
  ```

### api

- getDaysArr 获取起止时间之间数组
  ``` typescript
  // 传入值满足 moment 格式即可
  const data: Data = getDaysArr(["2023-07-19", "2023-07-30"]);
  ```
- getYearStartEnd 获取指定日期下的一年的起止 时间数组
  ``` typescript
  // 传入值满足 moment 格式即可
  const data: Data = getYearStartEnd();
  ```
- getMonthStartEnd 获取指定日期下的月的起止 时间数组
  ``` typescript  
  // 传入值满足 moment 格式即可
  const data: Data = getMonthStartEnd();
  ```

- getWeekStartEnd 获取指定日期下的周的起止 时间数组
  ``` typescript  
  // 传入值满足 moment 格式即可
  const data: Data = getWeekStartEnd();
  ```
  
- getDayBefore  获取指定日期(默认当天)之前多少天
  ``` typescript  
  // 传入值满足 moment 格式即可
  const data: Data = getDayBefore(1);
  ```
  
- getDayAfter 获取指定日期(默认当天)之后多少天
  ``` javascript  
  // 传入值满足 moment 格式即可
  const data = getDayAfter(1);
  ```