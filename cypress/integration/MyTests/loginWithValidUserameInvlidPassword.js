import selectors from "../../support/selectors"

/// <reference types="cypress-xpath" />

const username='Roaa09428212'
const password='wrongPassword'

describe('Login page', () => {
    
  it('Loggin in with correct username, but incorrect password', () => {

    cy.visit('/')
    // cy.wait(6000)
    cy.xpath(selectors.signin,{ timeout: 100000
      }).should('be.visible')

    cy.xpath(selectors.signin).click()
    cy.location('pathname').should('eq', '/i/flow/login')
    cy.xpath(selectors.loginPopup).should('be.visible')

    //type username
    cy.xpath(selectors.username).type(username).should('have.value',username)
    //next
    cy.xpath(selectors.nextLogin,{ timeout: 100000
      }).should('be.visible')
    cy.xpath(selectors.nextLogin).should('not.be.disabled')
    cy.xpath(selectors.nextLogin).click()
    
    //type password
    cy.xpath(selectors.passwordPopup).should('be.visible')
    cy.xpath(selectors.login).should('be.disabled')
    cy.xpath(selectors.password).type(password).should('have.value',password)
    cy.xpath(selectors.login).should('be.not.disabled')

    //login
    cy.xpath(selectors.login).click()
    //error message wrong password
    //or check that password input field is empty 
    cy.xpath(selectors.password).should('be.empty')

})
})


  