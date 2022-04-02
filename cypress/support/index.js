// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
require('cypress-xpath')
// Alternatively you can use CommonJS syntax:
// require('./commands')
const username='Roaa09428212'
const password='RE112002'
beforeEach(() => {
    
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

  //
  cy.xpath(selectors.login).should('be.not.disabled')

  //login
  cy.xpath(selectors.login).click()
  cy.location('pathname').should('eq', '/home')
    
  })
