import io.appium.java_client.AppiumDriver;
import io.appium.java_client.MobileBy;
import io.appium.java_client.TouchAction;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.touch.offset.PointOption;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import java.net.MalformedURLException;
import java.net.URL;

import static variables.selectors.*;
import static variables.selectors.loginButtonXpath;

public class cancelCreateTweetAndroid {
    AppiumDriver driver;

    @BeforeTest
    public void setup() throws MalformedURLException, InterruptedException {
        DesiredCapabilities caps = new DesiredCapabilities();
        caps.setCapability("platformName", "Android");
        caps.setCapability("automationName", "UiAutomator2");
        caps.setCapability("platformVersion", "9.0");
        caps.setCapability("deviceName", "emulator-5554");
        caps.setCapability("appPackage", "com.twitter.android");
        caps.setCapability("appActivity", ".StartActivity");
        driver = new AndroidDriver(new URL("http://localhost:4723/wd/hub"), caps);
        ////////////////////////////////////////////////////////////////////////////////////
        // Login before test:

        // Wait 5 seconds till the app open.
        Thread.sleep(5000);
        // Here we will click on "login" which is defined by x and y coordinates as it is hybrid link not button.
        TouchAction touchAction = new TouchAction(driver);
        touchAction.tap(PointOption.point(632, 1982)).perform();
        // Find the emil field and enter the valid email.
        WebElement emailField = (new WebDriverWait(driver,60)).until(ExpectedConditions.presenceOfElementLocated(new By.ById(emailFieldId)));
        emailField.sendKeys(Email);
        // Find the "Next" button and click on it.
        WebElement next = (new WebDriverWait(driver,60)).until(ExpectedConditions.presenceOfElementLocated(new By.ByXPath(nextXpath)));
        next.click();
        // Check if the username filed is found or not.
        WebElement textCompare = driver.findElement(new By.ById(compareTextId));
        String printedText = textCompare.getText();
        if(printedText.equalsIgnoreCase(expected)){
            Thread.sleep(2000);
            // Find the password field and enter the valid password.
            WebElement passwordField = (new WebDriverWait(driver, 60)).until(ExpectedConditions.presenceOfElementLocated(new By.ById(passwordFieldId)));
            passwordField.sendKeys(Password);
            // Find the "login" button and click on it the go to the home page.
            WebElement loginButton = (new WebDriverWait(driver, 60)).until(ExpectedConditions.presenceOfElementLocated(new By.ByXPath(loginButtonXpath)));
            // Wait for only 1 second to click on the "login" button.
            Thread.sleep(1000);
            loginButton.click();
        }
        // If username field not found.
        else {
            Thread.sleep(2000);
            // Find the username filed.
            WebElement usernameField = (new WebDriverWait(driver,60)).until(ExpectedConditions.presenceOfElementLocated(new By.ById(usernameFieldId)));
            // Enter the valid username.
            usernameField.sendKeys(Username);
            // Find the "Next" button and click on it the go to the password field.
            WebElement nextGoToPasswordField = (new WebDriverWait(driver,60)).until(ExpectedConditions.presenceOfElementLocated(new By.ByXPath(nextToPasswordXpath)));
            nextGoToPasswordField.click();
            Thread.sleep(2000);
            // Find the password field and enter a wrong one.
            WebElement passwordField = (new WebDriverWait(driver,60)).until(ExpectedConditions.presenceOfElementLocated(new By.ById(passwordFieldId)));
            passwordField.sendKeys(Password);
            // Find the "login" button and click on it.
            WebElement loginButton = (new WebDriverWait(driver,60)).until(ExpectedConditions.presenceOfElementLocated(new By.ByXPath(loginButtonXpath)));
            // Wait for only 1 second to click on the "login" button.
            Thread.sleep(1000);
            loginButton.click();
        }

        // Wait till the home page appear.
        Thread.sleep(2000);
        // Click on (+) icon using x and y coordinates.
        touchAction.tap(PointOption.point(957, 1800)).perform();
        touchAction.tap(PointOption.point(957, 1800)).perform();
        // Find tweet text then enter your tweet body.
        WebElement writeTweet = (new WebDriverWait(driver,60)).until(ExpectedConditions.presenceOfElementLocated(new By.ById(writeTweetId)));
        writeTweet.sendKeys(tweetBodyBestCase);
    }

    @Test
    public void cancelTweet() throws InterruptedException {
        // Find (X) icon then click on it.
        WebElement cancelIcon = (new WebDriverWait(driver,60)).until(ExpectedConditions.presenceOfElementLocated(new MobileBy.ByAccessibilityId(navigateUpId)));
        cancelIcon.click();
        Thread.sleep(3000);
        TouchAction touchAction = new TouchAction(driver);
        touchAction.tap(PointOption.point(675, 1210)).perform();
        // Return to the home page.
        WebElement check = (new WebDriverWait(driver,60)).until(ExpectedConditions.presenceOfElementLocated(new MobileBy.ByAccessibilityId(navigationDrawerAccId)));
        if(check.isDisplayed()){
            System.out.println(testPass); }
        else { System.out.println(testFailed); }
        // Click on (+) icon using x and y coordinates.
        touchAction.tap(PointOption.point(957, 1800)).perform();
        touchAction.tap(PointOption.point(957, 1800)).perform();
    }

    // After the test is done.
    @AfterTest
    public void tearDown() throws InterruptedException {
        // First log out.
        Thread.sleep(4000);
        // Find (X) icon then click on it.
        TouchAction touchAction = new TouchAction(driver);
        touchAction.tap(PointOption.point(130, 136)).perform();
        // Wait for 2 seconds till the home page appear.
        Thread.sleep(2000);
        // Find the navigation drawer then click on it.
        WebElement profileIcon = (new WebDriverWait(driver,60)).until(ExpectedConditions.presenceOfElementLocated(new MobileBy.ByAccessibilityId(navigationDrawerAccId)));
        profileIcon.click();
        // Wait for 2 seconds till the side menu appear.
        Thread.sleep(2000);
        // Finding settings option by x and y coordinates.
        touchAction.tap(PointOption.point(224, 1849)).perform();
        // Find "Your account" then click on it.
        WebElement yourAccount = (new WebDriverWait(driver,60)).until(ExpectedConditions.presenceOfElementLocated(new By.ByXPath(yourAccountXpath)));
        yourAccount.click();
        // Find "account information" then click on it.
        WebElement accountInfo = (new WebDriverWait(driver,60)).until(ExpectedConditions.presenceOfElementLocated(new By.ByXPath(accountInfoXpath)));
        accountInfo.click();
        // Find "log out" then click on it.
        WebElement logoutButton = (new WebDriverWait(driver,60)).until(ExpectedConditions.presenceOfElementLocated(new By.ByXPath(logoutButtonXpath)));
        logoutButton.click();
        // Wait for 2 seconds till log out tab appear.
        Thread.sleep(2000);
        // Finding "log out" by x and y coordinates.
        touchAction.tap(PointOption.point(859, 1216)).perform();
        // Secondly, close the app.
        if (null != driver) {
            driver.quit();
        }
    }
}
