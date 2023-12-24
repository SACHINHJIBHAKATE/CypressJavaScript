/// <reference types="Cypress" />

// We need to import the page objects classes (HomePage & ProductsPage), so we can call the HomePage & ProductsPage class methods from this test spec
// since this test spec is in 'examples' folder, if we give ../ the control moves to the parent folder which is 'integration' folder
// then from the 'integration' parent folder, we need navigate to child folder 'pageObjects' and then navigate to the page objects classes 'HomePage' & 'ProductsPage' under it 
import HomePage from '../support/pageObjects/HomePage'
import ProductsPage from '../support/pageObjects/ProductsPage'
import CheckOutPage from '../support/pageObjects/CheckOutPage'
import PurchasePage from '../support/pageObjects/PurchasePage'

describe('Test Suite',function(){

    // Hooks in Cypress: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests
    // before hook method is executed before the execution of any of the tests
    before(() => {
        cy.fixture('example').then(function(datafile)
        {
            this.datafile = datafile
        })
      })

    it ('Test Case',function(){

        // In a scenario where we want to update the default timeout at a spec level (where we don´t want the timeout to apply for all the tests), it can be done as well
        // Cypress.config('defaultCommandTimeout','10000')

        // Instead of hard coding the website URL (as done above), define the URL in the 'cypress.config.js' file,
        // and call it using cypress env() method - 'Cypress.env('url3')' ==> This will be replaced by the value for key 'url3' which is the URL
        cy.visit(Cypress.env('url3'))
        //cy.visit('https://rahulshettyacademy.com/angularpractice/')

        // create object of the page objects class (HomePage) - new classname() creates the object in JavaScript, so we can call the methods of the HomePage class using the object.method name 
        // create object of the page objects class (ProductsPage) - new classname() creates the object in JavaScript, so we can call the methods of the ProductsPage class using the object.method name 
        // create object of the page objects class (CheckoutPage), so we can call the methods of the CheckoutPage class using the object.method name 
        // create object of the page objects class (PurchasePage), so we can call the methods of the PurchasePage class using the object.method name 
        const homePage = new HomePage()
        const productsPage = new ProductsPage()
        const checkOutPage = new CheckOutPage()
        const purchasePage = new PurchasePage()
        
        homePage.getNameField().type(this.datafile.name)
        //cy.get("input[name='name']:nth-child(2)").type(this.datafile.name)
        
        homePage.getGenderDropdown().select(this.datafile.gender)
        //cy.get('select').select(this.datafile.gender)

        homePage.getTwowayDataBindingField().should('have.value',this.datafile.name)
        //cy.get("input[name='name']:nth-child(1)").should('have.value',this.datafile.name)

        homePage.getNameField().should('have.attr', 'minlength','2')
        //cy.get("input[name='name']:nth-child(2)").should('have.attr', 'minlength','2')

        homePage.getRadioButton().should('be.disabled')
        //cy.get('#inlineRadio3').should('be.disabled')

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
        productsPage.getCartTitle().each(($el, index, $list) => {
        //cy.get("app-card[class*='col-lg-3']").find('.card-title').each(($el, index, $list) => {

            const cartTitleText = $el.text()
            cy.log(cartTitleText)

            // If we are comparing strings, then we can not use === therefore we need to use includes
            // If we are comparing numbers, then we can use ===
            // if (cartTitleText === 'Samsung Note 8')
            if (cartTitleText.includes('Samsung Note 8'))
            {
                // As we need to click the 'Add' button for the same cart title element in $el from which we captured the cart title text,
                // we can use index for that same cart title to locate the 'Add' button and click on it
                productsPage.getButton().eq(index).click()
                //cy.get('.btn.btn-info').eq(index).click()
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

        productsPage.getCheckOutButton1().click()
        //cy.get('.nav-link.btn.btn-primary').click()

        //SCENARIO: Check if the sum of the product prices matches the total 

        // SCENARIO START:

        // STEP 1:
        // cy.get('tr td:nth-child(4) strong') ==> This will return all the price elements in the 4th column (Refer point 10) in the Cypress Notes.doc)
        // We then need to iterate through each elemnt & sum them 
        // This variable s required to sum the prices. As the value of the variable will change after adding price for each element, use var instead of const.
        var sum=0
        // We also need to define 'productstotal' variable for it to be accessible globally within this file
        // If we only define within the loop, it is only accessible within the loop
        var productstotal

        cy. get('tr td:nth-child(4) strong').each(($el, index, $list) => {

            // This returns 2 elements 1) ₹. 50000 2) ₹. 65000
            const productprice = $el.text()
            // cy.log(productprice)
            // As we only need the number i.e. 50000 & 65000 (in order to sum the prices), we need to split the text using split() method
            // We need to split the text using space, so text is splitted in 2 parts & then grab the value at the 1st index of the array which is the product price
            var price = productprice.split(" ")
            // cy.log(price)
            // If we have to use the variable again to perform more operations like in this case, we need grab the value at the 1st index of the array & then trim the text to remove any possible spaces before or after 50000 & 65000, then use 'var' instead of 'const'
            price = price[1].trim()
            // cy.log(price)

            // This will add the price of each product to sum variable
            // As we need to sum, we need to convert value in price variable (which is a string) to number, so use Number() method in javascript - Number(price)
            // Even if we delcared var sum = 0, javascript still treats it as string, so we need to convert value in sum variable (which is a string) to number, so use Number() method in javascript - Number(sum) 
            sum = Number(sum) + Number(price)
        })

        // STEP 2:
        // NOW, we need to grab the total displayed on the page & compare it to the sum of the product prices
        // cy.get('td h3 strong') ==> This will grab the total element
        // Since we can't do 'cy.get('td h3 strong').text()' given text() is a jquery method (non-cypress method), we need to resolve promise and then grab the text
        // Regrading the logic to split, grabing value at index 1 & trim, refer notes under STEP 1
        cy.get('td h3 strong').then(function(element){
            const total = element.text()
            var productstotal = total.split(" ")
            productstotal = productstotal[1].trim()
            // cy.log(productstotal)

        // STEP 3:
        // NOW, we need to compare the sum of products & the total price dislayed on the web page
        // Since we can compare 2 strings or 2 integers, given 'sum' is an integer, we need to convert productstotal from string to interger & then compare
        // Use assertion in Chai library
        // Chai Library Assertions: https://docs.cypress.io/guides/references/assertions#BDD-Assertions
        // Assertion Example: expect(42).to.equal(42)

        // THUMB RULE: If there logging commands or javascript commands, we need to include them in either in loop, 
        // or within .then(function(){}), because given the asynchronous nature of javascript, non cypress commands are not executed in sequence,
        // and the cypress commands which are ready e.g. cy.log(sum) are executed,
        // Also, non cypress commands 9e.g. trim, split etc.) i.e. javascript commands are not executed in sequence
        // Therefore, the following logic is included in this block
            productstotal = Number(productstotal)
            cy.log(productstotal)
            expect(sum).to.equal(productstotal)
        })

        // END OF THE SCENARIO

        checkOutPage.getCheckOutButton2().click()
        //cy.contains('Checkout').click()

        purchasePage.getCountryField().type('ind')
        //cy.get('#country').type('ind')

        cy.wait(10000)
   
    // CSS selector .suggestions ul li a' (parent to child traversing) will identify both the elements containing texts 'India' & 'Indonesia'
        /*
        <div class="suggestions">
              <!---->
            <ul xpath="1">
               <li>
                 <a>India</a>
                </li>
            </ul>
            <ul xpath="1">
                <li>
                    <a>Indonesia</a>
                </li>
            </ul>
        </div>
        */
        // .each(($el, index, $list) => { --> This resolves the promise, therefore we can apply text() method (which is jQuery method) without resolving promise
        cy.get('.suggestions ul li a').each(($el, index, $list) => {

            // extract the text of the dynamic dropdown elements
            const vegName = $el.text()

            if (vegName.includes('India'))
            {
                // just as an exception, when using click() method, even if promise is resolved, we need to resolve the promise for $el using cy.wrap($el)
                cy.wrap($el).click()
            }
        })

        // Sometimes, cypress throws an error ‘Element is covered by another element’ e.g., when clicking the checkbox, cypress is unable to click the checkbox
        // Cypress also gives suggestion to use {force: true} in this case when clicking the element to force click
        purchasePage.getCheckBox().click({force: true})
        //cy.get('#checkbox2').click({force: true})
        
        purchasePage.getPurchaseButton().click()
        //cy.get("input[value='Purchase']").click()

        // Refer 'Cypress Notes.doc' point 9 for the error & why the following code can't be used to validate the success message
        // cy.get('.alert').should('have.text','Success! Thank you! Your order will be delivered in next few weeks :-).')
        // const successmessage = cy.get('.alert').text() ==> text() method can't be used directly as its not a cypress method, 
        // so we need to resolve the promise and then use the text() method

        cy.get('.alert').then(function(element){

            const successmessage = element.text()

            // Assertions in Chai library
            // https://docs.cypress.io/guides/references/assertions#BDD-Assertions
            // We need to use 'expect(true).to.be.true' ==> write the condition in place of true, if condition is true, 
            // then the assertion will pass
            expect(successmessage.includes('AQW')).to.be.true
        })
    })
})