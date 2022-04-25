package Signup;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.TouchAction;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.touch.offset.PointOption;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import java.net.MalformedURLException;
import java.net.URL;

import static variabales.selectors.*;

public class SignupPasswordBetween1316 {
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
        Thread.sleep(3000);
        WebElement signup = driver.findElement(new By.ByXPath(signupButton));
        signup.click();
        Thread.sleep(3000);
        WebElement username = driver.findElement(new By.ByXPath(usernameSignupField));
        username.click();
        Thread.sleep(2000);
        username.sendKeys(userSignup);
        Thread.sleep(2000);
        WebElement email = driver.findElement(new By.ByXPath(emailSignupField));
        email.click();
        Thread.sleep(2000);
        email.sendKeys(emailSignup);
        Thread.sleep(2000);
        WebElement password = driver.findElement(new By.ByXPath(passwordSignupField));
        password.click();
        Thread.sleep(2000);
        password.sendKeys(passwordBetween1316);
        WebElement confirmPassword = driver.findElement(new By.ByXPath(confirmPasswordSignupField));
        confirmPassword.click();
        Thread.sleep(2000);
        confirmPassword.sendKeys(passwordBetween1316);
        TouchAction touchAction=new TouchAction(driver);
        touchAction.tap(PointOption.point(976, 2001)).perform();
        Thread.sleep(2000);
        WebElement createAccount = driver.findElement(new By.ByXPath(createAccountButton));
        createAccount.click();
        Thread.sleep(3000);
        if(driver.findElement(By.xpath(emailMessageValidation)).isDisplayed()){
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
