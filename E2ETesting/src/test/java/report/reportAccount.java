package report;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.TouchAction;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.touch.offset.PointOption;
import org.checkerframework.checker.fenum.qual.SwingTitleJustification;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;
import variabales.selectors;

import java.net.MalformedURLException;
import java.net.URL;

import static variabales.selectors.*;
import static variabales.selectors.notificationChangeButton;

public class reportAccount {
    AppiumDriver driver;

    @BeforeTest
    public void setup() throws MalformedURLException, InterruptedException {
        DesiredCapabilities caps = new DesiredCapabilities();
        caps.setCapability("platformName", "Android");
        caps.setCapability("automation", "UiAutomator2");
        caps.setCapability("platformVersion", "9.0");
        caps.setCapability("deviceName", "emulator-5554");
        caps.setCapability("appPackage", "com.example.cross_platform_software_project");
        caps.setCapability("appActivity", ".MainActivity");
        driver = new AndroidDriver(new URL("http://localhost:4723/wd/hub"), caps);
        ///////////////////////////////////////////////////////////////////////////////////////////
        Thread.sleep(8000);
        WebElement loinButton = driver.findElement(new By.ByXPath(LoginButton));
        loinButton.click();
        Thread.sleep(5000);
        WebElement usernameField = driver.findElement(new By.ByXPath(usernameLoginField));
        usernameField.click();
        Thread.sleep(2000);
        usernameField.sendKeys(userSignup);
        WebElement passField = driver.findElement(new By.ByXPath(passwordLoginField));
        passField.click();
        Thread.sleep(2000);
        passField.sendKeys(passwordSignup);
        WebElement loin = driver.findElement(new By.ByXPath(LoginButton));
        loin.click();
        Thread.sleep(8000);
    }

    @Test
    public void report() throws InterruptedException {
        WebElement navBar = driver.findElement(new By.ByXPath(openNavigationBar));
        navBar.click();
        Thread.sleep(2000);
        WebElement profile = driver.findElement(new By.ByXPath(profileOption));
        profile.click();
        Thread.sleep(2000);
        TouchAction touchAction=new TouchAction(driver);
        touchAction.tap(PointOption.point(723, 973)).perform();
        Thread.sleep(2000);
        touchAction.tap(PointOption.point(321, 1492)).perform();
        Thread.sleep(2000);
        touchAction.tap(PointOption.point(856, 834)).perform();
        Thread.sleep(2000);
        WebElement message = driver.findElement(new By.ByXPath(reportField));
        message.click();
        Thread.sleep(2000);
        message.sendKeys(reportMessageText);
        Thread.sleep(2000);
        WebElement button = driver.findElement(new By.ByXPath(reportButton));
        button.click();
        Thread.sleep(2000);
    }

    @AfterTest
    public void tearDown() {
        if (null != driver) {
            driver.quit();
        }
    }
}
