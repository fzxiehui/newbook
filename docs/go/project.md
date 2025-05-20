# 创建项目

:::tip 提示
实验环境为`ubuntu 2404`
:::

## 初始化

- 创建目录与初始化项目

```shell
mkdir demo && cd demo
go mod init demo
touch main.go
```

- `Makefile`

> Windows可加上`-H=windowsgui`隐藏`cmd`窗口.

:::warning 警告
- 修改以下`APP_NAME`
:::

```make{5}
.PHONY: help build run build-windows test test-v

default: help

APP_NAME=demo

help:
	@echo "help:"
	@echo "\tmake test"
	@echo "\tmake build"
	@echo "\tmake run"

run:
	go run main.go

build:
	go build -o bin/linux/${APP_NAME}

build-windows:
	GOOS=windows GOARCH=amd64 go build -o bin/windows/${APP_NAME}.exe

test:
	go test ./...

test-v:
	go test -v -count=1 ./...
```

- `.gitignore`

```shell
echo -e "bin\nvendor" >> .gitignore
```
