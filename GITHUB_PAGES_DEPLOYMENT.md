# GitHub Pages 部署指南

## 问题原因

GitHub Pages 部署 Vite 项目时,需要正确配置 `base` 路径。错误 `net::ERR_ABORTED 404` 是因为资源路径不正确。

## 已完成的修复

1. ✅ **配置 vite.config.ts**
   - 添加了 `base: '/'` 配置
   - 如果你的仓库名不是 `affadsense1.github.io`,需要修改为 `base: '/仓库名/'`

2. ✅ **创建 GitHub Actions 工作流**
   - 自动构建和部署到 GitHub Pages
   - 文件位置: `.github/workflows/deploy.yml`

3. ✅ **添加 .nojekyll 文件**
   - 防止 GitHub Pages 使用 Jekyll 处理文件
   - 文件位置: `public/.nojekyll`

## 部署步骤

### 1. 确认仓库名称

**重要:** 你需要确认你的 GitHub 仓库名称:

- **如果仓库名是 `affadsense1.github.io`** (用户/组织站点)
  - 保持 `vite.config.ts` 中的 `base: '/'`
  - 部署后访问: `https://affadsense1.github.io/`

- **如果仓库名是其他名称** (例如 `my-project`)
  - 修改 `vite.config.ts` 中的 `base: '/my-project/'`
  - 部署后访问: `https://affadsense1.github.io/my-project/`

### 2. 启用 GitHub Pages

1. 进入 GitHub 仓库设置
2. 找到 **Settings** → **Pages**
3. 在 **Source** 下选择 **GitHub Actions**

### 3. 推送代码

```bash
git add .
git commit -m "配置 GitHub Pages 部署"
git push origin main
```

### 4. 查看部署状态

1. 进入仓库的 **Actions** 标签页
2. 查看 "Deploy to GitHub Pages" 工作流
3. 等待构建和部署完成(通常需要 1-2 分钟)

### 5. 访问网站

部署成功后,访问:
- 用户站点: `https://affadsense1.github.io/`
- 项目站点: `https://affadsense1.github.io/仓库名/`

## 常见问题

### Q1: 如何确定我的仓库类型?

在 GitHub 仓库页面查看仓库名称:
- 如果是 `用户名.github.io`,这是用户站点,使用 `base: '/'`
- 如果是其他名称,这是项目站点,使用 `base: '/仓库名/'`

### Q2: 修改 base 路径后如何重新部署?

```bash
# 修改 vite.config.ts 中的 base 配置
# 然后推送代码
git add vite.config.ts
git commit -m "更新 base 路径"
git push origin main
```

### Q3: 本地如何测试生产构建?

```bash
# 构建
npm run build

# 预览
npm run preview
```

### Q4: 部署失败怎么办?

1. 检查 GitHub Actions 日志
2. 确认 `package.json` 中的依赖都已安装
3. 确认 `base` 路径配置正确
4. 确认仓库的 Pages 设置为 "GitHub Actions"

## 手动部署(备选方案)

如果 GitHub Actions 不可用,可以手动部署:

```bash
# 1. 构建项目
npm run build

# 2. 进入构建目录
cd dist

# 3. 初始化 git 仓库
git init
git add -A
git commit -m 'deploy'

# 4. 推送到 gh-pages 分支
git push -f git@github.com:affadsense1/仓库名.git main:gh-pages

# 5. 返回项目根目录
cd ..
```

然后在 GitHub 仓库设置中,将 Pages 源设置为 `gh-pages` 分支。

## 注意事项

1. **路由问题**: 如果使用 React Router,需要配置 404 重定向
2. **环境变量**: 确保生产环境变量正确配置
3. **API 地址**: 检查 API 请求地址是否使用了正确的域名
4. **CORS**: 如果有后端 API,确保配置了正确的 CORS 策略
