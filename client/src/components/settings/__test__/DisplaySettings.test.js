import '@testing-library/jest-dom'
// import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DisplaySettings from '../DisplaySettings';

// const [DarkMode,setDarkMode]=useState(false);
//   function handleChangeDisplayMode(){
//     setDarkMode(!DarkMode);
//   }
//   function onDisplayDarkModeChange() {  handleChangeDisplayMode();}
//onDarkModeChanged={onDisplayDarkModeChanged()}
  
it('should render Audience option and if choosen render checkbox to protect lars', () => {
    render(<DisplaySettings isDarkMode={true} />);
    //make sure that display settings is rendered
        const optionElement = screen.getByText(/Manage your font size/i);
        expect(optionElement).toBeInTheDocument();
    //click on option must show the button dark/ light mode
        fireEvent.click(optionElement);
        const switchElement = screen.getByTestId("switch-btn");
        expect(switchElement).toBeInTheDocument();
        //fireEvent.click(switchElement);
        // const modalElement=screen.getByRole("button",{name:"Protect"});
        // expect(modalElement).toBeInTheDocument();
  }); 