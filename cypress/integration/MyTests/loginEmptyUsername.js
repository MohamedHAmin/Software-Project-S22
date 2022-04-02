import selectors from "../../support/selectors"

/// <reference types="cypress-xpath" />

const username=' '


describe('Login page', () => {
    
  it.only('Loggin in with empty username', () => {

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
    
    //error message empty username
    //or check that username input field is empty 
    cy.xpath(selectors.username).should('be.empty')
})



})


  