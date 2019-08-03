
from selenium import webdriver
import os
from subprocess import check_output
import os.path
import pickle
import re
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import requests
from bs4 import BeautifulSoup
import time
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.touch_actions import TouchActions
import subprocess

course_offered = ['//java','//Web_Technologies','//Advance_Javascript','//DevOps']
web_link = ['//*[@id="sub-container"]/a[7]/div','//*[@id="sub-container"]/a[5]/div','//*[@id="sub-container"]/a[4]/div/div','//*[@id="sub-container"]/a[1]/div/div/div[1]/div']

driver = webdriver.Chrome()
driver.get("https://wipropjp.manipalglobal.com/?q=MULNLogin/studentlogin")
wait = WebDriverWait(driver, 600)

y_arg = '//*[@id="edit-loginId-1"]'
user = wait.until(EC.presence_of_element_located((By.XPATH, y_arg)))
user.send_keys("SAPJ0218JA020097")

y_arg = '//*[@id="edit-password-1"]'
pwd = wait.until(EC.presence_of_element_located((By.XPATH, y_arg)))
pwd.send_keys("Cesarrjkumar1536" + Keys.ENTER)

y_arg = '//*[@id="secondary-menu"]/ul/li[3]/a'
course = wait.until(EC.presence_of_element_located((By.XPATH, y_arg)))
course.click()
listindex = 0
os.chdir(r'C:\\Users\\I354770\\Documents\\Videos')
current_path = r'C:\\Users\\I354770\\Documents\\Videos'
for y_arg in web_link:
	tech = wait.until(EC.presence_of_element_located((By.XPATH, y_arg)))
	tech.click()
	time.sleep(1)
	html_source = driver.page_source
	html_source = re.sub(r'\\', r'', html_source)
	links = re.findall('https://www.youtube.com/embed/[0-9a-zA-Z_-]*[?]',html_source)
	new_path = current_path + course_offered[listindex]
	if not os.path.exists(new_path):
		os.makedirs(new_path)
	os.chdir(new_path)
	listindex = listindex + 1
	for link in links:
		pos = link.index('?')
		file = link[0:pos]
		# check_output(["youtube-dl", file])
		subprocess.call(["youtube-dl",file])
	driver.execute_script("window.history.go(-1)")
