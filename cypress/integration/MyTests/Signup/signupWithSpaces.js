import selectors from 'E:/UNI/Year 2/SPRING 2022/CMPN203, Software Engineering/CypressTesting/cypress/support/selectors.js';


/// <reference types="cypress-xpath" />
const screenName='   '
const tag=' '
const email=' '
const password='      '

describe('Signup page', () => {
    it('signs up spaces for all inputs, with same char limit respectively', () => {
    
      cy.visit('/')
      cy.xpath(selectors.signupNavbar).click()
      cy.location('pathname').should('eq', '/SignUp') 
      
      //screen name
      cy.xpath(selectors.screenName).type(screenName).should('have.value', screenName)
      
      //tag
      cy.xpath(selectors.tag).type(tag).should('have.value', tag)

      //email
      cy.xpath(selectors.email).type(email).should('have.value', email)

      //password
      cy.xpath(selectors.passwordSignup).type(password).should('have.value', password)

      //next
      cy.xpath(selectors.nextButton).click()

      cy.xpath(selectors.signupForm).contains('Enter Your screenName').should('exist')
      cy.xpath(selectors.signupForm).contains('Tag is required').should('exist')
      cy.xpath(selectors.signupForm).contains('Email is required').should('exist')
      cy.xpath(selectors.signupForm).contains('Enter Your Password').should('exist')
    })
    })