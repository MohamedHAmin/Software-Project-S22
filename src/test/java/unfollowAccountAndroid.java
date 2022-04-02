import io.appium.java_client.AppiumDriver;
import io.appium.java_client.MobileBy;
import io.appium.java_client.MobileElement;
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

public class unfollowAccountAndroid {
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
        Thread.sleep(3000);
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
    }

    @Test
    public void unfollowAccount() throws InterruptedException {

        // Wait till the home page open.
        Thread.sleep(10000);
        // Find the search icon the click on it.
        TouchAction touchAction = new TouchAction(driver);
        touchAction.tap(PointOption.point(399, 2003)).perform();
        Thread.sleep(2000);
        // Find the search field then enter the handle of the user.
        WebElement searchField = (new WebDriverWait(driver, 60)).until(ExpectedConditions.presenceOfElementLocated(new By.ById(searchFieldId)));
        searchField.click();
        WebElement enterAccount = (new WebDriverWait(driver, 60)).until(ExpectedConditions.presenceOfElementLocated(new By.ById(searchLineEditId)));
        enterAccount.sendKeys(accountToFollow);
        Thread.sleep(5000);
        // Click on the account.
        touchAction.tap(PointOption.point(203, 428)).perform();
        Thread.sleep(6000);
        // Click on unfollow button.
        touchAction.tap(PointOption.point(910, 498)).perform();
        Thread.sleep(6000);
        // Confirm unfollow.
        touchAction.tap(PointOption.point(850, 1223)).perform();
        Thread.sleep(2000);
        // Find back icon then click on it.
//        touchAction.tap(PointOption.point(135, 145)).perform();
//        Thread.sleep(5000);
//        // Click on following.
//        touchAction.tap(PointOption.point(120, 876)).perform();
        // Check
        Thread.sleep(3000);
        touchAction.tap(PointOption.point(405, 931)).perform();
        Thread.sleep(5000);
        MobileElement elementToClick;
        elementToClick = (MobileElement) driver.findElement(new MobileBy.ByAndroidUIAutomator("new UiScrollable(new UiSelector()"
                + ".resourceId(\"com.android.settings:id/name_item\")).scrollIntoView ("
                + "new UiSelector().text(\"engy\"));"));
        if(elementToClick.isDisplayed()){
            System.out.println(testPass);
        }
        else {
            System.out.println(testFailed);
        }
    }

    @AfterTest
    public void tearDown() throws InterruptedException {
        // First log out
        // Finding back icon button by x and y coordinates.
        TouchAction touchAction = new TouchAction(driver);
        // Wait for 2 seconds till the home page appear.
        Thread.sleep(2000);
        touchAction.tap(PointOption.point(88, 143)).perform();
        Thread.sleep(2000);
        touchAction.tap(PointOption.point(88, 143)).perform();
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
