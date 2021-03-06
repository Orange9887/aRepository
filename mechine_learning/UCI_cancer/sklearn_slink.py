import numpy as np
from sklearn.cluster import AgglomerativeClustering
import datetime
import time
from sklearn import metrics
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA
from sklearn import metrics

def loadDataSet(fileName):  # 解析文件，按tab分割字段，得到一个浮点数字类型的矩阵
    dataMat = []  # 文件的最后一个字段是类别标签
    fr = open(fileName)
    for line in fr.readlines():
        curLine = line.strip().split(',')
        dataMat.append(curLine)
    dataMat = np.delete(dataMat, 0, axis = 0)
    dataMat = np.delete(dataMat, 0, axis = 1)
    return dataMat

def loadLabelsSet(fileName):  # 解析文件，按tab分割字段，得到一个浮点数字类型的矩阵
    dataMat = []  # 文件的最后一个字段是类别标签
    fr = open(fileName)
    for line in fr.readlines():
        curLine = line.strip().split(',')
        dataMat.append(curLine)
    for i in dataMat:
        if (i[1] == 'PRAD'):
            i[1] = 0
        if (i[1] == 'KIRC'):
            i[1] = 1
        if (i[1] == 'LUAD'):
            i[1] = 2
        if (i[1] == 'BRCA'):
            i[1] = 3
        if (i[1] == 'COAD'):
            i[1] = 4
    dataMat = [x[1] for x in dataMat]
    dataMat = list(map(int, dataMat))
    return dataMat


###########################################################
dataSet = loadDataSet('data.txt')
labels_true = loadLabelsSet('labels.txt')

start_time = time.time()


slink = AgglomerativeClustering(n_clusters=5, linkage='ward').fit(dataSet)

log_time = (time.time() - start_time)

labels_pred = list(map(int, slink.labels_))
acc = metrics.adjusted_rand_score(labels_true, labels_pred)

print("Slink\tAdjusted Rand index:%f\tRunning Time: %s\t" % (acc, datetime.timedelta(seconds = log_time)))

arrayData = np.array(dataSet)
pca = PCA(n_components=2)
dataMat = pca.fit_transform(arrayData)

plt.scatter(dataMat[:, 0], dataMat[:, 1], s=5, c=labels_pred, cmap='jet')

plt.show()

#############################################################

start_time = time.time()

clink = AgglomerativeClustering(n_clusters=5, linkage='complete').fit(dataSet)

log_time = (time.time() - start_time)

labels_pred = list(map(int, clink.labels_))
acc = metrics.adjusted_rand_score(labels_true, labels_pred)

print("Clink\tAdjusted Rand index:%f\tRunning Time: %s\t" % (acc, datetime.timedelta(seconds = log_time)))

##############################################################

start_time = time.time()

alink = AgglomerativeClustering(n_clusters=5, linkage='average').fit(dataSet)

log_time = (time.time() - start_time)

labels_pred = list(map(int, alink.labels_))
acc = metrics.adjusted_rand_score(labels_true, labels_pred)

print("Alink\tAdjusted Rand index:%f\tRunning Time: %s\t" % (acc, datetime.timedelta(seconds = log_time)))


