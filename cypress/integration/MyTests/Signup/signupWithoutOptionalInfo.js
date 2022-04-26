import selectors from 'E:/UNI/Year 2/SPRING 2022/CMPN203, Software Engineering/CypressTesting/cypress/support/selectors.js';


/// <reference types="cypress-xpath" />
const screenName='Reemy'
const tag='Reemy'
const email='reemyasser332@yahoo.com'
const password='123456'

describe('Signup page', () => {
    it('signs up without birthdate, bio, phone number', () => {
    
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

     //signup
      cy.xpath(selectors.signupButton).click()

      cy.location('pathname').should('eq', '/')
      
    })
    })