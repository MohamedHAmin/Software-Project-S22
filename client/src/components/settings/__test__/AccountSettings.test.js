import '@testing-library/jest-dom'
import { render, screen,container, fireEvent } from '@testing-library/react';
import AccountSettings from "../AccountSettings"
import AccountInformationS from "../AccountInformationS"
import ConfirmPassword from '../ConfirmPassword';
import userEvent from '@testing-library/user-event';
import { Button } from '@mui/material';
import UpdatePassword from '../UpdatePassword';
import { BrowserRouter } from 'react-router-dom';
import SettingsMenu from "../SettingsMenu";
import TextField from '@mui/material/TextField';

const MockSettingsMenu=()=>{
  return(
  <BrowserRouter>
  <SettingsMenu
  isDarkMode={true}/>
  </BrowserRouter>
  )
}

it('should render account information header and subtext', () => {
  render(<AccountSettings isDarkMode={true}/>);
  const headingElement = screen.getByText(/See information about your account, download an archive of your data, or learn about your account deactivation options/i);
  expect(headingElement).toBeInTheDocument();
});
it('should render settings menu options header', () => {
  render(<MockSettingsMenu />);
  const headingElement = screen.getByText(/Larry blue/i);
  expect(headingElement).toBeInTheDocument();
});
it('should render email option in accout information page', () => {
  render(<AccountInformationS darkMode={true}/>);
  //account info page with its options including "Email"
    const optionElement = screen.getByText(/Email/i);
    expect(optionElement).toBeInTheDocument();
  //when clicked Email option opens 
  fireEvent.click(optionElement);
  const btnElement = screen.getByRole("button",{name:/save/i});
  expect(btnElement).not.toBeEnabled();//button should be disabled
});
it('trivial case : email entered is correct and not already used', () => {
  render(<AccountInformationS darkMode={true}/>);
  //account info page with its options including "Email"
    const optionElement = screen.getByText(/Email/i);
    expect(optionElement).toBeInTheDocument();
  //when clicked Email option opens 
  fireEvent.click(optionElement);
  const btnElement = screen.getByRole("button",{name:/save/i});
  expect(btnElement).not.toBeEnabled();//button should be disabled
  const inputNewEmailElement=screen.getByTestId("New-Email-AccInfoSpage")
    expect(inputNewEmailElement).toBeInTheDocument();
    fireEvent.change(inputNewEmailElement,{target:{value:"karimragab@yahoo.com"}});
    fireEvent.click(btnElement);
    //pop up should appear
    const mesgEmailChanged=screen.getByText("Email changed!")
    expect(mesgEmailChanged).toBeInTheDocument();
});
it('when email edited (in text field) save btn must be enabled', () => {
  render(<AccountInformationS darkMode={true}/>);
  //account info page with its options including "Email"
    const optionElement = screen.getByText(/Email/i);
    expect(optionElement).toBeInTheDocument();
  //when clicked Email option opens 
    fireEvent.click(optionElement);
    const btnElement = screen.getByRole("button",{name:/save/i});
    expect(btnElement).not.toBeEnabled();
    const inputNewEmailElement=screen.getByTestId("New-Email-AccInfoSpage")
    expect(inputNewEmailElement).toBeInTheDocument();
    fireEvent.change(inputNewEmailElement,{target:{value:"karim"}});
    expect(btnElement).toBeEnabled();//button is enabled due to change in textfieled text
    fireEvent.click(btnElement);
    //clicked button with not correctemail format will show an error message "Incorrect email"
    const errorMsgElement=screen.getByText("Incorrect email")
    expect(errorMsgElement).toBeInTheDocument();
    fireEvent.change(inputNewEmailElement,{target:{value:""}});//enter empty text will show error also
    fireEvent.click(btnElement);
    expect(errorMsgElement).toBeInTheDocument();
  });
  it('when email edited (in text field) but email is already used, render error msg', () => {
    render(<AccountInformationS darkMode={true}/>);
    //account info page with its options including "Email"
      const optionElement = screen.getByText(/Email/i);
      expect(optionElement).toBeInTheDocument();
    //when clicked Email option opens 
      fireEvent.click(optionElement);
      const btnElement = screen.getByRole("button",{name:/save/i});
      const inputNewEmailElement=screen.getByTestId("New-Email-AccInfoSpage")
      fireEvent.change(inputNewEmailElement,{target:{value:"karimy@gmail.com"}});
      fireEvent.click(btnElement);
      //clicked button with not correctemail format will show an error message "Email already used"
      const errorMsgElement=screen.getByText("Email already used")
      expect(errorMsgElement).toBeInTheDocument();
      
    });
it('check that the btn SAVE in update password form is initially disabled when no input is entered', () => {
  render(<UpdatePassword darkMode={true}/>);
  const btnElement = screen.getByRole("button",{name:/save/i});
  expect(btnElement).not.toBeEnabled();
});
it('check that the btn SAVE in update password form disabled untill all input passwords are entered', () => {
  render(<UpdatePassword darkMode={true}/>);
  const btnElement = screen.getByRole("button",{name:/save/i});
  //btn save disabled initially
  expect(btnElement).not.toBeEnabled();
  const inputOldPassElement=screen.getByTestId("Current-password-updatepage")
  expect(inputOldPassElement).toBeInTheDocument();
  fireEvent.change(inputOldPassElement,{target:{value:"karim"}});
  expect(inputOldPassElement.value).toBe("karim");//if i write correct password only (no new password)
  //the save button must be disablead
  expect(btnElement).not.toBeEnabled();
  //check on input new password without entering confirm password
  const inputNewPassElement=screen.getByTestId("New-password-updatepage")
  expect(inputNewPassElement).toBeInTheDocument(); 
  fireEvent.change(inputNewPassElement,{target:{value:"kimoyasser"}});
  expect(inputNewPassElement.value).toBe("kimoyasser");
  //the save button must be disablead
  expect(btnElement).not.toBeEnabled();
  //if he enters all text fields required then the button should be enablead
  //and we test the he enters correct new password
  const inputNewPass2Element=screen.getByTestId("New-password2-updatepage")
  expect(inputNewPass2Element).toBeInTheDocument(); 
  fireEvent.change(inputNewPass2Element,{target:{value:"kimoyasser"}});
  expect(inputNewPass2Element.value).toBe("kimoyasser");
  //the save button must be enablead
  expect(btnElement).toBeEnabled();
});
//trivial case new password is correct and both match
it('check that update password is done correctly trivial case new password is correct and both match', () => {
  render(<UpdatePassword darkMode={true}/>);
  const btnElement = screen.getByRole("button",{name:/save/i});
  const inputOldPassElement=screen.getByTestId("Current-password-updatepage")
  fireEvent.change(inputOldPassElement,{target:{value:"01157828196"}});
  //check on input new password without entering confirm password
  const inputNewPassElement=screen.getByTestId("New-password-updatepage")
  fireEvent.change(inputNewPassElement,{target:{value:"kimoyasser"}});
  //if he enters all text fields required then the button should be enablead
  //and we test the he enters correct new password
  const inputNewPass2Element=screen.getByTestId("New-password2-updatepage")
  fireEvent.change(inputNewPass2Element,{target:{value:"kimoyasser"}});
  //the save button must be enablead
  expect(btnElement).toBeEnabled();
  //trivial case new password is correct and both match
  fireEvent.click(btnElement);
  // const btnMessageSavedPassElement=screen.getByRole("button",{name:/CLOSE/i});
  // //this means that the pop up appeared
  // expect(btnMessageSavedPassElement).toBeInTheDocument();
  // fireEvent.click(btnMessageSavedPassElement)
  // expect(btnMessageSavedPassElement).not.toBeVisible();
//password changed successfully
});
// it('check that the input field is working ', () => {
//   render(<UpdatePassword darkMode={true}/>);
//   const btnElement = screen.getByRole("button",{name:/save/i});
//   expect(btnElement).not.toBeEnabled();
//   const { wrapper, props } = setup();
//   expect(wrapper.find(TextField).props().value).to.equal('');
// });


// it('should ', () => {
//   render(<ConfirmPassword darkMode={true}/>);
//   const { wrapper, props } = setup();
//   expect(wrapper.find(TextField).props.value).to.equal('');
//   // fireEvent.change(inputElement,{target:{value:"karim"}})
//   // expect(inputElement.value).toBe("karim");
// });

// it('should render email option', () => {
//   render(<ConfirmPassword darkMode={true}/>);
//   //const inputElement = screen.getByTestId('passwordconfirm1');
//   //userEvent.type(inputElement,"karim")
//   const buttonElement = screen.getByRole("button",{name:/Confirm/i});
//   fireEvent.click(buttonElement)
//   expect(inputElement.value).toBeInTheDocument("karim");
// });

// it('should render text field and set its value', () => {
//   render(<UpdatePassword darkMode={true}/>);
//   const inputElement = screen.getByRole(input)
//   //const inputElement = screen.getByTestId('passwordconfirm1');
//   //userEvent.type(inputElement,"karim")

//   // const buttonElement = screen.getByRole("button",{name:/Confirm/i});
//   // fireEvent.click(buttonElement);
//   fireEvent.change(inputElement,{target:{value:"karim"}});
//   expect(inputElement.value).toBe("karim");
// });