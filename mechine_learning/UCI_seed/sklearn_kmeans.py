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
    n = np.shape(dataMaat)[1]
    label = [x[n - 1] for x in dataMaat]
    dataMat = np.delete(dataMaat, n - 1, axis=1)
    return dataMat, label



start_time = time.time()

dataMat, labels = loadDataSet('seed_dataset.txt')
kmeans = KMeans(n_clusters = 3, random_state = 0).fit(dataMat)

log_time = (time.time() - start_time)

labels_pred = list(map(int, kmeans.labels_))
labels_true = list(map(int, labels))
acc = metrics.adjusted_rand_score(labels_true, labels_pred)

arrayData = np.array(dataMat)
pca = PCA(n_components=2)
dataMat = pca.fit_transform(arrayData)


plt.scatter(dataMat[:, 0], dataMat[:, 1], s=5, c=labels_pred, cmap='jet')

plt.show()

print("Adjusted Rand index:%f\tRunning Time: %s\t" % (acc, datetime.timedelta(seconds=log_time)))
