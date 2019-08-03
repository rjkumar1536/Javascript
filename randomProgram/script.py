from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import os
import subprocess

# test_host = 'localhost'
# test_port = '4444'
# subprocess.Popen(["C:\\Program Files\\Java\\jdk1.8.0_201\\bin\\java.exe","-jar","C:\\Users\\I354770\\selenium-server-standalone-2.20.0.jar"])
# server_url = "http://%s:%s/wd/hub" % (test_host, test_port)
# dc = DesiredCapabilities.HTMLUNIT
# wd = webdriver.Remote(server_url, dc)
# wd.get('https://www.google.com')
# print('my_name')

from selenium import webdriver
import os
import os.path
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import subprocess
from datetime import datetime
import calendar


def get_element(x_path):
	return wait.until(EC.presence_of_element_located((By.XPATH, x_path)))

def fill_remaining_fields():
	get_element('//*[@id="event_location"]').send_keys('SAP FootBall Ground')
	get_element('//*[@id="select-category"]/a/div[2]').click()
	get_element('//*[@id="select-category"]/ul/li[6]/a/div[2]').click()
	get_element('//*[@id="select-priority"]/a/div/b').click()
	get_element('//*[@id="select-priority"]/ul/li[2]/a').click()
	get_element('//*[@id="event-form"]/div/div[1]/div/fieldset[8]/div/ul/li/input').send_keys('#TPM,#TMA')
	get_element('//*[@id="select-recurrences"]/a/div/b').click()
	get_element('//*[@id="select-recurrences"]/ul/li[3]/a').click()


driver = webdriver.Chrome()
driver.maximize_window()
driver.get("https://jam4.sapjam.com/groups/1AeqDmmBJaJRu5k5VLml1S/events/new")
wait = WebDriverWait(driver, 600)

get_element('//*[@id="event_title"]').send_keys('Foot-Ball')
current_time = datetime.now()
date_from_id = ''
date_to_id = ''
time_from_id = ''
time_to_id = ''
elements= driver.find_elements_by_tag_name('input')
counter = 0
for element in elements:
	idx = element.get_attribute('id')
	if counter == 3:
		date_from_id = idx
	elif counter == 4:
		date_to_id = idx
	elif counter == 6:
		time_from_id = idx
	elif counter == 7:
		time_to_id = idx
	counter = counter + 1
driver.find_element_by_id(date_from_id).click()
number_of_days = calendar.monthrange(current_time.year,current_time.month)[1]
current_date = current_time.day
prepare_xpath = ''
if number_of_days - current_time.day < 3:
	get_element('//*[@id="yui-gen0"]/thead/tr[1]/th/div/a[3]').click()
	selected_date = get_element('//*[@id="yui-gen0_cell12"]/a').text
	overflow_days = number_of_days - current_date
	prepare_xpath = '//*[@id="yui-gen0_cell'+ str(12 - (selected_date - overflow_days ) + 1) + '"'+ ']/a'
	# last_active_day_id = 
else:
	selected_date = get_element('//*[@id="yui-gen0_cell12"]/a').text
	selected_date = int(selected_date)
	if selected_date > current_date:
		prepare_xpath = '//*[@id="yui-gen0_cell'+ str(12 - (selected_date - current_date - 2)) + '"'+ ']/a'
	else:
		prepare_xpath = '//*[@id="yui-gen0_cell'+ str(12 + (current_date - selected_date  + 2 )) + '"'+ ']/a'
	get_element(prepare_xpath).click()
time_to = driver.find_element_by_id(time_from_id)
time_to.send_keys(Keys.CONTROL + 'a')
time_to.send_keys(Keys.BACKSPACE)
time_to.send_keys('5:00 pm')
time_from = driver.find_element_by_id(time_to_id)
time_from.send_keys(Keys.CONTROL + 'a')
time_from.send_keys(Keys.BACKSPACE)
time_from.send_keys('6:00 pm')

iframe = driver.find_elements_by_tag_name('iframe')[1]
driver.switch_to_frame(iframe)
get_element('//*[@id="tinymce"]').send_keys('Foot-Ball match')
driver.switch_to_default_content()
fill_remaining_fields()






