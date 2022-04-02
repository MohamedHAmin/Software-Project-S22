/// <reference types="cypress-xpath" />

import selectors from "../../support/selectors"

//This test edit user bio
const newBio= 'newBio'
const newBioExceedingLimit= 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
const expectedNewBio='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

describe('Profile page edit profile', () => {
    it('opens profile page from navbar then select edit', () => {
        
    
        cy.xpath(selectors.profileButtonNavbar).click()

        //redirects to profile page 
        cy.location('pathname').should('eq', '/Roaa09428212')

        //select edit profile
        cy.xpath(selectors.editProfile).click()
        cy.location('pathname').should('eq', '/settings/profile')
        cy.xpath(selectors.editProfilePopup).should('be.visible')

        //edit bio up to 160 char
        cy.xpath(selectors.editBio).type(newBio).should('have.value',newBio)

        //click save
        cy.xpath(selectors.saveEdit).click()
        cy.location('pathname').should('eq', '/Roaa09428212')
        cy.xpath(selectors.editedBio).should('have.text', newBio)

    })

    it('opens profile page from navbar then select edit ', () => {
        
    
        cy.xpath(selectors.profileButtonNavbar).click()

        //redirects to profile page 
        cy.location('pathname').should('eq', '/Roaa09428212')

        //select edit profile
        cy.xpath(selectors.editProfile).click()
        cy.location('pathname').should('eq', '/settings/profile')
        cy.xpath(selectors.editProfilePopup).should('be.visible')

        //edit bio up to 160 char
        cy.xpath(selectors.editBio).type(newBioExceedingLimit).should('have.value',newBioExceedingLimit)

        //click save
        cy.xpath(selectors.saveEdit).click()
        cy.location('pathname').should('eq', '/Roaa09428212')
        cy.xpath(selectors.editedBio).should('have.text', expectedNewBio)

    })
})