import selectors from 'E:/UNI/Year 2/SPRING 2022/CMPN203, Software Engineering/CypressTesting/cypress/support/selectors.js';


/// <reference types="cypress-xpath" />
const screenName='Reem'
const tag='Reem123'
const email='reemyasser803@gmail.com'
const password='Reem1234'

describe('Signup page', () => {
    it('signs up with empty screen name', () => {
    
      cy.visit('/')
      cy.xpath(selectors.signupNavbar).click()
      cy.location('pathname').should('eq', '/SignUp') 
      
      //screen name
      cy.xpath(selectors.screenName).focus()
      
      //click anywhere
      cy.xpath(selectors.tag).click()

      //error message should appear
      cy.xpath(selectors.signupForm).contains('Enter Your screenName')
      
    })

    it('signs up with empty tag', () => {
    
        cy.visit('/')
        cy.xpath(selectors.signupNavbar).click()
        cy.location('pathname').should('eq', '/SignUp') 
        
        //screen name
        cy.xpath(selectors.screenName).type(screenName).should('have.value', screenName)
        
        //tag
        cy.xpath(selectors.tag).focus()

        //click anywhere
        cy.xpath(selectors.email).click()
  
        //error message should appear
        cy.xpath(selectors.signupForm).contains('Tag is required')
        
      })

      it('signs up with empty email', () => {
    
        cy.visit('/')
        cy.xpath(selectors.signupNavbar).click()
        cy.location('pathname').should('eq', '/SignUp') 
        
        //screen name
        cy.xpath(selectors.screenName).type(screenName).should('have.value', screenName)
        
        //tag
        cy.xpath(selectors.tag).type(tag).should('have.value', tag)

        //email
        cy.xpath(selectors.email).focus()

        //click anywhere
        cy.xpath(selectors.passwordSignup).click()
  
        //error message should appear
        cy.xpath(selectors.signupForm).contains('Email is required')
        
      })

      it('signs up with empty password', () => {
    
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
        cy.xpath(selectors.password).focus()

        //click anywhere
        cy.xpath(selectors.nextButton).click()
  
        //error message should appear
        cy.xpath(selectors.signupForm).contains('Enter Your Password')
        
      })
    })