# from __future__ import division
list_of_lists = [[1,2,3],
				  [4,5,6],
				  [7,8,9]]
# print(list_of_lists)
import re as regex
myRegex = regex.compile("[0-9]+",regex.I)
print(myRegex.match("92144123ab12"))

from collections import defaultdict , Counter
a = defaultdict(dict) #str ,int ,list ,set,tuple produces empty (list,int) in case of missing values for keys
b = Counter([1,2,3,4,45,4])
# print(b)
def double(x):
	return 2*x
def apply_to_one(f):
	return f(1)
my_double = double
# print(apply_to_one(my_double))
fun = (lambda x: 2*x + 4)
# print(apply_to_one(fun))

def message(msg = "world"):
	return "hello " + msg
# print(message('raj'))
# print(message())
directory = r"C:\Users\I354770\Desktop\Desktop\t"
# print(directory)

# x = input("value nominator")
# y = input("value denominator")
# try :
# 	print(x/y)
# except ZeroDeivisionError:
# 	print("cannot divide by zero")

# ###########################################################################################
# List
integer_list = [1,2,3]
heterogenous_list = ["string", 2, True ,2.5]
list_of_lists = [integer_list , heterogenous_list ,[]]
list_length = len(list_of_lists)
sum_of_lists = sum(integer_list)
# print(list_length,sum_of_lists)

x = [1,2,3,4,5,6,7,8,9,0]
# print(x[0], x[-1], x[-2])
# print(x[:3],x[3:],x[2:5],x[2:-2])
# print( 1 in x)
x.extend([12,1,2,3])
x = x + [1,2,3]
x = [1,2,3] + x
x.append(4)
# print(x)
_, y = [1,2]
# print(y)

# ############################################################################################
# Tuples
myTuple = (1,2)
try :
	myTuple[1] = 3
except TypeError:
	print("cannot modify Tuple")
def sum_and_products(x,y):
	return ((x+y),(x*y))
print(sum_and_products(2,4))

x ,y = 1, 2
x ,y = y, x
emptyDict = {}
emptyDict = dict()

grades = {"raj" : 70 , "hema" :30}
# try :
# 	print(grades["fr"])
# except KeyError:
# 	print("unable to fetch values")
if "fr" in grades:
	print("value")
print(grades.keys())
print(grades.values())
# for k,v in grades.items():
# 	print(k,v)
# print(grades.get("raj",80))
# print(grades.get("gori",0))
# Tuples are immutable and so Dict keys should be string or list

# use defaultdict of dict , list ,int ,tuples , set
# Counter has a instance method most common used for collecting 10 most common used words

# ################################################################################
# Set 
s = set()
s.add(1)
s.add(2)
s.add(2)
# print(s)
# print(len(s))
# use is opeartor to check equality and unequlity
# False , None ,  [] ,{} , "" , set() , 0 ,0.0 all are false



