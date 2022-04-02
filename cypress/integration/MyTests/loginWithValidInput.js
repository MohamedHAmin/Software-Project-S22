import selectors from "../../support/selectors"

/// <reference types="cypress-xpath" />

const username='Roaa09428212'
const password='RE112002'

describe('Login page', () => {
    
  
    
  it.only('Loggin in with correct input', () => {

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


it('Loggin in facebook', () => {

  
  cy.visit('https://facebook.com/')
  cy.xpath('//*[@id="email"]').type('roaaehab01012002@gmail.com').should('have.value', 'roaaehab01012002@gmail.com')
  cy.get('[data-testid="royal_pass"]').type('RE112002').should('have.value', 'RE112002')
  cy.get('[data-testid="royal_login_button"]').click()
  // cy.location('pathname').should('eq', '/login/')
})
})


  