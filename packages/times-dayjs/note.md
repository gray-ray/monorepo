

#### jest 测试 使用 ts-jest实现

https://jestjs.io/zh-Hans/docs/getting-started#%E4%BD%BF%E7%94%A8-typescript

1. 安装依赖，初始化jest.config。
  ``` bash
    npm i jest ts-jest @types/jest -D
    npx ts-jest config:init
  ```

2. 修改package.json
   ``` json
   {
      "scripts": {
        "test": "jest",
        "test-c": "jest --coverage",
      }
    }
   ```
3. 创建 test目录 创建对应 测试用例




### 生成声明文件
``` json
  {
      "compilerOptions": {
      // 生成声明文件
      "declaration": true,
      "strict": true,
    },
  }
```
### 生成文件

``` bash
 npm run build
```


### problems

1. 使用 namespace ，在构建的时候不会将命名空间导出?
2. 如何 发布到@types
   https://www.tslang.cn/docs/handbook/declaration-files/publishing.html

### publish

发布npm 包时 需要将 package.json包改为 公共包格式
  ``` json
  {
    "name": "@packages/times-dayjs",
  }

  ```
   ``` json
  {
    "name": "times-dayjs",
  }

  ```