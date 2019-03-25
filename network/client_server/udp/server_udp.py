import socket
import time

s = socket.socket(type = socket.SOCK_DGRAM)
s.bind(('127.0.0.1',8282))

print("Waiting...")

while True:
	content, addr = s.recvfrom(1024)
	usr, psw = content.decode('utf-8').split()
	if usr == 'ykz' and psw == '112233':
		s.sendto('Access'.encode('utf-8'), addr)
		print('Access, ' + usr + ' from ' + str(addr))
	else:
		s.sendto('Wrong'.encode('utf-8'), addr)