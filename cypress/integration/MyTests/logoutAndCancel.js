/// <reference types="cypress-xpath" />

describe('Logout page', () => {
    it('asks to log out from twitter account then cancel the process', () => {
  
      //click on the account button at the bottom left corner
      cy.get('[data-testid="SideNav_AccountSwitcher_Button"]').click()
      cy.xpath('//*[@id="react-root"]/div/div/div[2]/header/div/div/div/div[2]/div/div').click()
      
      //click on logout
      cy.get('[data-testid="AccountSwitcher_Logout_Button"]').click()
      //cy.xpath('//*[@id="layers"]/div[2]/div/div/div[2]/div/div[2]/div/div/div/div/div/a[2]').click()
  
      //the url is changed tp logout page
      cy.location('pathname').should('eq', '/logout')
  
      //click on cancel
      cy.get('[data-testid="confirmationSheetCancel"]').click()
      //cy.xpath('//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div[2]/div[2]').click()
  
      //redirect back to profile page 
      cy.location('pathname').should('eq', '/home')
  
  })
  })