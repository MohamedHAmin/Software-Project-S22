package variabales;

public class selectors {
    // Data

    // Login
    public static String username = "Antwan9";
    public static String password = "123456";

    public static String pass = "Test Passed";
    public static String fail = "Test Failed";
    // Sign up
    public static String userSignup = "Farah";
    public static String emailSignup = "farahgamal7799@gmail.com";
    public static String passwordSignup = "Farah123456789";
    public static String userSignup16 = "abcdefghijklmnop";
    public static String userSignupMoreThan16 = "abcdefghijklmnopqustuvwxyz";
    public static String userSignupLessThan16 = "abcd";
    public static String existsUsername = "Jimmie0";
    public static String space = "              ";
    // Email
    public static String wrongEmail = "abc";
    public static String wrongEmailAddSymbol = "abc@";
    public static String wrongEmailCom = "abc.com";
    public static String wrongEmailAddAndCom = "@.com";
    public static String wrongEmailNoCharacters = "@xxx.com";

    // PASSWORD
    public static String passwordLessThan6 = "aaa";   // 3
    public static String passwordEqualsTo6 = "aaaaaa";   // 6
    public static String passwordBetween610 = "aaaaaaaa";   //8
    public static String passwordEqualsTo10 = "aaaaaaaaaa";   //10
    public static String passwordBetween1013 = "aaaaaaaaaaaa";   //12
    public static String passwordEqualsTo13 = "aaaaaaaaaaaaa";    //13
    public static String passwordBetween1316 = "aaaaaaaaaaaaaa";   //14
    public static String passwordEqualsTo16 = "aaaaaaaaaaaaaaaa";   //16
    public static String passwordMoreThan16 = "aaaaaaaaaaaaaaaaaaaaa";  //21

    // CREATE TWEET
    public static String tweetBody = "Helloooo";


    // XPath

    // Login
    public static String usernameLoginField = "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[1]";
    public static String passwordLoginField = "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[2]\n";
    public static String LoginButton = "\t\n" +
            "//android.widget.Button[@content-desc=\"Login\"]";
    // Sign up
    public static String signupButton = "\t\n" +
            "//android.widget.Button[@content-desc=\"Sign up\"]";
    public static String usernameSignupField = "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.widget.EditText[1]";
    public static String emailSignupField = "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.widget.EditText[2]";
    public static String passwordSignupField = "\t\n" +
            "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.widget.EditText[3]";
    public static String confirmPasswordSignupField = "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.widget.EditText[4]";
    public static String createAccountButton = "//android.widget.Button[@content-desc=\"Create Account\"]";
    public static String calendarButton = "\t\n" +
            "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.widget.Button[1]";
    public static String usernameErrorMessage = "\t\n" +
            "//android.view.View[@content-desc=\"Username cannot be empty\"]";
    public static String emailErrorMessage = "//android.view.View[@content-desc=\"Email cannot be empty!\"]";
    public static String passwordErrorMessage = "//android.view.View[@content-desc=\"Password cannot be empty!\"]";
    public static String emailMessageValidation = "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View[1]/android.view.View/android.view.View";
    public static String okButton = "//android.widget.Button[@content-desc=\"OK\"]";
    public static String passwordErrorMessageLessThan6 = "//android.view.View[@content-desc=\"Password must be at least 6 characters long!\"]";
    public static String passwordErrorMessageWeak = "//android.view.View[@content-desc=\"Password is weak! Write a stronger one.\"]";
    public static String confirmPasswordErrorMessage = "//android.view.View[@content-desc=\"Passwords do not match!\"]";
    public static String passwordErrorMessageAverage = "//android.view.View[@content-desc=\"Password is Average. Make it stronger!\"]";

    // ICONS
    // + Button to create tweet
    public static String createTweetButton = "\t\n" +
            "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button";
    public static String homeIconCreateTweet = "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[5]/android.widget.Button[1]";
    public static String searchIcon = "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.Button[2]";
    public static String notificationIcon = "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.Button[3]";
    public static String navigationMenu = "\t\n" +
            "//android.widget.Button[@content-desc=\"Open navigation menu\"]";
    public static String profile = "//android.view.View[@content-desc=\"Profile\"]\n";
    public static String settings = "\t\n" +
            "//android.view.View[@content-desc=\"Settings\"]";
    public static String adminPage = "//android.view.View[@content-desc=\"Admin Page\"]";

    // SETTINGS PAGE
    public static String logout = "//android.widget.Button[@content-desc=\"Logout from this Device\"]";
    public static String logoutAll = "\t\n" +
            "//android.widget.Button[@content-desc=\"Logout from all Devices\"]";
    public static int darkThemeX = 918;
    public static int darkThemeY = 1226;
    public static int privateAccountX = 915;
    public static int privateAccountY = 691;
    public static int hidePersonalDataX = 911;
    public static int hidePersonalDataY = 840;
    public static int editProfileX = 970;
    public static int editProfileY = 561;

    // EDIT PROFILE
    public static String fullName = "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View/android.widget.EditText[1]";
    public static String editEmail = "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View/android.widget.EditText[2]";
    public static String editPassword = "\t\n" +
            "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View/android.widget.EditText[4]";
    public static String editBd = "\t\n" +
            "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View/android.widget.EditText[3]";
    public static String editLocation = "\t\n" +
            "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View/android.widget.EditText[5]";
    public static String saveButton = "//android.widget.Button[@content-desc=\"SAVE\"]";
    public static String cancelButton = "//android.widget.Button[@content-desc=\"CANCEL\"]";
    public static String editProfileBackButton = "\t\n" +
            "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.Button";
    public static int editCoverX = 957;
    public static int editCoverY = 587;
    public static int editPhotoX = 649;
    public static int editPhotoY = 986;

    // CREATE TWEET
    public static String writeTweet = "\t\n" +
            "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText";
    public static String photoButton = "\t\n" +
            "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[4]";
    public static String postButton = "\t\n" +
            "//android.widget.Button[@content-desc=\"Post\"]";
    public static String backButton = "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.Button";
    public static String image1 = "\t\n" +
            "/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.support.v4.widget.DrawerLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.support.v7.widget.RecyclerView/android.widget.LinearLayout[1]/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.ImageView[1]";
    public static String image2 = "/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.support.v4.widget.DrawerLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.support.v7.widget.RecyclerView/android.widget.LinearLayout[2]/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.ImageView[1]";
    public static String image3 = "/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.support.v4.widget.DrawerLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.support.v7.widget.RecyclerView/android.widget.LinearLayout[3]/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.ImageView[1]";
    public static String postedImage = "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.view.View[4]/android.view.View/android.widget.ImageView";

    // Home Page
    public static String lary = "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.ImageView";
    public static String hello = "//android.view.View[@content-desc=\"Helloooo\"]";


}
