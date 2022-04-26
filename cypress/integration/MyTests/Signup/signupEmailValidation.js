import selectors from 'E:/UNI/Year 2/SPRING 2022/CMPN203, Software Engineering/CypressTesting/cypress/support/selectors.js';


/// <reference types="cypress-xpath" />
const validEmail1='reemyasser803@gmail.com'
const validEmail2= '1@2.c'
const validEmail3= '*@mail.com'
const invalidEmail1= 'fake@mail'
const invalidEmail2= 'fakemail.com'
const invalidEmail3= 'fake@mail.com@'
const invalidEmail4= 'fake@mail..com'
const invalidEmail5= '1@2.3'
const invalidEmail6= '*@*.com'


describe('Signup page', () => {
    it('signs up with a valid email i.e a@b.c', () => {
    
      cy.visit('/')
      cy.xpath(selectors.signupNavbar).click()
      cy.location('pathname').should('eq', '/SignUp') 
      
    
      //email
      cy.xpath(selectors.email).type(validEmail1).should('have.value', validEmail1)
       
      //click anywhere
      cy.xpath(selectors.tag).click()

      cy.xpath(selectors.signupForm).contains('Must be a valid email').should('not.exist')
      

    })

    it('signs up with a valid email i.e 1@2.a', () => {
    
        cy.visit('/')
      cy.xpath(selectors.signupNavbar).click()
      cy.location('pathname').should('eq', '/SignUp') 
      
    
      //email
      cy.xpath(selectors.email).type(validEmail2).should('have.value', validEmail2)
       
      //click anywhere
      cy.xpath(selectors.tag).click()

      cy.xpath(selectors.signupForm).contains('Must be a valid email').should('not.exist')
      
      

      })

      it('signs up with an invalid email with no "."', () => {

        cy.visit('/')
        cy.xpath(selectors.signupNavbar).click()
        cy.location('pathname').should('eq', '/SignUp') 
        
      
        //email
        cy.xpath(selectors.email).type(invalidEmail1).should('have.value', invalidEmail1)
         
        //click anywhere
        cy.xpath(selectors.tag).click()
  
        cy.xpath(selectors.signupForm).contains('Must be a valid email').should('exist')
            

      })

      it('signs up with a valid email i.e *@b.c', () => {
    
        cy.visit('/')
        cy.xpath(selectors.signupNavbar).click()
        cy.location('pathname').should('eq', '/SignUp') 
        
      
        //email
        cy.xpath(selectors.email).type(validEmail3).should('have.value', validEmail3)
         
        //click anywhere
        cy.xpath(selectors.tag).click()
  
        cy.xpath(selectors.signupForm).contains('Must be a valid email').should('not.exist')
        
  
      })

      it('signs up with an invalid email with no "."', () => {

        cy.visit('/')
        cy.xpath(selectors.signupNavbar).click()
        cy.location('pathname').should('eq', '/SignUp') 
        
      
        //email
        cy.xpath(selectors.email).type(invalidEmail1).should('have.value', invalidEmail1)
         
        //click anywhere
        cy.xpath(selectors.tag).click()
  
        cy.xpath(selectors.signupForm).contains('Must be a valid email').should('exist')
            

      })

      it('signs up with an invalid email with no "@"', () => {

        cy.visit('/')
        cy.xpath(selectors.signupNavbar).click()
        cy.location('pathname').should('eq', '/SignUp') 
        
      
        //email
        cy.xpath(selectors.email).type(invalidEmail2).should('have.value', invalidEmail2)
         
        //click anywhere
        cy.xpath(selectors.tag).click()
  
        cy.xpath(selectors.signupForm).contains('Must be a valid email').should('exist')
            

      })

      it('signs up with an invalid email with "@" twice', () => {

        cy.visit('/')
        cy.xpath(selectors.signupNavbar).click()
        cy.location('pathname').should('eq', '/SignUp') 
        
      
        //email
        cy.xpath(selectors.email).type(invalidEmail3).should('have.value', invalidEmail3)
         
        //click anywhere
        cy.xpath(selectors.tag).click()
  
        cy.xpath(selectors.signupForm).contains('Must be a valid email').should('exist')
            

      })

      it('signs up with an invalid email with "." twice', () => {

        cy.visit('/')
        cy.xpath(selectors.signupNavbar).click()
        cy.location('pathname').should('eq', '/SignUp') 
        
      
        //email
        cy.xpath(selectors.email).type(invalidEmail4).should('have.value', invalidEmail4)
         
        //click anywhere
        cy.xpath(selectors.tag).click()
  
        cy.xpath(selectors.signupForm).contains('Must be a valid email').should('exist')
            

      })

      it('signs up with an invalid email with a number after "." ', () => {

        cy.visit('/')
        cy.xpath(selectors.signupNavbar).click()
        cy.location('pathname').should('eq', '/SignUp') 
        
      
        //email
        cy.xpath(selectors.email).type(invalidEmail5).should('have.value', invalidEmail5)
         
        //click anywhere
        cy.xpath(selectors.tag).click()
  
        cy.xpath(selectors.signupForm).contains('Must be a valid email').should('exist')
            

      })


      it('signs up with an invalid email with special characters', () => {

        cy.visit('/')
        cy.xpath(selectors.signupNavbar).click()
        cy.location('pathname').should('eq', '/SignUp') 
        
      
        //email
        cy.xpath(selectors.email).type(invalidEmail6).should('have.value', invalidEmail6)
         
        //click anywhere
        cy.xpath(selectors.tag).click()
  
        cy.xpath(selectors.signupForm).contains('Must be a valid email').should('exist')
            

      })
    })