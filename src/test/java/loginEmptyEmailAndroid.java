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

public class loginEmptyEmailAndroid {
    AppiumDriver driver;

    // Before testing
    @BeforeTest
    public void setup() throws MalformedURLException {
        // Set the desired capabilities.
        // set the platform name, platform version, device name, automation name,
        // appPackage and appActivity.
        DesiredCapabilities caps = new DesiredCapabilities();
        caps.setCapability("platformName", "Android");
        caps.setCapability("automationName", "UiAutomator2");
        caps.setCapability("platformVersion", "9.0");
        caps.setCapability("deviceName", "emulator-5554");
        caps.setCapability("appPackage", "com.twitter.android");
        caps.setCapability("appActivity", ".StartActivity");
        // To be connected to the appium server to run the test case or open the inspector.
        driver = new AndroidDriver(new URL("http://localhost:4723/wd/hub"), caps);
    }


    // Test case for the empty email field.
    @Test
    public void emptyEmailFieldLogin() throws InterruptedException {
        // Wait 5 seconds till the app open.
        Thread.sleep(5000);
        // Here we will click on "login" which is defined by x and y coordinates as it is hybrid link not button.
        TouchAction touchAction = new TouchAction(driver);
        touchAction.tap(PointOption.point(632, 1982)).perform();
        // Find the emil field and enter the valid email.
        WebElement emailField = (new WebDriverWait(driver,60)).until(ExpectedConditions.presenceOfElementLocated(new By.ById(emailFieldId)));
        emailField.sendKeys(Email);
        // Find the "Next" button and click on it the go to the password field.
        WebElement nextGoToPasswordField = (new WebDriverWait(driver,60)).until(ExpectedConditions.presenceOfElementLocated(new By.ByXPath(nextXpath)));
        nextGoToPasswordField.click();

        // Wait 2 second till the toast message appear.
        Thread.sleep(4000);
        // Find the toast message and get the text in it.
        String actualToastMessage = driver.findElement(MobileBy.xpath(toastMessageXpath)).getText();
        System.out.println(actualToastMessage);
        // Compare if the printed toast message is same as the expected on.
        if(actualToastMessage.equalsIgnoreCase(expectedToastMessageEmptyEmail)) {
            System.out.println(testPass); }
        else { System.out.println(testFailed); }
    }

    // After the test in done.
    // Close the app.
    @AfterTest
    public void tearDown() {

        if (null != driver) {
            driver.quit();
        }
    }
}
