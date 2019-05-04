import numpy as np
from sklearn.cluster import DBSCAN
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

import datetime
import time
from sklearn import metrics

def loadDataSet(fileName):  # 解析文件，按tab分割字段，得到一个浮点数字类型的矩阵
    dataMaat = []  # 文件的最后一个字段是类别标签
    fr = open(fileName)
    for line in fr.readlines():
        curLine = line.strip().split('\t')
        fltLine = list(map(float, curLine))  # 将每个元素转成float类型
        dataMaat.append(fltLine)
    n = np.shape(dataMaat)[1]
    label = [x[n - 1] for x in dataMaat]
    dataMat = np.delete(dataMaat, n - 1, axis=1)
    return dataMat, label

def removeNoise(y_pred, y_true, dataMat):
    y_pred1 = []
    y_true1 = []
    dataMat1 = []
    for i in range(len(y_pred)):
        if y_pred[i] != -1:
            y_pred1.append(y_pred[i])
            y_true1.append(y_true[i])
            dataMat1.append(dataMat[i])
    return y_pred1, y_true1, dataMat1

dataMat, labels = loadDataSet('seed_dataset.txt')

starttime = time.time()
dbscan = DBSCAN(eps = 0.6, min_samples = 6).fit(dataMat)
log_time = time.time() - starttime

labels_pred = list(map(int, dbscan.labels_))
labels_true = list(map(int, labels))

labels_predno, labels_trueno,dataMat = removeNoise(labels_pred, labels_true, dataMat)
        #acc = metrics.adjusted_rand_score(labels_trueno, labels_predno)

        #print("eps:%f\tmin_samples:%d\tAdjusted Rand index:%f\tRunning Time: %s\t" % (p, j, acc, datetime.timedelta(seconds=log_time)))


arrayData = np.array(dataMat)
pca = PCA(n_components=2)
dataMat = pca.fit_transform(arrayData)


plt.scatter(dataMat[:, 0], dataMat[:, 1], s=5, c=labels_predno, cmap='jet')

plt.show()