import socket
import threading

def tcplink(sock, addr):
	print("Accepted a new connect from " + str(addr))

	while True:
		content = sock.recv(1024).decode('utf-8')
		usr, psw = content.split()

		if usr == 'ykz' and psw == '112233':
			sock.send("Access".encode('utf-8'))
			print("Access, " + usr)
			break
		else:
			sock.send("Wrong".encode('utf-8'))

s = socket.socket(type = socket.SOCK_STREAM)
s.bind(('127.0.0.1',8181))
s.listen(10)

print("Waiting...")

while True:
	sock, addr = s.accept()
	t = threading.Thread(target = tcplink, args = (sock, addr))
	t.start()