/// <reference types="cypress-xpath" />

import selectors from "../../support/selectors"

//This test changes password with invalid confirmed new password doesnot match new password
const currentPassword='RE112002'
const newPassword='newRE112002'
const confirmNewPassword='new'

describe('Settings and privacy: change password', () => {
    it('changes user password', () => {
        
    
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

       //choose change your password
       cy.xpath(selectors.changePassword).click()
       cy.location('pathname').should('eq', '/settings/password')

       //Write correct current password
       cy.xpath(selectors.saveNewPassword).should('be.disabled')
       cy.xpath(selectors.currentPassword).type(currentPassword).should('have.value',currentPassword)

       //Write new password
       cy.xpath(selectors.saveNewPassword).should('be.disabled')
       cy.xpath(selectors.newPassword).type(newPassword).should('have.value',newPassword)

       //confirm new password
       cy.xpath(selectors.saveNewPassword).should('be.disabled')
       cy.xpath(selectors.confirmNewPassword).type(confirmNewPassword).should('have.value',confirmNewPassword)
       cy.xpath(selectors.saveNewPassword).should('be.not.disabled')
       cy.xpath(selectors.saveNewPassword).click()

       //error message appear 
       cy,xpath(selectors.confirmNewPasswordError).should('have.text', 'Passwords do not match.')
       
    })
})
