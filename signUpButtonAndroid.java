import io.appium.java_client.AppiumDriver;
import io.appium.java_client.android.AndroidDriver;
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

public class signUpButtonAndroid {

    AppiumDriver driver;
    // The expected toast message.
    private String expected = "Create your account";

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

    // Test that sign-up button redirect me to the sign-up page.
    @Test
    public void signupButton(){

        // Find sign up button then click on it.
        WebElement signupButton = (new WebDriverWait(driver,60)).until(ExpectedConditions.presenceOfElementLocated(new By.ByXPath("\t\n" +
                "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ScrollView/android.view.ViewGroup/android.widget.LinearLayout[2]/android.view.ViewGroup[2]/android.widget.Button")));
        signupButton.click();
        // Check if it redirects you the sign-up page or not.
        WebElement check = (new WebDriverWait(driver,60)).until(ExpectedConditions.presenceOfElementLocated(new By.ByXPath( "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ScrollView/android.widget.RelativeLayout/android.widget.TextView")));
        if(check.getText().equalsIgnoreCase(expected)) {
            System.out.println("Test passed"); }
        else { System.out.println("Test failed"); }
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
