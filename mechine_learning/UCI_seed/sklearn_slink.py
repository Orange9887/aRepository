import numpy as np
from sklearn.cluster import AgglomerativeClustering
import datetime
import time
import numpy as np
from sklearn.cluster import DBSCAN
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
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

##########################################################################



dataMat, labels = loadDataSet('seed_dataset.txt')
start_time = time.time()
slink = AgglomerativeClustering(n_clusters=3, linkage='ward').fit(dataMat)
log_time1 = (time.time() - start_time)

labels_pred = list(map(int, slink.labels_))
labels_true = list(map(int, labels))
acc = metrics.adjusted_rand_score(labels_true, labels_pred)

print("Slink\tAdjusted Rand index:%f\tRunning Time: %s\t" % (acc, datetime.timedelta(seconds = log_time1)))

arrayData = np.array(dataMat)
pca = PCA(n_components=2)
dataMat = pca.fit_transform(arrayData)


plt.scatter(dataMat[:, 0], dataMat[:, 1], s=5, c=labels_pred, cmap='jet')

plt.show()

start_time = time.time()
clink = AgglomerativeClustering(n_clusters=3, linkage='complete').fit(dataMat)
log_time2 = (time.time() - start_time)

labels_pred = list(map(int, clink.labels_))
labels_true = list(map(int, labels))
acc = metrics.adjusted_rand_score(labels_true, labels_pred)

print("Clink\tAdjusted Rand index:%f\tRunning Time: %s\t" % (acc, datetime.timedelta(seconds = log_time2)))


start_time = time.time()
alink = AgglomerativeClustering(n_clusters=3, linkage='average').fit(dataMat)
log_time3 = (time.time() - start_time)

labels_pred = list(map(int, alink.labels_))
labels_true = list(map(int, labels))
acc = metrics.adjusted_rand_score(labels_true, labels_pred)

print("Alink\tAdjusted Rand index:%f\tRunning Time: %s\t" % (acc, datetime.timedelta(seconds = log_time3)))





