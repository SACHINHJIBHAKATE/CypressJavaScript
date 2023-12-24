// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// SCENARIO: Goal here is to click the 'Add' button for product name provided by the test spec 
// This is how we create a custom command called 'selectProduct' which accepts the parameter 'productName' which can be passed from the test spec when 'selectProduct' method is called from the test spec
 
Cypress.Commands.add('selectProduct', (productName) => {

    cy.get("app-card[class*='col-lg-3']").find('.card-title').each(($el, index, $list) => {

        const cartTitleText = $el.text()
        cy.log(cartTitleText)

        if (cartTitleText.includes(productName))
        {
            cy.get('.btn.btn-info').eq(index).click()
        }
    })
})

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })