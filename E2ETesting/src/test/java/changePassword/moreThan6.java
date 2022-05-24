package changePassword;

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
import static variabales.selectors.changePasswordButton;

public class moreThan6 {
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
        passField.sendKeys("123456");
        WebElement loin = driver.findElement(new By.ByXPath(LoginButton));
        loin.click();
        Thread.sleep(8000);
    }

    @Test
    public void changePassword() throws InterruptedException {
        WebElement navBar = driver.findElement(new By.ByXPath(openNavigationBar));
        navBar.click();
        Thread.sleep(2000);
        WebElement settings = driver.findElement(new By.ByXPath(settingsOption));
        settings.click();
        Thread.sleep(2000);
        WebElement changePass = driver.findElement(new By.ByXPath(selectChangePassword));
        changePass.click();
        WebElement change = driver.findElement(new By.ByXPath(currentPassword));
        change.click();
        Thread.sleep(2000);
        change.sendKeys("123456");
        Thread.sleep(3000);
        WebElement Password = driver.findElement(new By.ByXPath(newPassword));
        Password.click();
        Thread.sleep(2000);
        Password.sendKeys(changePasswordMoreThan6);
        Thread.sleep(3000);
        WebElement confirm = driver.findElement(new By.ByXPath(confirmNewPassword));
        confirm.click();
        Thread.sleep(2000);
        confirm.sendKeys(changePasswordMoreThan6);
        WebElement changeButton = driver.findElement(new By.ByXPath(changePasswordButton));
        changeButton.click();
    }

    @AfterTest
    public void tearDown() {
        if (null != driver) {
            driver.quit();
        }
    }
}
