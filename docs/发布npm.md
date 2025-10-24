### 发布的包中如何不带源码

`files` 属性指定发布哪些代码到npm 上

```json
{
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  },
  "files": ["dist"]
}
```

### monorepo 下根目录如何配置 `package.json`才能避免上传包到 npm 时被忽略

设置 `private` 属性时上传包会被忽略

```json
{
  "private": true,
  "workspaces": ["packages/*"]
}
```

### monorepo 项目本地构建发布包 命令

```bash
# 递归构建所有packages下的包
pnpm -r --stream build

# 登录
npm login

#  递归发布包
pnpm -r publish

# 本地发布 不记录历史， 不创建git
pnpm -r publish --access public --no-git-checks


# 版本更新
# 递归更新所有子包版本
pnpm -r version patch

# 语义化版本（Semantic Versioning，SemVer）
# 1.0.0 -> 1.0.1 ✅ 修复 · ✅ 小增强 · ❌ 新 API
pnpm version patch
# 1.0.0 -> 1.1.0 ✅ 新 API · ✅ 保持兼容 · ❌ 破坏旧 API
pnpm version minor
# 1.0.0 -> 2.0.0 ✅ 破坏旧功能、不兼容升级
pnpm version major
```
