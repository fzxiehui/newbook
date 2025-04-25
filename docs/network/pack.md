# 数据包

## `tcp`三次握手

@startuml
autonumber
participant Client
participant Server

Client -> Server : SYN(Seq=x)
Server -> Client : SYN-ACK(Seq=y, Ack=x+1)
Client -> Server : ACK(Ack=y+1)
@enduml


## `tcp`四次挥手

@startuml
autonumber
participant Client
participant Server

Client -> Server : FIN(Seq=u)
Server -> Client : ACK(Ack=u+1)
Server -> Client : FIN(Seq=v)
Client -> Server : ACK(Ack=v+1)
@enduml


## 实验环境搭建

:::tip 实验环境 
- `ubuntu 2404`
- `python3.9.0`
:::

```shell
python -m venv venv
source venv/bin/activate
pip install scapy
```

## tcp实验

### 模拟SYN报文（第一次握手）

- 运行: `sudo ./venv/bin/python syn.py`
- 抓包过滤建议: `ip.dst == 192.168.1.1`
- 代码`syn.py`

```python
# 导包
from scapy.all import *

# 显示可用接口
print(show_interfaces())

# 网口
ether = Ether(src="01:01:01:01:01:01")
# IP
ip = IP(src="192.168.1.254", dst="192.168.1.1")
# TCP -> SYN
syn = TCP(sport=12345, dport=9090, flags="S", seq=1000)

# 组装
packet = ether / ip / syn

# 从指定网口发出
send(packet, iface="lo")
```

### tcp连接与断开

:::warning 提示
- 该示例没有实用价值,只是作为`tcp`连接过程的展示.
- 如果抓包时发现在服务端返回`SYN-ACK`后,出现`RST`包,是因为系统内核防御机制.属于正常现象.
:::

- 开启测试服务器`nc -l 9090`
- 抓包过滤建议: `tcp.port == 9090 || tcp.port == 12345`
- 代码`tcp.py`

```python
from scapy.all import *

# 本地 IP 和目标 IP
src_ip = "127.0.0.1"  # 替换为你本地IP
dst_ip = "127.0.0.1"  # 目标IP，运行 nc -l 9090 的机器

# 源端口随机选一个，目的端口为 9090
# sport = RandShort()
sport = 12345
dport = 9090

# 1. TCP 三次握手
print(">>> 发送 SYN")
ip = IP(src=src_ip, dst=dst_ip)
syn = TCP(sport=sport, dport=dport, flags="S", seq=1000)
synack = sr1(ip/syn, timeout=1, iface="lo")

if not synack:
    print(">>> 未收到 SYN-ACK，连接失败")
    exit()

print(">>> 收到 SYN-ACK，发送 ACK")
ack = TCP(sport=sport, dport=dport, flags="A", seq=synack.ack, ack=synack.seq + 1)
send(ip/ack, iface="lo")

# 2. TCP 四次挥手
print(">>> 发送 FIN")
fin = TCP(sport=sport, dport=dport, flags="FA", seq=synack.ack, ack=synack.seq + 1)
finack = sr1(ip/fin, timeout=1)

if finack:
    print(">>> 收到 FIN-ACK，发送最后 ACK")
    lastack = TCP(sport=sport, dport=dport, flags="A", seq=finack.ack, ack=finack.seq + 1)
    send(ip/lastack, iface="lo")
else:
    print(">>> 未收到 FIN-ACK")

print(">>> 连接关闭完成")
```
