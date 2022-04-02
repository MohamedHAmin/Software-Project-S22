//This file contains twitter selectors

export default {


    userHandle: '//*[@id="id__h0yonxtxyc4"]/div[2]/div/a',
    userHandleFromHome: '//*[@id="id__3mkq24smpc2"]/div[2]/div/a',
    //signup
    signUpButton: '//*[@id="layers"]/div/div[2]/div/div/div/div/div[2]/div/div[2]/a',
    signUpWithEmail: '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/div/div/div[5]',
    signUpWithEmailPopup: '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]',

    //login
    signin: '//*[@id="layers"]/div/div[2]/div/div/div/div/div[2]/div/div[1]/a',
    loginPopup: '//*[@id="layers"]/div/div/div/div/div/div/div[2]/div[2]',
    username:'//*[@id="layers"]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/div/div/div[5]/label/div/div[2]/div/input',
    nextLogin: '//*[@id="layers"]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/div/div/div[6]',
    passwordPopup: '//*[@id="layers"]/div/div/div/div/div/div/div[2]/div[2]',
    password: '//*[@id="layers"]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/div/div/div[3]/div/label/div/div[2]/div[1]/input',
    login: '//*[@id="layers"]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div/div[1]',
    //Create tweet
    tweetBox: '//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div[2]/div/div[2]/div[1]/div/div/div/div[2]/div[1]/div/div/div/div/div/div/div/div/div/label/div[1]/div/div/div/div/div[2]/div',
    tweetButton: '//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div[2]/div/div[2]/div[1]/div/div/div/div[2]/div[3]/div/div/div[2]/div[3]',
    userHandle: '//*[@id="id__ybxyxlpvjls"]/div[2]/div/a/div/div/span',
    createdTweet: '//*[@id="id__pzfeobczayr"]/span',
    tweetButtonInNavbar: '//*[@id="react-root"]/div/div/div[2]/header/div/div/div/div[1]/div[3]/a',
    tweetBoxPopup: '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]',
    tweetButtonInPopup: '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div/div[3]/div/div[1]/div/div/div/div/div[2]/div[3]/div/div/div[2]/div',
    tweetPopupBoxText: '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div/div[3]/div/div[1]/div/div/div/div/div[2]/div[1]/div/div/div/div/div/div/div/div/div/label/div[1]/div/div/div/div/div/div/div/div/div',
    cancelTweetButton: '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div/div/div/div/div[1]/div',
    cancelTweetPopupWindow: '//*[@id="layers"]/div[3]/div/div/div/div/div/div[2]/div[2]',
    discardTweetButton:'//*[@id="layers"]/div[3]/div/div/div/div/div/div[2]/div[2]/div[2]/div[2]',

    //settings
    settingsMenu: '//*[@id="layers"]/div[2]/div/div/div/div[2]/div[3]',
    display: '//*[@id="layers"]/div[2]/div/div/div/div[2]/div[3]/div/div/div/div[10]/a',
    displayPopup: '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]',
    darkMode:'//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div/div[2]/div[8]/div/div/div[3]/input',
    dimMode: '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div/div[2]/div[8]/div/div/div[2]/input',
    defaultMode:'//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div/div[2]/div[8]/div/div/div[1]/input',
    bodyColour: '/html/body',
    doneButtonSettings: '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div/div[2]/div[9]/div',
    settingsAndPrivacy: '//*[@id="layers"]/div[2]/div/div/div/div[2]/div[3]/div/div/div/div[8]/a',
    yourAccount: '//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[2]/div[2]/div[1]/a',
    accountInformation: '//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[2]/div/div[2]/a',
    verifyYourPasswordPopup: '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]',
    editEmailOption: '//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[2]/div/a[3]',
    addEmail: '//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[2]/div/div[3]/a',
    confirmPasswordToChangeEmail: '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/div/div/div[2]/div/label/div/div[2]',
    cancelNextToggleToChangeEmail: '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div/div',
    changeEmailPopup: '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]',
    newEmail: '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/div/div[2]/div/label/div/div[2]/div/input',
    cancelNextToggleNewEmail:'//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div/div/div',
    //change password
    changePassword: '//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[2]/div/div[3]/a',
    currentPassword: '//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[2]/div[1]/div[1]/label/div/div[2]/div/input',
    newPassword: '//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[2]/div[1]/div[3]/label/div/div[2]/div/input',
    confirmNewPassword:'//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[2]/div[1]/div[4]/label/div/div[2]/div/input',
    saveNewPassword: '//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[2]/div[3]/div',
    newPasswordError: '//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[2]/div[1]/div[3]/div/div/div/div/span',
    confirmNewPasswordError:'//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[2]/div[1]/div[4]/div/div/div/div/span',
    currentPasswordError:'//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[2]/div[1]/div[1]/div/div/div[2]/div/span',
    //search
    searchbar: '//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div[1]/div[1]/div/div/div/div/div[1]/div[2]/div/div/div/form/div[1]/div/div/label/div[2]/div/input',
    selectedItem: '//*[@id="typeaheadDropdown-15"]/div[5]/div',

    //follow/unfollow
    followButton: '//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div[2]/div/div/div/div/div[1]/div[2]/div[2]/div/div',
    unfollowButton: '//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div[2]/div/div/div/div[1]/div[1]/div[2]/div[3]/div/div',
    unfollowPopup: '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]',
    confirmUnfollow: '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div[2]/div[1]',
    cancelUnfollow: '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div[2]/div[2]', 

    //edit profile
    editProfile: '//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div[2]/div/div/div/div[2]/div[1]/div[2]/a',
    editProfilePopup: '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]',
    editName: '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div/div[2]/div[3]/label/div/div[2]/div/input',
    editLocation: '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div/div[2]/div[5]/label/div/div[2]/div/input',
    editBio:'//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div/div[2]/div[4]/label/div/div[2]/div/textarea',
    saveEdit: '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[3]/div',
    editedName: '//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div[2]/div/div/div/div[2]/div[2]',
    editedBio:'//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div[2]/div/div/div/div[2]/div[3]/div/div',
    editedLocation: '//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div[2]/div/div/div/div[2]/div[4]/div/span[1]/span/span',
    emptyNameError: '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div/div[2]/div[3]/div/div/div/div/span',


    //navbar controls
    settingsButtonNavbar: '//*[@id="react-root"]/div/div/div[2]/header/div/div/div/div[1]/div[2]/nav/div',
    profileButtonNavbar: '//*[@id="react-root"]/div/div/div[2]/header/div/div/div/div[1]/div[2]/nav/a[7]',
    searchButtonNavbar: '//*[@id="react-root"]/div/div/div[2]/header/div/div/div/div[1]/div[2]/nav/a[2]'
  };