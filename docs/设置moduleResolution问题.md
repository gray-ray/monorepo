**TypeScript 5.x** 之后常见的一个“严格模式约束”问题。
报错内容如下：

> ❌ 当选项 `"moduleResolution"` 设置为 `"NodeNext"` 时，选项 `"module"` 必须设置为 `"NodeNext"`。

---

## 🧠 一、为什么会这样？

在 TypeScript 5 之后：

- `moduleResolution: "NodeNext"` 是一种 **新的模块解析机制**（与 Node.js ESM/CJS 对齐）
- 它要求你使用相同的模块系统 `"module": "NodeNext"`
- 如果你还在用 `"module": "ESNext"` 或 `"CommonJS"`，TS 会拒绝，因为：

  > NodeNext 解析逻辑要配合 NodeNext 模块系统，否则无法正确处理 `.mjs/.cjs/.ts/.cts/.mts`

---

## ✅ 二、正确写法（推荐配置）

下面是 **适用于 monorepo 子包** 的标准配置模板 👇

```jsonc
{
  "compilerOptions": {
    /* === 模块系统 === */
    "module": "NodeNext", // ✅ 和 moduleResolution 保持一致
    "moduleResolution": "NodeNext", // ✅ 启用 Node 的查找逻辑（支持根 node_modules）

    /* === 基础配置 === */
    "target": "ES2020",
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationDir": "./dist",
    "emitDeclarationOnly": false,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,

    /* === 辅助 === */
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*", "typings.d.ts"]
}
```

✅ 优点：

- 可以在子包中 `import moment from 'moment'`（不报错）
- 支持 `.js`, `.cjs`, `.mjs` 混合模块
- 符合最新 Node.js 模块解析标准（Node 18+）

---

## 🧩 三、如果你需要保持 CommonJS 构建（兼容老项目）

那就不能用 `NodeNext` 模块系统。
你可以退一步，改成下面这种：

```json
{
  "compilerOptions": {
    "module": "CommonJS",
    "moduleResolution": "Node",
    ...
  }
}
```

但此时：

- 仍然可以编译
- **不支持 ESM + CJS 混合**
- **无法完美解析 monorepo 根目录依赖**（有时还是会找不到模块）

---

## ✅ 四、建议总结

| 目标                       | 推荐配置                                                    |
| -------------------------- | ----------------------------------------------------------- |
| 现代项目（ESM / Monorepo） | `"module": "NodeNext"`, `"moduleResolution": "NodeNext"` ✅ |
| 旧项目（CJS）              | `"module": "CommonJS"`, `"moduleResolution": "Node"`        |
| 临时解决类型找不到         | 添加 `"paths"` 映射或 `"baseUrl": "."`（权宜之计）          |

---

## 💡 补充：配合 `package.json` 的 `"type"`

| package.json 配置    | 对应模块系统  | 导入规则    |
| -------------------- | ------------- | ----------- |
| `"type": "module"`   | ESModule      | `.js` → ESM |
| `"type": "commonjs"` | CommonJS      | `.js` → CJS |
| 无                   | 默认 CommonJS | 同上        |

如果你用 `"module": "NodeNext"`，记得确保：

```json
{
  "type": "module"
}
```

放在子包的 `package.json` 里，否则 TS/Node 的模块类型会不一致。

---
