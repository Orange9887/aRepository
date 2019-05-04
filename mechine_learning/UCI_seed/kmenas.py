from numpy import *
import datetime
import time
from sklearn import metrics
import numpy as np
from sklearn.cluster import KMeans
import datetime
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
import time
from sklearn import metrics


def loadDataSet(fileName):  # 解析文件，按tab分割字段，得到一个浮点数字类型的矩阵
    dataMaat = []  # 文件的最后一个字段是类别标签
    fr = open(fileName)
    for line in fr.readlines():
        curLine = line.strip().split('\t')
        fltLine = list(map(float, curLine))  # 将每个元素转成float类型
        dataMaat.append(fltLine)
    n = shape(dataMaat)[1]
    label = [x[n - 1] for x in dataMaat]
    dataMat = delete(dataMaat, n - 1, axis=1)
    return dataMat, label


def distEclud(vecA, vecB):
    return sqrt(sum(power(vecA - vecB, 2)))



def randCent(dataSet, k):
    n = shape(dataSet)[1]
    centroids = mat(zeros((k, n)))
    for j in range(n):
        minJ = min(dataSet[:, j])
        maxJ = max(dataSet[:, j])
        rangeJ = float(maxJ - minJ)
        centroids[:, j] = minJ + rangeJ * random.rand(k, 1)
    return centroids



def kMeans(dataSet, k, distMeans=distEclud, createCent=randCent):
    m = shape(dataSet)[0]
    clusterAssment = mat(zeros((m, 2))) 
    centroids = createCent(dataSet, k)
    clusterChanged = True
    while clusterChanged:
        clusterChanged = False;
        for i in range(m):
            minDist = inf;
            minIndex = -1;
            for j in range(k):
                distJI = distMeans(centroids[j, :], dataSet[i, :])
                if distJI < minDist:
                    minDist = distJI;
                    minIndex = j 
            if clusterAssment[i, 0] != minIndex: clusterChanged = True;  # 如果分配发生变化，则需要继续迭代
            clusterAssment[i, :] = minIndex, minDist ** 2 
        #print(centroids)
        for cent in range(k):
            ptsInClust = dataSet[nonzero(clusterAssment[:, 0].A == cent)[0]]  
            centroids[cent, :] = mean(ptsInClust, axis=0)  # 算出这些数据的中心点
    return centroids, clusterAssment


########################################################

datMat, label = loadDataSet('seed_dataset.txt')
start_time = time.time()
myCentroids, clustAssing = kMeans(datMat, 3)

print(myCentroids)
print(clustAssing)

log_time = (time.time() - start_time)
#print("Accuracy: %s" % acc_log)

print("Running Time: %s" % datetime.timedelta(seconds=log_time))
label_pred = delete(clustAssing, 1, axis=1)
label_pred = list(map(int, label_pred))
label_true = list(map(int, label))
acc = metrics.adjusted_rand_score(label_true, label_pred)


arrayData = np.array(datMat)
pca = PCA(n_components=2)
dataMat = pca.fit_transform(arrayData)


plt.scatter(dataMat[:, 0], dataMat[:, 1], s=5, c=label_pred, cmap='jet')

plt.show()

print("Adjusted Rand index:%f\tRunning Time: %s\t" % (acc, datetime.timedelta(seconds=log_time)))


