import selectors from "../../support/selectors"

describe('Signup page', () => {
    it('sign up with email and password', () => {
    
      cy.visit('/')
      cy.xpath(selectors.signUpButton).click()
      cy.location('pathname').should('eq', '/i/flow/signup') 
      cy.xpath(selectors.signUpWithEmail).should('be.visible')
      
    })
    })