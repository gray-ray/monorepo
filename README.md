

### pnpm monorepo + typescript  + npm 包管理  示例

1. 初始化monorepo
``` bash
npm  i -g pnpm

mkdir monorepo

cd monorepo

pnpm init

```

2. 创建 根目录下 pnpm-workspace.yaml

创建 app 、 packages 目录 注意 yml文件格式 tab  
``` yaml
packages:
  - "packages/*"
  - "app/*"
```
3. 配置项目typescript环境
   
``` bash
  # -w 指定 的是会安装在根目录下 -r 安装在指定的局部目录下
  pnpm add typescript -w -D
  # 初始化typescript配置
  tsc --init

```

``` json
{
  "compilerOptions": {
    "outDir": "./dist",                              /* output file. */
    "paths": {
      "@package/*": ["packages/*"],
      "@app/*": ["app/*"]
    },
    "baseUrl": "."
  },
  "extends": ["./tsconfig.base.json"],
}
```

 typing.d.ts
  ``` typescript
  declare module '@package/*';
  declare module '@app/*';
  ```

### react 运行环境配置
参照 app/board-canvas

错误处理   

1. react Module not found: Error: Can't resolve './App'
  安装配置typescript

  ``` json
  {
  "compilerOptions": {
    "jsx": "react",
    },
    "extends": ["./tsconfig.base.json"],
  }

  ```

2. 安装 times-dayjs 包到 board-canvas下
   
``` bash
  cd ./packages/times-dayjs
  # 配置包名
  npm init
  npm run build
 
 
  ## 根目录下
  pnpm add @packages/times-dayjs -r  --filter ./app/board-canvas
```


### pnpm add 和 pnpm install区别
[](https://stackoverflow.com/questions/73369867/what-the-different-between-pnpm-install-and-pnpm-add)
