/// <reference types="Cypress" />

describe('Test Suite',function(){

    // Hooks in Cypress: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests
    // before hook method is executed before the execution of any of the tests
    before(() => {
        cy.fixture('example').then(function(datafile)
        {
            this.datafile = datafile
        })
      })

    it ('Test Case3',function(){

        cy.visit('https://rahulshettyacademy.com/angularpractice/')
        cy.get("input[name='name']:nth-child(2)").type(this.datafile.name)
        cy.get('select').select(this.datafile.gender)
        cy.get("input[name='name']:nth-child(1)").should('have.value',this.datafile.name)
        cy.get("input[name='name']:nth-child(2)").should('have.attr', 'minlength','2')
        cy.get('#inlineRadio3').should('be.disabled')

        // Debugging: We can use pause command ‘cy.pause()’ to pause the execution and then click the resume icon in the Test Runner to resume the execution
        // Pause before selecting the ‘Shop’ icon
        // cy.pause()

        // debug() method acts same as the pause() method. It pauses the execution
        // We need to have your Developer Tools open for .debug() to hit the breakpoint.
        // cy.debug()
        // We can also append the debug() method at the end of the command e.g.,  cy.contains('Shop').click().debub(), so it will pause the execution after clicking the 'Shop' button
        cy.contains('Shop').click()
        cy.wait(5000)

        // cy.get("app-card[class*='col-lg-3']") --> This captures main element
        // .find('.card-title') --> This then captures the cart title inside the main element
        // $list will then contain the 4 cart title elements
        // Note: We can directly capture the 4 cart title elements using the below
        // cy.get('.card-title').each(($el, index, $list) => {
        cy.get("app-card[class*='col-lg-3']").find('.card-title').each(($el, index, $list) => {

            const cartTitleText = $el.text()
            cy.log(cartTitleText)

            // If we are comparing strings, then we can not use === therefore we need to use includes
            // If we are comparing numbers, then we can use ===
            // if (cartTitleText === 'Samsung Note 8')
            if (cartTitleText.includes('Samsung Note 8'))
            {
                // As we need to click the 'Add' button for the same cart title element in $el from which we captured the cart title text,
                // we can use index for that same cart title to locate the 'Add' button and click on it
                cy.get('.btn.btn-info').eq(index).click()
            }
        })

        // Instead of the above code (lines 29 to 43) for the highlighted scenario, we can create custom command & pass the productname from this test spec file
        // Refer 'Cypress.Commands.add('selectProduct', (productName)' in commands.js file
        // We are passing a different product name in the below method
        // Whenver we have to give a user input in the spec file within a method, we can create a custom method in 'commands.js'and pass the user input from the spec to that method in 'commands.js'
        cy.selectProduct('Nokia Edge')

        // SCENARIO: 
        // Dont harcode any values like in step 49 in the spec file
        // Therefore, in the 'example.json', define - "productName": "Nokia Edge"
        // And provide 'this.datafile.productName' in the below selectProduct method
        // cy.selectProduct(this.datafile.productName)
        
        // SCENARIO: 
        // Parameterise the custom method 'selectProduct'
        // Add multiple values as array for 'productName' in the 'example.json' file
        // "productName": ["Blackberry","iphone X"]
        // this.data.product ==> This returns an array ["Blackberry","iphone X"], instead of single element
        // forEach method is a JavaScript method, so we can have to resolve the promise
        // forEach method stores each value from the array in element
        // we can then pass 'element' in the command like cy.selectProduct(element),
        // so, command 'cy.selectProduct(element)' will be called twice with each element
        this.datafile.productName.forEach(function(element)
        {
            cy.selectProduct(element) 
        })
    })
})