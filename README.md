# LTPP 宇宙 🚀

LTPP（在线评测平台）的一键部署仓库。本仓库托管部署所需的脚本与说明，
主程序二进制、Docker 镜像、`InstallMust/` 等子目录保持原样。

> 推荐使用 [`install.sh`](./install.sh) 在干净的 Linux 主机上一键拉起。

---

## ⚡ 30 秒快速开始

```bash
# 1. 下载部署脚本
curl -fLO https://raw.githubusercontent.com/eastspire/LTPP/master/install.sh

# 2. 执行（脚本会自检 root / docker / 网络）
sudo bash install.sh --component main --yes

# 3. 部署完成后
docker ps                       # 应看到 LTPP 容器在运行
curl http://localhost:47272     # 访问主服务
```

### 常用命令

| 命令 | 作用 |
| --- | --- |
| `--component main` | 只装主服务（端口 47272 / 48787） |
| `--component main+coderun` | 主服务 + 判题机（端口 8787） |
| `--component all` | 主服务 + 判题机 + SSH 内网穿透 |
| `--component download` | 仅下载主程序，不启动容器 |
| `--binary-url <url>` | 自定义主程序下载源 |
| `--yes` | 非交互模式 |

---

## 🧱 系统要求

- **操作系统**: CentOS / RHEL 或 Debian / Ubuntu
- **权限**: root（脚本内会自检）
- **Docker**: ≥ 20.10（脚本会调用 `docker info` 校验 daemon）
- **网络**: 能访问 Docker Hub / 腾讯云镜像仓库（默认 `ccr.ccs.tencentyun.com`）
- **磁盘**: ≥ 10 GB（主程序 + Docker 镜像 + 用户数据）
- **CPU / 内存**: ≥ 2 核 / 4 GB（脚本按核心数自动分配 CPU 上限）

---

## 📦 部署后产物

`install.sh` 会在主机上创建：

- `/home/LTPP/` — 主程序、判题机、SSH 穿透二进制所在目录
- `/home/LTPPSANDBOX/` — 代码执行沙箱（脚本会自动 mount proc）
- Docker 网络 `LTPP` — 容器间通信
- 容器 `LTPP`（主服务）/ `LTPP-CODE-RUN`（判题机）/ `LTPP-SSH`（穿透）

---

## 🛠 常用运维

```bash
# 查看所有 LTPP 容器
docker ps -a --filter "name=LTPP"

# 看主服务日志
docker logs -f LTPP

# 重启所有组件
docker restart LTPP LTPP-CODE-RUN LTPP-SSH 2>/dev/null

# 停止并清理
docker rm -f LTPP LTPP-CODE-RUN LTPP-SSH
docker network rm LTPP
```

---

## 🧩 子目录

| 路径 | 用途 |
| --- | --- |
| `Conf/` | 主程序配置文件 |
| `DockerData/` | 持久化数据（MySQL / Redis 等） |
| `Frontend/` | 前端静态资源 |
| `InstallMust/` | 判题机、初始化依赖等只读资源 |
| `Music/` | 站点音乐相关资源 |
| `public/` | 公开访问目录 |

---

## ❓ 故障排查

1. **`docker daemon 未运行`** → `systemctl start docker` 并设置开机自启
2. **`镜像拉取失败`** → 切换到国内镜像（如 `docker.mirrors.ustc.edu.cn`）后重跑
3. **`判题机容器起不来`** → 检查 `InstallMust/JudgeServer/judge` 是否存在
4. **主程序下载失败** → 用 `--binary-url` 指向你自己的镜像

更多问题可到 [`eastspire/Install`](https://github.com/eastspire/Install) 仓库查阅原始脚本。

---

## 📜 许可与版权

本仓库脚本基于 [eastspire/Install](https://github.com/eastspire/Install) 项目的
`ltpp.sh` / `ltpp-code-run.sh` / `ltpp-ssh.sh` 重构整合，版权归属原作者 eastspire。
