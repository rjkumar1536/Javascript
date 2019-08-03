from selenium import webdriver
import os
import os.path
import pickle
import sys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
import time
import subprocess
def get_element(x_path):
	return wait.until(EC.presence_of_element_located((By.XPATH, x_path)))
driver = sys.argv[1]
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

