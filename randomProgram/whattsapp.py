
from selenium import webdriver
import os
import os.path
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import subprocess

def get_element(x_path):
	return wait.until(EC.presence_of_element_located((By.XPATH, x_path)))
def send_mail(driver):
	driver.execute_script("window.open('about:blank', 'tab2');")
	driver.switch_to.window("tab2")
	driver.get("https://www.gmail.com/")
	wait = WebDriverWait(driver, 600)

	email = "2014ucp1536@gmail.com"
	password = "2014ucp1536"

	get_element('//*[@id="identifierId"]').send_keys(email + Keys.ENTER)
	get_element('//*[@id="password"]/div[1]/div/div[1]/input').send_keys(password + Keys.ENTER)
	get_element('//*[@id=":hd"]/div/div').click()
	get_element('//*[@id=":ms"]').send_keys(email)
	get_element('//*[@id=":ma"]').send_keys("Whatsapp QR Code")
	get_element('//*[@id=":o0"]').click()
	subprocess.call("automate")
	get_element('//*[@id=":m0"]').click()
	get_element('//*[@id="gb"]/div[1]/div[1]/div/div[5]/div[1]/a/span').click()
	driver.execute_script("window.alert = function() {};")
	get_element('//*[@id="gb_71"]').click()
	alert = driver.switch_to.alert
	alert.accept()



driver = webdriver.Chrome()
driver.get("https://web.whatsapp.com/")
wait = WebDriverWait(driver, 600)

target = ['Bhatti']
messages = []

# QR_Code = get_element('//*[@id="app"]/div/div/div[2]/div/div[2]/div/img')
# driver.save_screenshot('whatsapp.png')
# main_window = driver.current_window_handle
# send_mail(driver)
# driver.find_element_by_tag_name('body').send_keys(Keys.CONTROL + Keys.TAB)
# driver.switch_to_window(main_window)


for user in target:
	for i in range(0,100000):
		string = "Dear Bhatti I'm Your Spiritual Guru Rampal Ji !!! I want to Bless You !!! Please come to me"
		print('here')
		get_element('//*[@id="side"]/div[1]/div/label/input').send_keys(user + Keys.ENTER)
		# get_element('//*[@id=\"side\"]/div[2]/div/label/input').send_keys(user + Keys.ENTER)
		print('here')
		get_element('//*[@id="main"]/footer/div[1]/div[2]/div/div[2]').send_keys(string + Keys.ENTER)
		# get_element('//*[@id="main"]/footer/div[1]/div[2]/div[1]/div[2]').send_keys(string + Keys.ENTER)
		time.sleep(1)
		# get_element('//*[@id="main"]/header/div[3]/div/div[2]/div/span').click()
		# time.sleep(1)
		# get_element('//*[@id="main"]/header/div[3]/div/div[2]/span/div/div/ul/li[3]/button').click()
		# subprocess.call("automate.exe",cwd = r'C:\\Users\\I354770\\Desktop')
		# time.sleep(1)
		# get_element('//*[@id="app"]/div/div/div[1]/div[2]/span/div/span/div/div/div[2]/span[2]/div/div/span').click()
		# time.sleep(1)


