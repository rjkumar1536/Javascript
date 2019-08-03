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

driver = webdriver.Chrome()
driver.get("https://www.youtube.com/watch?v=qiYZgd8FHpw")
wait = WebDriverWait(driver, 600)
string = 'Kromp10'

iframe = driver.find_elements_by_tag_name('iframe')[0]
driver.switch_to_frame(iframe)
for i in range(0,10):
	get_element('//*[@id="input"]').send_keys(string + Keys.ENTER)

	inline > id > class > internal > external