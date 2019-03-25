import socket
import time

s = socket.socket(type = socket.SOCK_DGRAM)
addr = ('127.0.0.1',8282)

while True:
	usr = input("please input username: ")
	psw = input("please input password: ")
	s.sendto((usr + ' ' + psw).encode('utf-8'), addr)
	content, tmp = s.recvfrom(1024)
	res = content.decode('utf-8')
	if res == 'Access':
		print('Access!')
		break
	else:
		print('Wrong username or password!')

time.sleep(3)