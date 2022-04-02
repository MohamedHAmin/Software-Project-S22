/// <reference types="cypress-xpath" />

import selectors from "../../support/selectors"

//This test changes email/password

describe('Settings and privacy: change email', () => {
    it('changes user email', () => {
        
    
       //click settings
       cy.xpath(selectors.settingsButtonNavbar).click()
       //popup settings menu appear
       cy.xpath(selectors.settingsMenu).should('be.visible')
       
       //click settings and privacy
       cy.xpath(selectors.settingsAndPrivacy).click()
       cy.location('pathname').should('eq', '/settings')

       //click your account
       cy.xpath(selectors.yourAccount).click()
       cy.location('pathname').should('eq', '/settings/account')

       //click account information
       cy.xpath(selectors.accountInformation).click()
       cy.location('pathname').should('eq', '/settings/your_twitter_data/account')

       //click Email
       cy.xpath(selectors.editEmailOption).click()
       cy.location('pathname').should('eq', '/settings/email')

       //select email address
       cy.xpath(selectors.addEmail).click()
       cy.location('pathname').should('eq', '/i/flow/add_email')

       //confirm password
       cy.xpath(selectors.verifyYourPasswordPopup).should('be.visible')
       cy.xpath(selectors.cancelNextToggleToChangeEmail).should('have.text', 'Cancel');
       cy.xpath(selectors.confirmPasswordToChangeEmail).type('RE112002').should('have.value','RE112002')
       cy.xpath(selectors.cancelNextToggleToChangeEmail).should('have.text', 'Next');
       cy.xpath(selectors.cancelNextToggleToChangeEmail).click()
       

       //add new email
       cy.xpath(selectors.changeEmailPopup).should('be.visible')
       cy.xpath(selectors.cancelNextToggleNewEmail).should('have.text', 'Cancel');
       cy.xpath(selectors.newEmail).type('Roaa.Fawzy02@eng-st.cu.edu.eg').should('have.value','Roaa.Fawzy02@eng-st.cu.edu.eg')
       cy.xpath(selectors.cancelNextToggleNewEmail).should('have.text', 'Next');
       cy.xpath(selectors.cancelNextToggleNewEmail).click()

       //cancel the process till verification 
       cy.xpath(selectors.newEmail).clear()
       cy.xpath(selectors.cancelNextToggleNewEmail).should('have.text', 'Cancel');
       cy.xpath(selectors.cancelNextToggleNewEmail).click()
       cy.location('pathname').should('eq', '/settings/email')



    })
})