package Signup;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.android.AndroidDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import java.net.MalformedURLException;
import java.net.URL;

import static variabales.selectors.*;

public class allFieldsEmpty {
    AppiumDriver driver;

    @BeforeTest
    public void setup() throws MalformedURLException {
        DesiredCapabilities caps = new DesiredCapabilities();
        caps.setCapability("platformName", "Android");
        caps.setCapability("automation", "UiAutomator2");
        caps.setCapability("platformVersion", "9.0");
        caps.setCapability("deviceName", "emulator-5554");
        caps.setCapability("appPackage", "com.example.project_sw");
        caps.setCapability("appActivity", ".MainActivity");
        driver = new AndroidDriver(new URL("http://localhost:4723/wd/hub"), caps);
    }

    @Test
    public void signup() throws InterruptedException {
        Thread.sleep(5000);
        WebElement signup = driver.findElement(new By.ByXPath(signupButton));
        signup.click();
        Thread.sleep(3000);
        WebElement createAccount = driver.findElement(new By.ByXPath(createAccountButton));
        createAccount.click();
        Thread.sleep(3000);
        if((driver.findElement(By.xpath(usernameErrorMessage)).isDisplayed()) && (driver.findElement(By.xpath(emailErrorMessage)).isDisplayed()) && (driver.findElement(By.xpath(passwordErrorMessage)).isDisplayed())){
            System.out.println(pass);
        }
        else {
            System.out.println(fail);
        }
    }

    @AfterTest
    public void tearDown() {
        if (null != driver) {
            driver.quit();
        }
    }
}
