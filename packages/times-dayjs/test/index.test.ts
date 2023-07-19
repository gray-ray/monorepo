import { describe, test, expect, jest } from '@jest/globals';

import index from '../lib/index';

describe("测试文件",() => {
  test("测试 getWeekStartEnd 方法",()=> {
    expect(index.getWeekStartEnd());
  });
})