# 简易聊天室项目

本项目使用 **Nest.js** 实现后端 WebSocket 服务，前端使用 **Uni-app** 搭建，支持实时聊天功能。

## 目录结构

```plaintext
- nest/           # 后端服务目录，使用 Nest.js
- uniapp/         # 前端项目目录，使用 Uni-app
```

# 后端 (Nest.js)

后端服务位于 nest/ 目录，基于 @nestjs/websockets 和 socket.io 实现 WebSocket 功能。
启动后端服务

## 进入 nest/ 目录：
```js
cd nest
```
## 安装依赖：
```js
npm install
```
## 启动服务：
启动开发模式（支持热更新）：
```js
npm run start:dev
```
# 前端 (Uni-app)
前端项目位于 uniapp/ 目录，通过 socket.io-client 连接后端 WebSocket 服务。
运行前端项目

    打开 uniapp/ 目录下的项目文件夹。

    使用 HBuilderX 或其他支持 Uni-app 的编辑器，点击顶部菜单栏的 运行 -> 运行到浏览器，即可在浏览器中预览前端聊天界面。

    确保后端服务正常启动，前端会自动连接后端 WebSocket 服务。
