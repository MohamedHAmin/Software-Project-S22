/// <reference types="cypress-xpath" />

import selectors from "../../support/selectors"

//This test edit user name
const newName= 'Roaa'
const newNameExceedingLimit= 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
const expectedNewName='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

describe('Profile page edit profile', () => {
    it('opens profile page from navbar then select edit', () => {
        
    
        cy.xpath(selectors.profileButtonNavbar).click()

        //redirects to profile page 
        cy.location('pathname').should('eq', '/Roaa09428212')

        //select edit profile
        cy.xpath(selectors.editProfile).click()
        cy.location('pathname').should('eq', '/settings/profile')
        cy.xpath(selectors.editProfilePopup).should('be.visible')

        //edit name up to 160 char
        cy.xpath(selectors.editName).type(newName).should('have.value',newName)

        //click save
        cy.xpath(selectors.saveEdit).click()
        cy.location('pathname').should('eq', '/Roaa09428212')
        cy.xpath(selectors.editedName).should('have.text', newName)

    })

    it('opens profile page from navbar then select edit ', () => {
        
    
        cy.xpath(selectors.profileButtonNavbar).click()

        //redirects to profile page 
        cy.location('pathname').should('eq', '/Roaa09428212')

        //select edit profile
        cy.xpath(selectors.editProfile).click()
        cy.location('pathname').should('eq', '/settings/profile')
        cy.xpath(selectors.editProfilePopup).should('be.visible')

        //edit name up to 160 char
        cy.xpath(selectors.editName).type(newNameExceedingLimit).should('have.value',newNameExceedingLimit)

        //click save
        cy.xpath(selectors.saveEdit).click()
        cy.location('pathname').should('eq', '/Roaa09428212')
        cy.xpath(selectors.editedName).should('have.text', expectedNewName)

    })
})