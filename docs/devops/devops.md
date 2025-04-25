# 开发与运维

## `ssh` 免密登录

```shell
ssh-copy-id username@remote-server
# e.g:
ssh-copy-id hello@172.16.1.251
# 相当于在 ~/.ssh/authorized_keys 追加公钥
```

## 禁止用密码登录`sshd`(防暴)

- `sudo vi /etc/ssh/sshd_config`

```shell
PasswordAuthentication no
```

## 修改系统默认编辑器为`vi`

```shell
echo "export EDITOR=/usr/bin/vi" >> ~/.bashrc
source ~/.bashrc
```

## 使用 `https` 访问 `github ssh`

1. 测试端口
	```shell
	# 测试超时 22
	ssh -T git@github.com
	
	# 测试 成功! 443 
	ssh -T -p 443 git@ssh.github.com
	```

1. 修改配置

	```shell
	vim ~/.ssh/config
	# 添加以下内容
	Host github.com
		Hostname ssh.github.com
		Port 443
	```

## 硬盘管理

- 硬盘总体情况

	```shell
	df -h

    文件系统        大小  已用  可用 已用% 挂载点
    tmpfs           1.6G  2.6M  1.6G    1% /run
    /dev/nvme0n1p2  937G   72G  818G    9% /
    ....
	```

- 文件占用分析(ls)

	```shell
	# --block-size=M 以M 为统计单位
	# ls 只对文件有用,目录大小固定 4k
	ls -l --block-size=M
	# or
	ls -lh
	```

- 文件占用分析(du)

	```shell
	# 查看指定目录中各文件大小
	# -k 代表以 K 为统计单位, 可以改为 -m 统计单位 M 
	# --max-depth=1 代表递归深度为1
	du -k --max-depth=1 src/
	# or 
	# 统计大小 可以加上 -s 参数
	du -lh 
	```

## 文件

1. 查找

```shell
# 递归子目录全部 txt文件
find . -name "*.txt"

# 递归子目录全部 txt文件 过滤出有hello的文件
find . -name "*.txt" | xargs grep 'hello'
```

1. 临时文件服务器

```shell
cd /path/to/your/file
python3 -m http.server 8080
# 用浏览器打开 http://ip:8080 会出现文件列表
```
