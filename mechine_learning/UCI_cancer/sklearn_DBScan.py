import numpy as np
from sklearn.cluster import DBSCAN
import datetime
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA
from sklearn import metrics

import time
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



###########################################################


dataSet = loadDataSet('data.txt')
labels_true = loadLabelsSet('labels.txt')

starttime = time.time()
dbscan = DBSCAN(eps = 176, min_samples = 3).fit(dataSet)

log_time = time.time() - starttime
labels_pred = list(map(int, dbscan.labels_))

labels_predno, labels_trueno, dataSet =  removeNoise(labels_pred,labels_true, dataSet)

arrayData = np.array(dataSet)
pca = PCA(n_components=2)
dataMat = pca.fit_transform(arrayData)

plt.scatter(dataMat[:, 0], dataMat[:, 1], s=5, c=labels_predno, cmap='jet')

plt.show()





