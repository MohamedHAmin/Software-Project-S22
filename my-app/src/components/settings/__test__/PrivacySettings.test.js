import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import PrivacySettings from '../PrivacySettings';

it('should render Audience option and if choosen render checkbox to protect lars', () => {
    render(<PrivacySettings isDarkMode={true}/>);
    const optionElement = screen.getByText(/Audience/i);
    expect(optionElement).toBeInTheDocument();
    fireEvent.click(optionElement);
    const checkBoxElement = screen.getByRole("checkbox");
    expect(checkBoxElement).toBeInTheDocument();
    fireEvent.click(checkBoxElement);
    const modalElement=screen.getByRole("button",{name:"Protect"});
    expect(modalElement).toBeInTheDocument();
  }); 
  it('should close pop up after click cancel ', () => {
    render(<PrivacySettings isDarkMode={true}/>);
    const optionElement = screen.getByText(/Audience/i);
    expect(optionElement).toBeInTheDocument();
    fireEvent.click(optionElement);
    const checkBoxElement = screen.getByRole("checkbox");
    expect(checkBoxElement).toBeInTheDocument();
    fireEvent.click(checkBoxElement);
    const popupElement=screen.getByText("Protect your Lars?")
    expect(popupElement).toBeInTheDocument();
    const modalElement=screen.getByRole("button",{name:"Cancel"});
    expect(modalElement).toBeInTheDocument();
    fireEvent.click(modalElement);
    expect(popupElement).not.toBeVisible();

  }); 

  it('should close modal after click cancel ', () => {
    render(<PrivacySettings isDarkMode={true}/>);
    //renfers the privacy settings page
      const optionElement = screen.getByText(/Audience/i);
      expect(optionElement).toBeInTheDocument();
      fireEvent.click(optionElement);
    //after choosing option Audience must show audience settings page
      const checkBoxElement = screen.getByRole("checkbox");
      expect(checkBoxElement).toBeInTheDocument();
    //when clicking the checkbox it shows a pop up
      fireEvent.click(checkBoxElement);
      const popupElement=screen.getByText("Protect your Lars?")
      expect(popupElement).toBeInTheDocument();
    //when clicking "Protect" the pop up closes and must be invisible
      const modalElement=screen.getByRole("button",{name:"Protect"});
      expect(modalElement).toBeInTheDocument();
      fireEvent.click(modalElement);
      expect(popupElement).not.toBeVisible();

  }); 

  it('should not show the pop up if the checkbox is already checked and the user wants to uncheck it', () => {
    render(<PrivacySettings isDarkMode={true}/>);
    //renfers the privacy settings page
      const optionElement = screen.getByText(/Audience/i);
      expect(optionElement).toBeInTheDocument();
      fireEvent.click(optionElement);
    //after choosing option Audience must show audience settings page
      const checkBoxElement = screen.getByRole("checkbox");
      expect(checkBoxElement).toBeInTheDocument();
    //when clicking the checkbox it shows a pop up
      fireEvent.click(checkBoxElement);
      const popupElement=screen.getByText("Protect your Lars?")
      expect(popupElement).toBeInTheDocument();
    //when clicking "Protect" the pop up closes and must be invisible
      const modalElement=screen.getByRole("button",{name:"Protect"});
      expect(modalElement).toBeInTheDocument();
      fireEvent.click(modalElement);
      expect(popupElement).not.toBeVisible();
    //when reclicking the checkbox no pop up should appear
      fireEvent.click(checkBoxElement);
      expect(popupElement).toBeVisible();

  }); 