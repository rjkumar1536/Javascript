import unittest
import time
from selenium import webdriver
from selenium.webdriver.support.select import Select
class DatePickerDateRangeTest(unittest.TestCase):

    def setUp(self):
        #define a driver instance, for example Chrome
        self.driver = webdriver.Chrome()
        self.driver.maximize_window()
    def test_date_picker_date_range_(self):
        driver = self.driver
        #navigate to the test website
        driver.get('https://jqueryui.com/datepicker/#date-range')
        time.sleep(3)
        #define frame
        frame=driver.find_element_by_tag_name('iframe')
        #switch to frame
        driver.switch_to_frame(frame)
        #Choose From Month Day Date
        datepicker_from=driver.find_element_by_xpath("//input[@id='from']")
        datepicker_from.click()
        time.sleep(2)
        month_from=driver.find_element_by_xpath("//div/select[@class='ui-datepicker-month']")
        select_from_month=Select(month_from)
        select_from_month.select_by_visible_text("Apr")
        time.sleep(2)
        day_from=driver.find_element_by_xpath("//table/tbody/tr/td/a[text()='1']")
        day_from.click()
        time.sleep(5)
        #Choose To Month Day Date
        datepicker_to=driver.find_element_by_xpath("//input[@id='to']")
        datepicker_to.click()
        time.sleep(2)
        month_to=driver.find_element_by_xpath("//div/select[@class='ui-datepicker-month']")
        select_to_month=Select(month_to)
        select_to_month.select_by_visible_text("Jun")
        time.sleep(2)
        day_to=driver.find_element_by_xpath("//table/tbody/tr/td/a[text()='1']")
        day_to.click()
        time.sleep(5)
        #Get the string in To input
        to_month_string=datepicker_to.get_attribute('value')
        print (to_month_string)
        self.assertEqual(to_month_string,'06/01/2016')

    def tearDown(self):
        self.driver.close()
        self.driver.quit()
        
if __name__ == "__main__":
    unittest.main()