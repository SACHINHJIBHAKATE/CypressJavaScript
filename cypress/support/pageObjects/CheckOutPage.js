//Following is how we create a class in javascript

class CheckOutPage
{
    getCheckOutButton2()
    {
        return cy.contains('Checkout')
    }
}

// In order for other files e.g. test specs to access this class, we need to export this class
// Since page object classes we need to create, therefore we need to provide export & import,
// For fixtures & commands.js, we dont need to export & import as they are by default provided by cypress
export default CheckOutPage;