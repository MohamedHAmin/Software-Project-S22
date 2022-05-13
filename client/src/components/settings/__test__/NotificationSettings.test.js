import '@testing-library/jest-dom'
import { render, screen,container, fireEvent } from '@testing-library/react';
import AccountSettings from "../AccountSettings"
import AccountInformationS from "../AccountInformationS"
import ConfirmPassword from '../ConfirmPassword';
import NotificationSettings from '../NotificationSettings';
import ChangeNotificationsSettings from '../ChangeNotificationsSettings';
import userEvent from '@testing-library/user-event';
import { Button } from '@mui/material';
import UpdatePassword from '../UpdatePassword';
import { BrowserRouter } from 'react-router-dom';
import SettingsMenu from "../SettingsMenu";
import TextField from '@mui/material/TextField';


it('should render notification settings header and subtext', () => {
  render(<NotificationSettings isDarkMode={true}/>);
  const headingElement = screen.getByText(/Notifications prefrences/i);
  expect(headingElement).toBeInTheDocument();
});
it('should render notification settings menu option', () => {
  render(<NotificationSettings isDarkMode={true} />);
  const headingElement = screen.getByText(/Push notification/i);
  expect(headingElement).toBeInTheDocument();
});
it('should render push notifications option and switch to turn on/off notifications and 3 checkboxes', () => {
    const profileData={
        Notificationssetting:{
            newtweet:true,
            liketweet:true,
            newfollow:true
        }
    }
    render(<ChangeNotificationsSettings darkMode={true} profileData={profileData}/>);
    const textElement = screen.getByText(/Get push notifications to find out what's going on when you're not on Larry. You can turn them off anytime./i);
    expect(textElement).toBeInTheDocument();
    const switchElement = screen.getByTestId("Switch-turn-on-off-notif");
    expect(switchElement).toBeInTheDocument();
    const checkBoxLarsElement = screen.getByTestId("checkboxNewTweet")
    expect(checkBoxLarsElement).toBeInTheDocument();
    const checkBoxLikesElement = screen.getByTestId("checkboxLikes")
    expect(checkBoxLikesElement).toBeInTheDocument();
    const checkBoxFolowElement = screen.getByTestId("checkboxNewFollowers")
    expect(checkBoxFolowElement).toBeInTheDocument();
    // fireEvent.click(switchElement);
    fireEvent.click(checkBoxLarsElement);
    fireEvent.click(checkBoxLikesElement);
    fireEvent.click(checkBoxFolowElement);
    expect(checkBoxLarsElement).not.toBeChecked();
    expect(checkBoxLikesElement).not.toBeChecked();
    expect(checkBoxFolowElement).not.toBeChecked();
    // const turnOnBtnElement = screen.getByRole("button",{name:"Turn on"})
    // expect(turnOnBtnElement).toBeInTheDocument();
    // expect(checkBoxLarsElement).not.toBeVisible();
    
  }); 
  it('if all notification settings are false should render btn "Turn on" and switch to turn on/off notifications Only', () => {
    const profileData={
        Notificationssetting:{
            newtweet:false,
            liketweet:false,
            newfollow:false
        }
    }
    render(<ChangeNotificationsSettings darkMode={true} profileData={profileData}/>);
    const textElement = screen.getByText(/Get push notifications to find out what's going on when you're not on Larry. You can turn them off anytime./i);
    expect(textElement).toBeInTheDocument();
    
    const switchElement = screen.getByTestId("Switch-turn-on-off-notif");
    expect(switchElement).toBeInTheDocument();
    const turnOnBtnElement = screen.getByRole("button",{name:"Turn On"})
    expect(turnOnBtnElement).toBeInTheDocument();
    //turn on notifications using switch
    fireEvent.click(turnOnBtnElement);
    
    // const likesElement=screen.getByText("Likes");
    // expect(likesElement).toBeInTheDocument();
    
    
    
    
  }); 

//   it('should close modal after click cancel ', () => {
//     render(<PrivacySettings isDarkMode={true}/>);
//     //renfers the privacy settings page
//       const optionElement = screen.getByText(/Audience/i);
//       expect(optionElement).toBeInTheDocument();
//       fireEvent.click(optionElement);
//     //after choosing option Audience must show audience settings page
//       const checkBoxElement = screen.getByRole("checkbox");
//       expect(checkBoxElement).toBeInTheDocument();
//     //when clicking the checkbox it shows a pop up
//       fireEvent.click(checkBoxElement);
//       const popupElement=screen.getByText("Protect your Lars?")
//       expect(popupElement).toBeInTheDocument();
//     //when clicking "Protect" the pop up closes and must be invisible
//       const modalElement=screen.getByRole("button",{name:"Protect"});
//       expect(modalElement).toBeInTheDocument();
//       fireEvent.click(modalElement);
//       expect(popupElement).not.toBeVisible();

//   }); 

//   it('should not show the pop up if the checkbox is already checked and the user wants to uncheck it', () => {
//     render(<PrivacySettings isDarkMode={true}/>);
//     //renfers the privacy settings page
//       const optionElement = screen.getByText(/Audience/i);
//       expect(optionElement).toBeInTheDocument();
//       fireEvent.click(optionElement);
//     //after choosing option Audience must show audience settings page
//       const checkBoxElement = screen.getByRole("checkbox");
//       expect(checkBoxElement).toBeInTheDocument();
//     //when clicking the checkbox it shows a pop up
//       fireEvent.click(checkBoxElement);
//       const popupElement=screen.getByText("Protect your Lars?")
//       expect(popupElement).toBeInTheDocument();
//     //when clicking "Protect" the pop up closes and must be invisible
//       const modalElement=screen.getByRole("button",{name:"Protect"});
//       expect(modalElement).toBeInTheDocument();
//       fireEvent.click(modalElement);
//       expect(popupElement).not.toBeVisible();
//     //when reclicking the checkbox no pop up should appear
//       fireEvent.click(checkBoxElement);
//       expect(popupElement).toBeVisible();

//   }); 