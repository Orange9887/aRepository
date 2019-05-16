import random
import math
import numpy as np
import time
import datetime

class Graph():
  def __init__(self):
    self.points = []
    with open("att48.tsp", "rt") as f:
      text = f.read().split('\n')
      for line in text:
        numbers = line.split(' ')
        if numbers[0].isdigit():
          self.points.append(np.array([float(i) for i in numbers[1:3]]))
    self.n = len(self.points)

  def dist(self, x, y):
    return np.linalg.norm(self.points[x] - self.points[y])

  def total_dist(self, permutation):
    result = 0
    for i in range(0, self.n):
      result += self.dist(permutation[i], permutation[(i + 1) % self.n])
    return result

class SO():
  def __init__(self, x, y):
    self.x = x
    self.y = y

  def __str__(self):
    return self.__repr__

  def __repr__(self):
    return str(self.x) + ' ' + str(self.y)


def minus(pa, pb):
  assert(len(pa) == len(pb))
  result = []
  for i in range(len(pa)):
    if pa[i] == pb[i]:
      continue
    index = pa.index(pb[i])
    result.append(SO(i, index))
    assert(index > i)
    pa[i], pa[index] = pa[index], pa[i]
  assert(pa == pb)
  return result


def get_permutation(permutation, SOs):
  result = permutation
  for so in SOs:
    result[so.x], result[so.y] = result[so.y], result[so.x]
  return result


def multipy(SOs, x):
  result = []
  for so in SOs:
    if random.random() <= x:
      result.append(so)
  return result


def add(n, SOs_a, SOs_b):
  pa = [i for i in range(0, n)]
  pb = pa.copy()
  pb = get_permutation(pb, SOs_a)
  pb = get_permutation(pb, SOs_b)
  return minus(pa, pb)


class Particles():
  graph = Graph()
  def __init__(self, w, alpha, beta):
    self.w = w
    self.alpha = alpha
    self.beta = beta
    self.current_path = [i for i in range(0, Particles.graph.n)]
    random.shuffle(self.current_path)
    self.current_cost = Particles.graph.total_dist(self.current_path)
    self.pbest_path = self.current_path
    self.pbest_cost = self.current_cost
    self.v = []

  def update(self, gbest_path, gbest_cost):
    self.v = multipy(self.v, self.w)
    SO_a = minus(self.current_path, self.pbest_path)
    SO_b = minus(self.current_path, gbest_path)
    self.v = add(Particles.graph.n, self.v, multipy(SO_a, self.alpha * random.random()))
    self.v = add(Particles.graph.n, self.v, multipy(SO_b, self.beta * random.random()))
    # if random.random() < 0:
    #   self.v.append(SO(random.randint(0, Particles.graph.n - 1), random.randint(0, Particles.graph.n - 1)))
    self.current_path = get_permutation(self.current_path, self.v)
    self.current_cost = Particles.graph.total_dist(self.current_path)
    if self.current_cost < self.pbest_cost:
      self.pbest_path = self.current_path
      self.pbest_cost = self.current_cost


class PSO:
  def solve(self, particles_number, iterations, w, alpha, beta):
    particles = []
    for t in range(0, particles_number):
      particles.append(Particles(w, alpha, beta))

    def find_gbest_path():
      gbest_cost = np.inf
      gbest_path = None
      for p in particles:
        if p.current_cost < gbest_cost:
          gbest_cost = p.current_cost
          gbest_path = p.current_path
      return gbest_path, gbest_cost

    gbest_path, gbest_cost = find_gbest_path()
    ans_path, ans_cost = gbest_path, gbest_cost

    for t in range(0, iterations):
      for p in particles:
        p.update(gbest_path, gbest_cost)
      gbest_path, gbest_cost = find_gbest_path()
      print(gbest_cost, end=' ')
      if gbest_cost < ans_cost:
        ans_cost = gbest_cost
        ans_path = gbest_path
      # print(gbest_cost)
    return ans_path, ans_cost

if __name__ == '__main__':
    start_time = time.time()
    pso = PSO()
    beta = 1
    while beta < 5:
        print('alpha%d' % beta)
        ans_path, ans_cost = pso.solve(500, 200, 0.3, 2, beta)
        log_time = time.time() - start_time
        log_time = datetime.timedelta(seconds=log_time)
        print('\n')
        beta += 1
        # print(ans_cost)
        # print(ans_path)
        # print(log_time)