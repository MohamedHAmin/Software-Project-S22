import selectors from 'E:/UNI/Year 2/SPRING 2022/CMPN203, Software Engineering/CypressTesting/cypress/support/selectors.js';


/// <reference types="cypress-xpath" />


describe('Signup page', () => {
    it('signs up with empty input', () => {
    
      cy.visit('/')
      cy.xpath(selectors.signupNavbar).click()
      cy.location('pathname').should('eq', '/SignUp') 
      
      //next
      cy.xpath(selectors.nextButton).click()

      cy.xpath(selectors.screenNameEmptyError).should('have.text', 'Enter Your screenName')
      cy.xpath(selectors.tagEmptyError).should('have.text', 'Tag is required')
      cy.xpath(selectors.emailEmptyError).should('have.text', 'Email is required')
      cy.xpath(selectors.passwordEmptyError).should('have.text', 'Enter Your Password')
    })
    })