import selectors from 'E:/UNI/Year 2/SPRING 2022/CMPN203, Software Engineering/CypressTesting/cypress/support/selectors.js';


/// <reference types="cypress-xpath" />

describe('Login', () => {


    it('Login with admin account', () => {

        //log in
        cy.visit('/', {failOnStatusCode: false});
        cy.xpath(selectors.username).type('admin2').should('have.value', 'admin2')
        cy.xpath(selectors.password).type('123456').should('have.value', '123456')
        cy.xpath(selectors.login).click()

        //check for reports and dashboard in navbar
        cy.xpath(selectors.reportsIcon).should('exist')
        cy.xpath(selectors.dashboardIcon).should('exist')


    })
})

