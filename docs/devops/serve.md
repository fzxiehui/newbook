# 常用服务

## ssh

### `ssh` 免密登录

```shell
ssh-copy-id username@remote-server
# e.g:
ssh-copy-id hello@172.16.1.251
# 相当于在 ~/.ssh/authorized_keys 追加公钥
```

### 禁止用密码登录`sshd`(防暴)

:::tip
- 在`ubuntu 2404`中出现`PasswordAuthentication`未生效`bug`, 解决方法: 把配置写在第一行.
:::

1. 配置 

    - `sudo vi /etc/ssh/sshd_config`

    ```shell
    PasswordAuthentication no
    ```

1. 其他配置(用处不大)

    ```shell
    # 只让用hello用户登录
    AllowUsers hello

    # 让多个用户登录
    AllowUsers hello dev admin

    # 只让特定用户,特定ip登录
    AllowUsers hello@192.168.1.*
    AllowUsers hello@172.16.1.100
    ```

1. 重启服务

    ```shell
    sudo systemctl restart ssh.service
    ```

### ip自动封禁

- 安装`sudo apt install fail2ban`

- 配置`/etc/fail2ban/jail.local`

    ```ini
    [sshd]
    enabled = true
    port    = ssh
    filter  = sshd
    logpath = /var/log/auth.log
    maxretry = 5
    bantime = 600
    findtime = 600
    ```

    | 配置项 | 说明 |
    | :----- | :--- |
    | enabled = true | 开启 sshd 防护 |
    | port = ssh | 保护 22 端口（也可以改成你自定义的端口） |
    | logpath | 读取 ssh 登录日志 |
    | maxretry = 5 | 连续输错 5 次就封 IP |
    | bantime = 600 | 封禁 600秒（10分钟） |
    | findtime = 600 | 在600秒内检测错误次数 |

- 重启`sudo systemctl restart fail2ban`

- 手动解封`sudo fail2ban-client set sshd unbanip 192.168.1.100`

- 查看封禁列表`sudo fail2ban-client status sshd`
