import selectors from 'E:/UNI/Year 2/SPRING 2022/CMPN203, Software Engineering/CypressTesting/cypress/support/selectors.js';


/// <reference types="cypress-xpath" />
const screenName='Reem'
const tag='Reem123'
const email='reemyasser803@gmail.com'
const password='Reem1234'
const exactly6='123456'
const moreThan6='123456789'
const lessThan6='123'

describe('Signup page', () => {
    it('signs up with a valid phone number of exactly 6 numbers', () => {
    
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

      
      //phone number
      cy.xpath(selectors.phoneNumber).type(phoneNumber).should('have.value', phoneNumber)
       
      //click anywhere
      cy.xpath(selectors.biography).click()

      cy.xpath(selectors.signupForm2).contains('Phone number is not valid').should('not.exist')
      

    })

    it('signs up with a valid phone number of more than 6 numbers', () => {
    
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
  
        
        //phone number
        cy.xpath(selectors.phoneNumber).type(invalidPhoneNumber).should('have.value', invalidPhoneNumber)
  
         //click anywhere
        cy.xpath(selectors.biography).click()

        cy.xpath(selectors.signupForm2).contains('Phone number is not valid').should('exist')
        cy.xpath(selectors.signupButton).click()
        cy.location('pathname').should('eq', '/SignUp') 
  
      })

      it('signs up with an invalid phone number of less than 6 numbers', () => {
    
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
  
        
        //phone number
        cy.xpath(selectors.phoneNumber).type(invalidPhoneNumberMixedChar).should('have.value', invalidPhoneNumberMixedChar)
  
         //click anywhere
        cy.xpath(selectors.biography).click()
        
        cy.xpath(selectors.signupForm2).contains('Phone number is not valid').should('exist')
        cy.xpath(selectors.signupButton).click()
        cy.location('pathname').should('eq', '/SignUp') 
      })
    })