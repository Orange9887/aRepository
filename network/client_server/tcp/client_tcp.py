import socket
import time

s = socket.socket(type = socket.SOCK_STREAM)
s.connect(('127.0.0.1',8181))

while True:
	usr = input("please input username: ")
	psw = input("please input password: ")
	s.send((usr + ' ' + psw).encode('utf-8'))
	res = s.recv(1024).decode('utf-8')
	if res == 'Access':
		print('Access!')
		break
	else:
		print('Wrong username or password!')

time.sleep(3)