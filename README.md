# LTPP

[GitHub Roast 评分](https://ghfind.com/u/eastspire?ref=badge)

> **LTPP**（**Learning Teaching Practice Platform**）—— 在线开发平台后端。
> 整合 Web 开发、代码判题、Git 仓库管理、邮件服务、RTMP 直播、SSL 证书申请、
> 反向代理等多种能力，面向"教学 / 练习 / 实战"一体化场景。

LTPP 通过一个统一的容器栈对外提供这些子服务，开箱即用、可单机部署，
也支持分布式扩展（主服务 + 判题机 + SSH 内网穿透独立扩缩）。

---

## ✨ 功能概览

| 模块 | 端口 | 说明 |
| --- | --- | --- |
| **LTPP 主服务** | `47272` `48787` | 平台主入口、Web 控制台、API 网关 |
| **LTPP-CODE-RUN** 判题机 | `8787` | 代码沙箱执行与判题 |
| **LTPP-SSH** 内网穿透 | — | 把本地 LTPP 服务暴露到公网 |

子模块（前端子目录，对应主服务路由）：

- `api` — 统一 API 入口
- `code` — 在线编码 / 编译 / 运行
- `git` — Web 端 Git 仓库
- `mail` — 邮件服务
- `music` — 音乐模块
- `pages` / `pages-children` — 静态页与子页
- `proxy` — 反向代理
- `request` — 通用请求转发
- `rtmp` — RTMP 直播推流
- `ssl` — SSL 证书申请与续期
- `wss` — WebSocket 代理
- `bt` — 后台管理面板

---

## 📦 仓库结构

```
LTPP/
├── LTPP                 # 主程序二进制（约 30 MB）
├── LTPP-CODE-RUN        # 判题机二进制（约 36 MB）
├── LTPP-SSH             # SSH 内网穿透客户端（约 31 MB）
├── install.sh           # 一键部署脚本（参见 PR #2）
├── Conf/                # 服务端配置：Apache2 / Mysql / Nginx / Redis / Rtmp
├── InstallMust/         # 部署必备依赖（JudgeServer 等）
├── DockerData/          # 容器数据持久化：Mysql / Redis
├── Frontend/            # 前端子模块（与主服务路由一一对应）
├── public/              # 静态资源（首页、404、CSS / JS / 静态文件）
└── Music/               # 音乐模块配套工程（Node.js）
```

---

## 🚀 快速开始

> **推荐方式**：[`install.sh`](./install.sh) 在干净 Linux 主机上一键拉起主服务 + 判题机 + SSH 穿透。
> 详细说明参见 [PR #2](https://github.com/eastspire/LTPP/pull/2)。

```bash
# 1. 下载部署脚本
curl -fLO https://raw.githubusercontent.com/eastspire/LTPP/master/install.sh

# 2. 非交互：只拉起主服务 LTPP
sudo bash install.sh --component main --yes

# 3. 非交互：拉起主服务 + 判题机 + SSH 内网穿透
sudo bash install.sh --component all --yes

# 4. 仅下载主程序（不启动容器）
sudo bash install.sh --component download --yes
```

部署完成后：

- 主服务：http://&lt;host&gt;:47272
- 判题机（如已启用）：http://&lt;host&gt;:8787
- 查看容器：`docker ps`
- 查看日志：`docker logs -f LTPP`

---

## 🛠️ 系统要求

- **操作系统**：CentOS / RHEL（`yum`）或 Debian / Ubuntu（`apt`）
- **Docker**：≥ 20.10，且 `dockerd` 已在运行
- **磁盘**：≥ 10 GB
- **CPU**：≥ 2 核
- **内存**：≥ 4 GB

`install.sh` 启动时会自检上述条件；不满足会立即报错退出，不会留下半成品。

---

## 🧩 组件组合

`install.sh --component <value>` 支持以下值：

| 取值 | 行为 |
| --- | --- |
| `main` | 仅主服务（端口 47272 / 48787） |
| `main+coderun` | 主服务 + 判题机（含 LTPP-CODE-RUN 8787） |
| `all` | 主服务 + 判题机 + SSH 内网穿透 |
| `download` | 仅下载主程序到 `/home/LTPP/`，不启动容器 |

主程序下载源可通过 `--binary-url` 自定义，默认从
[GitHub Release](https://github.com/eastspire/LTPP/releases/latest/download/LTPP.tar.gz) 拉取。

---

## 🩺 常见问题

- **`docker daemon 未运行`**：执行 `systemctl start docker` 后重试。
- **镜像拉取失败**：`install.sh` 默认从腾讯云镜像仓库 `ccr.ccs.tencentyun.com/linux_environment/debian:1.0.0` 拉取；如被墙或受限，登录主机后手动 `docker pull` 后再跑脚本。
- **判题机无法启动**：检查 `/home/LTPP/InstallMust/JudgeServer/judge` 是否存在；缺失时 `install.sh` 会跳过而不是失败。
- **SSH 组件未启动**：`/home/LTPP/LTPP-SSH` 不存在时会自动跳过，可后续手动补齐。

---

## 📜 版权

主程序、配置文件与文档版权归原作者 [eastspire](https://github.com/eastspire) 所有。
