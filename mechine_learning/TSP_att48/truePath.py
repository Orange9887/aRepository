import numpy as np
import matplotlib.pyplot as plt
import pylab


def loadDataSEt(filename):
    dataSet = np.zeros((48,2), dtype = int)
    f = open(filename)
    lines = f.readlines()
    A_row = 0
    for line in lines:
        list = line.strip().split(' ')
        dataSet[A_row:] = list[1:3]
        A_row += 1
    return dataSet

dataSet = loadDataSEt('data.txt')

#需要将bestpath换为att48.opt.tour中的路径
bestpath = [35, 19, 46, 12, 24, 22, 10, 11, 32, 45, 30, 37, 8, 39, 14, 20, 47, 4, 41, 9, 34, 44, 23, 31, 38, 13, 2, 15, 40, 1, 3, 25, 28, 33, 21, 0, 7, 43, 17, 29, 42, 26, 16, 18, 36, 5, 27, 6]
bestpath = np.array(bestpath)
bestpath = bestpath
length = 0
numcity = dataSet.shape[0]
for i in range(numcity - 1):
    m = int(bestpath[i])
    n = int(bestpath[i + 1])
    length += (np.linalg.norm(dataSet[m] - dataSet[n]))
print(length)


numcity = dataSet.shape[0]

print(bestpath)

plt.xlim([-100, 8000])
plt.ylim([-100, 8000])

for i in range(numcity - 1):
    m = int(bestpath[i])
    n = int(bestpath[i + 1])
    plt.plot([dataSet[m][0], dataSet[n][0]], [dataSet[m][1], dataSet[n][1]], 'b')
plt.plot([dataSet[int(bestpath[0])][0], dataSet[int(n)][0]],
         [dataSet[int(bestpath[0])][1], dataSet[int(n)][1]], 'b')
ax = plt.gca()

plt.savefig('最佳路径.png', dpi=500, bbox_inches='tight')
plt.show()

#33061.62626367373