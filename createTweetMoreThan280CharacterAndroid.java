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

public class createTweetMoreThan280CharacterAndroid {
    AppiumDriver driver;
    // Tweet body and teh expected toast message when the tweet appear successfully.
    // More than 280 character.
    private String tweetBody = "“I believe that everything happens for a reason. People change so that you can learn to let go, things go wrong so that you appreciate them when they're right, you believe lies so you eventually learn to trust no one but yourself, and sometimes good things fall apart so better things can fall together.”\n" +
            "― Marilyn Monroe";
    private String expectedCount = "-41";
    // Login data email, username, password and the expected text.
    private String Email = "farahgamal153@gmail.com";
    private String Password = "Farahgamal153";
    private String Username = "ga39971142";

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
        Thread.sleep(10000);
        // Here we will click on "login" which is defined by x and y coordinates as it is hybrid link not button.
        TouchAction touchAction = new TouchAction(driver);
        touchAction.tap(PointOption.point(632, 1982)).perform();
        // Find the emil field and enter the valid email.
        WebElement emailField = (new WebDriverWait(driver, 60)).until(ExpectedConditions.presenceOfElementLocated(new By.ById("text_field")));
        emailField.sendKeys(Email);
        // Find the "Next" button and click on it.
        WebElement next = (new WebDriverWait(driver, 60)).until(ExpectedConditions.presenceOfElementLocated(new By.ByXPath("\t\n" +
                "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.View/android.view.View/android.widget.Button")));
        next.click();
        // Find the username filed.
        WebElement usernameField = (new WebDriverWait(driver, 60)).until(ExpectedConditions.presenceOfElementLocated(new By.ById("text_field")));
        // Check if the username filed is found or not.
        if (usernameField.isDisplayed()) {
            // Enter the valid username.
            usernameField.sendKeys(Username);
            // Find the "Next" button and click on it the go to the password field.
            WebElement nextGoToPasswordField = (new WebDriverWait(driver, 60)).until(ExpectedConditions.presenceOfElementLocated(new By.ByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.View/android.view.View/android.widget.Button")));
            nextGoToPasswordField.click();
            // Find the password field and enter a wrong one.
            WebElement passwordField = (new WebDriverWait(driver, 60)).until(ExpectedConditions.presenceOfElementLocated(new By.ById("password_field")));
            passwordField.sendKeys(Password);
            // Find the "login" button and click on it.
            WebElement loginButton = (new WebDriverWait(driver, 60)).until(ExpectedConditions.presenceOfElementLocated(new By.ByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.View/android.view.View/android.widget.Button")));
            // Wait for only 1 second to click on the "login" button.
            Thread.sleep(1000);
            loginButton.click();
        }
        // If username field not found.
        else {
            // Find the password field and enter the valid password.
            WebElement passwordField = (new WebDriverWait(driver, 60)).until(ExpectedConditions.presenceOfElementLocated(new By.ById("password_field")));
            passwordField.sendKeys(Password);
            // Find the "login" button and click on it the go to the home page.
            WebElement loginButton = (new WebDriverWait(driver, 60)).until(ExpectedConditions.presenceOfElementLocated(new By.ByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.View/android.view.View/android.widget.Button")));
            // Wait for only 1 second to click on the "login" button.
            Thread.sleep(1000);
            loginButton.click();
        }
    }



    // Test case for more than 280 character.
    @Test
    public void CreateTweetMoreThan280() throws InterruptedException{

        // Wait till the home page appear.
        Thread.sleep(2000);
        // Click on (+) icon using x and y coordinates.
        TouchAction touchAction = new TouchAction(driver);
        touchAction.tap(PointOption.point(957, 1800)).perform();
        touchAction.tap(PointOption.point(957, 1800)).perform();
        // Find tweet text then enter your tweet body.
        WebElement writeTweet = (new WebDriverWait(driver,60)).until(ExpectedConditions.presenceOfElementLocated(new By.ById("tweet_text")));
        writeTweet.sendKeys(tweetBody);
        // Find tweet button then click on it.
        WebElement tweetButton = (new WebDriverWait(driver,60)).until(ExpectedConditions.presenceOfElementLocated(new By.ById("button_tweet")));
        // Check if the tweet button is enabled or not.
        if(tweetButton.isEnabled()) {
            System.out.println("Test failed"); }
        else { System.out.println("Test passed"); }
        // Check if the tweet character warning count matches the expected one.
        // Find the tweet character warning count.
        WebElement tweetCharacterCount = (new WebDriverWait(driver,60)).until(ExpectedConditions.presenceOfElementLocated(new By.ById("tweet_character_warning_count")));
        // Get the count appear.
        String actualCount = tweetCharacterCount.getText();
        // Compare it with the expected number.
        if(actualCount.equalsIgnoreCase(expectedCount)) {
            System.out.println("Test passed"); }
        else { System.out.println("Test failed"); }
    }

    // After the test is done.
    @AfterTest
    public void tearDown() throws InterruptedException {
        // First log out.
        // Find (X) icon then click on it.
        WebElement cancelIcon = (new WebDriverWait(driver,60)).until(ExpectedConditions.presenceOfElementLocated(new MobileBy.ByAccessibilityId("Navigate up")));
        cancelIcon.click();
        Thread.sleep(3000);
        // Delete
        TouchAction touchAction = new TouchAction(driver);
        touchAction.tap(PointOption.point(675, 1210)).perform();
        Thread.sleep(4000);
        // Wait for 2 seconds till the home page appear.
        Thread.sleep(2000);
        // Find the navigation drawer then click on it.
        WebElement profileIcon = (new WebDriverWait(driver,60)).until(ExpectedConditions.presenceOfElementLocated(new MobileBy.ByAccessibilityId("Show navigation drawer")));
        profileIcon.click();
        // Wait for 2 seconds till the side menu appear.
        Thread.sleep(2000);
        // Finding settings option by x and y coordinates.
        touchAction.tap(PointOption.point(224, 1849)).perform();
        // Find "Your account" then click on it.
        WebElement yourAccount = (new WebDriverWait(driver,60)).until(ExpectedConditions.presenceOfElementLocated(new By.ByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.LinearLayout/android.view.ViewGroup[2]/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[1]")));
        yourAccount.click();
        // Find "account information" then click on it.
        WebElement accountInfo = (new WebDriverWait(driver,60)).until(ExpectedConditions.presenceOfElementLocated(new By.ByXPath("\t\n" +
                "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.LinearLayout/android.view.ViewGroup[2]/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[2]")));
        accountInfo.click();
        // Find "log out" then click on it.
        WebElement logoutButton = (new WebDriverWait(driver,60)).until(ExpectedConditions.presenceOfElementLocated(new By.ByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.LinearLayout/android.view.ViewGroup[2]/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[7]/android.widget.RelativeLayout/android.widget.TextView")));
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
