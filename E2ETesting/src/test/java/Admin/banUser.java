package Admin;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.MobileBy;
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

public class banUser {
    AppiumDriver driver;

    @BeforeTest
    public void setup() throws MalformedURLException, InterruptedException {
        DesiredCapabilities caps = new DesiredCapabilities();
        caps.setCapability("platformName", "Android");
        caps.setCapability("automation", "UiAutomator2");
        caps.setCapability("platformVersion", "9.0");
        caps.setCapability("deviceName", "emulator-5554");
        caps.setCapability("appPackage", "com.example.project_sw");
        caps.setCapability("appActivity", ".MainActivity");
        driver = new AndroidDriver(new URL("http://localhost:4723/wd/hub"), caps);
        /////////////////////////////////////////////////////////////////////////////////////////
        Thread.sleep(4000);
        WebElement loinButton = driver.findElement(new By.ByXPath(LoginButton));
        loinButton.click();
        Thread.sleep(2000);
        WebElement usernameField = driver.findElement(new By.ByXPath(usernameLoginField));
        usernameField.click();
        Thread.sleep(2000);
        usernameField.sendKeys(adminUser);
        WebElement passField = driver.findElement(new By.ByXPath(passwordLoginField));
        passField.click();
        Thread.sleep(2000);
        passField.sendKeys(adminPassword);
        WebElement loin = driver.findElement(new By.ByXPath(LoginButton));
        loin.click();
        Thread.sleep(6000);
    }

    @Test
    public void Ban() throws InterruptedException {

        TouchAction touchAction=new TouchAction(driver);
        touchAction.tap(PointOption.point(272, 311)).perform();
        Thread.sleep(4000);
        touchAction.tap(PointOption.point(931, 840)).perform();
        Thread.sleep(2000);
        WebElement setDuration = driver.findElement(new By.ByXPath(banDuration));
        setDuration.click();
        Thread.sleep(2000);
        WebElement confirm = driver.findElement(new By.ByXPath(confirmBan));
        confirm.click();
        WebElement home = driver.findElement(new By.ByXPath(homeBan));
        home.click();
        Thread.sleep(4000);
        if (driver.findElement(By.xpath(lary)).isDisplayed()){
            System.out.println(pass);
        }
        else{
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