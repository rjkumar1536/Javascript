from collections import 	Counter			
from collections import defaultdict

def friends_you_may_know(id,users):
	friend_suggester = []
	my_friend = users[id]
	for each_friend in my_friend:
		for friend_of_my_friend in users[each_friend[0]]:
			if friend_of_my_friend[0] != id and friend_of_my_friend not in friend_suggester:
				friend_suggester.append(friend_of_my_friend)
	return friend_suggester


users = [
{ "id": 0, "name": "Hero" },
{ "id": 1, "name": "Dunn" },
{ "id": 2, "name": "Sue" },
{ "id": 3, "name": "Chi" },
{ "id": 4, "name": "Thor" },
{ "id": 5, "name": "Clive" },
{ "id": 6, "name": "Hicks" },
{ "id": 7, "name": "Devin" },
{ "id": 8, "name": "Kate" },
{ "id": 9, "name": "Klein" }
]

friendships = [(0, 1), (0, 2), (1, 2), (1, 3), (2, 3), (3, 4),
(4, 5), (5, 6), (5, 7), (6, 8), (7, 8), (8, 9)]

for user in users:
	user["friends"] = []

friend_dict = {}

for i,j in friendships:
	users[i]["friends"].append(users[j])
	users[j]["friends"].append(users[i])
	# friend_dict[i] = users[i]["friends"]
	# friend_dict[j] = users[j]["friends"]

avg_num_of_friends = 0

for user in users:
	avg_num_of_friends = avg_num_of_friends  + len(user["friends"])
avg_num_of_friends = avg_num_of_friends/len(users);
# print(avg_num_of_friends)
id_num_friends = [(user["id"],len(user["friends"])) for user in users ]
def	not_the_same(user,	other_user):				
	return	user["id"]	!=	other_user["id"]
def	not_friends(user,	other_user):				
	return	all(not_the_same(friend,other_user)													
				for	friend	in	user["friends"])

def	friends_of_friend_ids(user):	
		ls = []			
		for	friend	in	user["friends"]		:						
			for	foaf	in	friend["friends"]	:			
				if	not_the_same(user,	foaf)	and	not_friends(user,	foaf):					
							ls.append(foaf['id'])	
		return ls
x = Counter(friends_of_friend_ids(users[3]))
interests	=	[(0,"Hadoop"),	(0,	"Big	Data"),	(0,	"HBase"),	(0,	"Java"),		
		         (0,"Spark"),(0,"Storm"),(0,	"Cassandra"),(1,	"NoSQL"),	
		         (1,"MongoDB"),	(1,	"Cassandra"),	(1,	"HBase"),				
		         (1,"Postgres"),	(2,	"Python"),	(2,	"scikit-learn"),	
		         (2,"scipy"),	(2,	"numpy"),	(2,	"statsmodels"),	
		         (2,"pandas"),	(3,	"R"),	(3,	"Python"),	(3,	"statistics"),	
		         (3,"regression"),	(3,	"probability"),	(4,	"machine	learning"),
		         (4,"regression"),	(4,	"decision	trees"),				
		         (4,"libsvm"),	(5,	"Python"),	(5,	"R"),	(5,	"Java"),(5,	"C++"),				
		         (5,"Haskell"),	(5,	"programming	languages"),	(6,	"statistics"),				
		         (6,"probability"),	(6,	"mathematics"),	(6,	"theory"),				
		         (7,"machine	learning"),	(7,	"scikit-learn"),(7,	"Mahout"),			
		         (7,"neural	networks"),	(8,	"neural	networks"),	(8,	"deep	learning"),		
		         (8,"Big	Data"),	(8,	"artificial	intelligence"),	(9,	"Hadoop"),	
		         (9,"Java"),	(9,	"MapReduce"),	(9,	"Big	Data") ]
def data_scientist_with_similar_interest(skill):
	ds_sim = []
	for user_id, interest in interests:
		if interest == skill:
			ds_sim.append(user_id)
	return ds_sim
# print(data_scientist_with_similar_interest('neural	networks'))
def data_scientist_with_most_common_interest(user,data):
	user_with_common_skill = user
	max_common_skill = 0
	for user_id in data: 
		if user_id != user:
			common_skill = 0
			for skill in data[user]:
				if skill in data[user_id]:
					common_skill = common_skill + 1
			if common_skill > max_common_skill:
				max_common_skill = common_skill
				user_with_common_skill = user_id
	return (user_with_common_skill,max_common_skill)



id_interest = {}
interest_id = {}
for user_id,interest in interests:
	try :
		interest_id[interest].append(user_id)
	except :
		interest_id[interest] = [user_id]
	try :
		id_interest[user_id].append(interest)
	except :
		id_interest[user_id] = [interest]


x = data_scientist_with_most_common_interest(4,id_interest)

salaries_and_tenures	=	[(83000,	8.7),	(88000,	8.1),	
							(48000,	0.7),	(76000,	6),								
							(69000,	6.5),	(76000,	7.5),									
							(60000,	2.5),	(83000,	10),							
							(48000,	1.9),	(63000,	4.2)]

def find_bucket(tenure):
	if tenure < 4:
		return "less than 4"
	elif tenure >= 4 and tenure < 8:
		return "between 4 and 8"
	else:
		return "greater than 8"

tenure_and_salaries = 	defaultdict(list)
for salary ,tenure in salaries_and_tenures:
	tenure_and_salaries[find_bucket(tenure)].append(salary)
# print(tenure_and_salaries)

for t,s in tenure_and_salaries.items():
	tenure_and_salaries[t] = sum(tenure_and_salaries[t])/len(tenure_and_salaries[t])
# print(tenure_and_salaries)

import random
x = range(22,100,5)
# print(random.sample(x,10))
# random.shuffle(x)
# print(x)

from functools import partial
# def exp(base,power,multiply):
# 	return base ** power*multiply
# two_to_the = partial(exp,2,3)
# print(two_to_the(4))

def double(x):
	return 2*x
xs = [1,2,3,4]
twice_xs = map(double,xs)
list_doubler = partial(map,double)

document = "s d f e f g s ew q d v cx d g s a fd w t h b f d s w f d s a q c x z s c v c vc d e w q er s a f d g v"

# for i,document in enumerate(document):
# 	print(i,document)

a = [1,2,3]
b = ['a','b']
c = zip(a,b)
d,e = zip(*c)
# print(d,e)

def doubler(f):
	def g(*args,**kwargs):
		print(args,kwargs)
		return 2*f(*args,**kwargs)
	return g
def f1(x,y,z):
	print(x,y,z)
	return x+y+z
g = doubler(f1)
# print(g( y= 3,x = 5,z = 6))



# def magic(*args , **kwargs):
# 	print(args,kwargs)
# magic([1,2],{'x' : 3})
from functools import reduce
def vector_sum(a,b):
	return [v+w for v,w in zip(a,b)]
def vector_sub(a,b):
	return [v-w for v,w in zip(a,b)]
def vector():
	return reduce(vector_sum, [[1,2,3],[4,5,6],[5,6,7]] )
# v = partial(reduce,vector_sum)
# print(v([[1,2,3],[4,5,6],[5,6,7]]))
def multiply(a,b):
	return a*b
def scalar_multiply():
	return map(multiply,[1,2,3],[2,3,4])
print(scalar_multiply())

