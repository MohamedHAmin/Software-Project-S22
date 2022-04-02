/// <reference types="cypress-xpath" />

import selectors from "../../support/selectors"

//This test edit user location
const newLocation= 'newLocation'
const newLocationExceedingLimit= 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
const expectedNewLocation='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

describe('Profile page edit profile', () => {
    it('opens profile page from navbar then select edit', () => {
        
    
        cy.xpath(selectors.profileButtonNavbar).click()

        //redirects to profile page 
        cy.location('pathname').should('eq', '/Roaa09428212')

        //select edit profile
        cy.xpath(selectors.editProfile).click()
        cy.location('pathname').should('eq', '/settings/profile')
        cy.xpath(selectors.editProfilePopup).should('be.visible')

        //edit location up to 160 char
        cy.xpath(selectors.editLocation).type(newLocation).should('have.value',newLocation)

        //click save
        cy.xpath(selectors.saveEdit).click()
        cy.location('pathname').should('eq', '/Roaa09428212')
        cy.xpath(selectors.editedLocation).should('have.text', newLocation)

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
        cy.xpath(selectors.editLocation).type(newLocationExceedingLimit).should('have.value',newLocationExceedingLimit)

        //click save
        cy.xpath(selectors.saveEdit).click()
        cy.location('pathname').should('eq', '/Roaa09428212')
        cy.xpath(selectors.editedLocation).should('have.text', expectedNewLocation)

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
        cy.xpath(selectors.editLocation).type(' ').should('have.value',' ')

        //save button should be disabled
        cy.xpath(selectors.saveEdit).should('be.disabled')
        cy.xpath(selectors.emptyLocationError).should('be.visible')
        

    })
})