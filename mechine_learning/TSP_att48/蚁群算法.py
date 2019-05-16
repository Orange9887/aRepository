import numpy as np
import matplotlib.pyplot as plt
import time
import datetime


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

start_time = time.time()
dataSet = loadDataSEt('data.txt')


def getdistmat(dataSet):
    num = dataSet.shape[0]
    distmat = np.zeros((num, num))
    for i in range(num):
        for j in range(i, num):
            distmat[i][j] = distmat[j][i] = np.linalg.norm(dataSet[i] - dataSet[j])
    return distmat


numant = 40  # 蚂蚁个数
numcity = dataSet.shape[0]  # 城市个数
alpha = 2  # 信息素重要程度因子
beta = 2  # 启发函数重要程度因子
rho = 0.2  # 信息素的挥发速度
Q = 10000
iter = 0
itermax = 200

distmat = getdistmat(dataSet)
etatable = 1.0 / (distmat + np.diag([1e10] * numcity))  # 启发函数矩阵，表示蚂蚁从城市i转移到矩阵j的期望程度
pheromonetable = np.ones((numcity, numcity))  # 信息素矩阵
pathtable = np.zeros((numant, numcity)).astype(int)  # 路径记录表
lengthaver = np.zeros(itermax)  # 各代路径的平均长度
lengthbest = np.zeros(itermax)  # 各代及其之前遇到的最佳路径长度
pathbest = np.zeros((itermax, numcity))  # 各代及其之前遇到的最佳路径长度



while iter < itermax:
    # 随机产生各个蚂蚁的起点城市
    if numant <= numcity:  # 城市数比蚂蚁数多
        pathtable[:, 0] = np.random.permutation(range(0, numcity))[:numant]
    else:  # 蚂蚁数比城市数多，需要补足
        pathtable[:numcity, 0] = np.random.permutation(range(0, numcity))[:]
        pathtable[numcity:, 0] = np.random.permutation(range(0, numcity))[:numant - numcity]
    length = np.zeros(numant)  # 计算各个蚂蚁的路径距离
    for i in range(numant):
        visiting = pathtable[i, 0]  # 当前所在的城市
        unvisited = set(range(numcity))  # 未访问的城市,以集合的形式存储{}
        unvisited.remove(visiting)  # 删除元素；利用集合的remove方法删除存储的数据内容
        for j in range(1, numcity):  # 循环numcity-1次，访问剩余的numcity-1个城市
            # 每次用轮盘法选择下一个要访问的城市
            listunvisited = list(unvisited)
            probtrans = np.zeros(len(listunvisited))
            for k in range(len(listunvisited)):
                probtrans[k] = np.power(pheromonetable[visiting][listunvisited[k]], alpha) \
                               * np.power(etatable[visiting][listunvisited[k]], beta)
            cumsumprobtrans = (probtrans / sum(probtrans)).cumsum()
            cumsumprobtrans -= np.random.rand()
            k = listunvisited[(np.where(cumsumprobtrans > 0)[0])[0]]  # python3中原代码运行bug，类型问题；鉴于此特找到其他方法
            # 通过where（）方法寻找矩阵大于0的元素的索引并返回ndarray类型，然后接着载使用[0]提取其中的元素，用作listunvisited列表中
            # 元素的提取（也就是下一轮选的城市）
            pathtable[i, j] = k  # 添加到路径表中（也就是蚂蚁走过的路径)
            unvisited.remove(k)  # 然后在为访问城市set中remove（）删除掉该城市
            length[i] += distmat[visiting][k]
            visiting = k
        length[i] += distmat[visiting][pathtable[i, 0]]  # 蚂蚁的路径距离包括最后一个城市和第一个城市的距离
        # 包含所有蚂蚁的一个迭代结束后，统计本次迭代的若干统计参数
    lengthaver[iter] = length.mean()
    if iter == 0:
        lengthbest[iter] = length.min()
        pathbest[iter] = pathtable[length.argmin()].copy()
    else:
        if length.min() > lengthbest[iter - 1]:
            lengthbest[iter] = lengthbest[iter - 1]
            pathbest[iter] = pathbest[iter - 1].copy()
        else:
            lengthbest[iter] = length.min()
            pathbest[iter] = pathtable[length.argmin()].copy()
    # 更新信息素
    changepheromonetable = np.zeros((numcity, numcity))
    for i in range(numant):
        for j in range(numcity - 1):
            changepheromonetable[pathtable[i, j]][pathtable[i, j + 1]] += Q / distmat[pathtable[i, j]][
                pathtable[i, j + 1]]  # 计算信息素增量
        changepheromonetable[pathtable[i, j + 1]][pathtable[i, 0]] += Q / distmat[pathtable[i, j + 1]][pathtable[i, 0]]
    pheromonetable = (1 - rho) * pheromonetable + changepheromonetable  # 计算信息素公式
    iter += 1  # 迭代次数指示器+1

log_time = time.time() - start_time
log_time = datetime.timedelta(seconds=log_time)
print(log_time)

np.set_printoptions(threshold=np.inf)
for i in range(len(lengthbest)):
    print(lengthbest[i], end = ' ')

    #print("iter:", iter)


#
#
#
# # 做出平均路径长度和最优路径长度
# fig, axes = plt.subplots(nrows=2, ncols=1, figsize=(12, 10))
# axes[0].plot(lengthaver, 'b', marker=u'')
# axes[0].set_title('Average Length')
# axes[0].set_xlabel(u'iteration')
#
# axes[1].plot(lengthbest, 'b', marker=u'')
# axes[1].set_title('Best Length')
# axes[1].set_xlabel(u'iteration')
# fig.savefig('蚁群算法收敛过程', dpi=500, bbox_inches='tight')
# plt.show()
#
# # 作出找到的最优路径图
# print(pathbest[-1])
# bestpath = pathbest[-1]
# plt.xlim([-100, 8000])
# plt.ylim([-100, 8000])
#
# for i in range(numcity - 1):
#     m = int(bestpath[i])
#     n = int(bestpath[i + 1])
#     plt.plot([dataSet[m][0], dataSet[n][0]], [dataSet[m][1], dataSet[n][1]], 'b')
# plt.plot([dataSet[int(bestpath[0])][0], dataSet[int(n)][0]],
#          [dataSet[int(bestpath[0])][1], dataSet[int(n)][1]], 'b')
#
# ax = plt.gca()
# plt.savefig('蚁群算法最佳路径.png', dpi=500, bbox_inches='tight')
# plt.show()
#
# print(lengthbest[249])

# [41.  4. 47. 38. 31. 20. 12. 24. 13. 22. 10. 11. 14. 39.  8.  0.  7. 37.
#  30. 43. 17.  6. 27. 35. 29. 42. 16. 26. 18. 36.  5. 45. 32. 19. 46.  2.
#  21. 15. 40. 33. 28.  1. 25.  3. 34. 44. 23.  9.]
# 34986.71120716787

