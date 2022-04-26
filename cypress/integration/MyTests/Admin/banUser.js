import selectors from 'E:/UNI/Year 2/SPRING 2022/CMPN203, Software Engineering/CypressTesting/cypress/support/selectors.js';


/// <reference types="cypress-xpath" />

describe('Admin ban', () => {


    it('bans a user', () => {

        //log in
        cy.visit('/', {failOnStatusCode: false});
        cy.xpath(selectors.username).type('admintag1').should('have.value', 'admintag1')
        cy.xpath(selectors.password).type('qwertyuiop123456').should('have.value', 'qwertyuiop123456')
        cy.xpath(selectors.login).click()

       //open reports
        cy.xpath(selectors.reportsIcon).click()
        cy.location('pathname').should('eq', '/ReportsPage')
        
        //select user
        cy.xpath(selectors.userToBan).click()

        //ban
        cy.xpath(selectors.banButton).click()
        cy.xpath(selectors.banPopup).should('be.visible')

        cy.xpath(selectors.banDuration).click()
        cy.xpath(selectors.banForADay).click()
        cy.xpath(selectors.banConfirmButton).click()
    })
})

