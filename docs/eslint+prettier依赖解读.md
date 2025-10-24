
## 1️⃣ `@typescript-eslint/parser`

* **作用**：让 ESLint 能够解析 **TypeScript 语法**
* ESLint 默认只能解析 JavaScript，无法理解 TypeScript 的类型、接口、枚举、泛型等语法
* 安装后，在 `.eslintrc.cjs` 中配置：

```js
parser: '@typescript-eslint/parser'
```

* 配合 `parserOptions` 使用，能让 ESLint 正确分析 TS 代码

---

## 2️⃣ `@typescript-eslint/eslint-plugin`

* **作用**：提供一系列 **针对 TypeScript 的 ESLint 规则**
* 例如：

  * `@typescript-eslint/no-unused-vars`（TS 变量未使用检查）
  * `@typescript-eslint/explicit-function-return-type`（函数返回值类型检查）
* 在 `.eslintrc.cjs` 中配置：

```js
plugins: ['@typescript-eslint']
extends: ['plugin:@typescript-eslint/recommended']
```

---

## 3️⃣ `eslint-config-prettier`

* **作用**：关闭所有 **与 Prettier 冲突的 ESLint 规则**
* 原理：Prettier 自动格式化代码，如果 ESLint 有些规则与 Prettier 风格冲突，会报错
* 安装后，在 `.eslintrc.cjs` 中配置：

```js
extends: ['plugin:prettier/recommended']
// 或者单独用 ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier']
```

* 作用：保证 ESLint 不与 Prettier 格式化结果冲突

---

## 4️⃣ `eslint-plugin-prettier`

* **作用**：把 Prettier 的规则 **作为 ESLint 规则执行**
* 功能：

  * 保存时或命令行执行 `eslint` 就会检查 Prettier 风格是否符合
  * 可结合 `prettier/prettier` 规则自动修复
* 配置示例：

```js
plugins: ['prettier'],
rules: {
  'prettier/prettier': 'warn'
}
```

* 这样 ESLint 报告会把 Prettier 风格问题也纳入检查，统一成一个工具链

---

## 🔗 总结关系

| 依赖                                 | 作用                        | 配合使用                   |
| ---------------------------------- | ------------------------- | ---------------------- |
| `@typescript-eslint/parser`        | 解析 TS 语法                  | 必须，配合 ESLint 使用        |
| `@typescript-eslint/eslint-plugin` | 提供 TS 专用 ESLint 规则        | 配合 parser 使用           |
| `eslint-config-prettier`           | 关闭 ESLint 与 Prettier 冲突规则 | 避免报错                   |
| `eslint-plugin-prettier`           | 把 Prettier 检查纳入 ESLint    | 可在 ESLint 中统一检查并修复代码风格 |

---

💡 **最典型组合**（TypeScript + Prettier + ESLint）：

```js
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended' // 集成 prettier
  ],
  rules: {
    'prettier/prettier': 'warn'
  }
}
```

