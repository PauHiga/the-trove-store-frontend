describe("Trove Store Frontend", function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const AdminUser = {
      "username": "TestAdminUser",
      "password": "TestPass",
      "name": "Test User",
      "email": "email@email.com",
      "phone": "123456",
      "address": "calle 123",
      "role": 1
    }
    cy.request('POST', 'http://localhost:3001/api/user', AdminUser)
    cy.visit('http://localhost:3000')
  })

  it("User with wrong username can not login", { scrollBehavior: false }, function () {
    cy.get('#login').click()
    cy.get('#section-header')
    cy.get('#username').type('IncorrectUsername')
    cy.get('#password').type('TestPass123')
    cy.contains('Log In').click()
    cy.contains('Incorrect username or password')
  })

  it("User with wrong password can not login", { scrollBehavior: false }, function () {
    cy.get('#login').click()
    cy.get('#section-header')
    cy.get('#username').type('TestUser')
    cy.get('#password').type('IncorrectPassword')
    cy.contains('Log In').click()
    cy.contains('Incorrect username or password')
  })

  it("AdminUser can login", { scrollBehavior: false }, function () {
    cy.get('#login').click()
    cy.get('#section-header')
    cy.get('#username').type('TestAdminUser')
    cy.get('#password').type('TestPass')
    cy.contains('Log In').click()
    cy.contains('TestAdminUser logged in')
  })

  describe("When the admin user logged in", function () {
    beforeEach(function () {
      cy.request('POST', "http://localhost:3001/api/login", {
        username: 'TestAdminUser',
        password: 'TestPass'
      }).then(response => {
        localStorage.setItem('loggedUserTroveStore', JSON.stringify(response.body));
        cy.visit('http://localhost:3000');
      });
    });

    it("AdminUser can create a new category", { scrollBehavior: false }, function () {
      cy.contains('TestAdminUser logged in').click();
      cy.contains('Add New Category').click();
      cy.contains('Add Category').click();
      cy.contains('The category name cannot be empty.');
      cy.get('#new-category').type('Test Category');
      cy.contains('Add Category').click();
      cy.contains('Test Category');
    });

    describe("and a category is already created", function () {
      beforeEach(function () {
        cy.wrap(window.localStorage.getItem('loggedUserTroveStore')).then((data) => {
          const token = JSON.parse(data).token;
          cy.request({
            method: 'POST',
            url: 'http://localhost:3001/api/categories',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: {
              category: 'New Category Test'
            }
          })
        });
      })

      it("AdminUser can edit a category", { scrollBehavior: false }, function () {
        cy.contains('TestAdminUser logged in').click()
        cy.reload()
        cy.contains('New Category Test')
      });

      it("AdminUser can create a new product", { scrollBehavior: false }, function () {

        cy.contains('TestAdminUser logged in').click()
        cy.contains('Add New Product').click()
        cy.get('#productName').type('Test Product')
        cy.fixture('mock-images/mock3.jpg').then((fileContent) => {
          cy.get('input[type="file"]').attachFile({
            fileContent: fileContent,
            fileName: 'mock3.jpg',
            mimeType: 'image/jpeg',
            encoding: 'base64',
            subjectType: 'drag-n-drop',
            uploadType: 'input',
            dataTransfer: { featureImg: fileContent },
          });
        });
        cy.get('#description').type('Elevate your wardrobe with this versatile and chic garment. Crafted with care, it offers a perfect blend of comfort, style, and quality, making it a must-have for any fashion-forward individual.')
        cy.get('#price').type('15')
        cy.scrollTo(0, 500);
        cy.get('#stockS').type('10')
        cy.get('#stockM').type('15')
        cy.get('#stockL').type('15')
        cy.get('#stockXL').type('10')
        cy.contains('New Category Test').click()
        cy.scrollTo(0, 800);
        cy.get('#discount').type('10')
        cy.contains('Add Product').click()
        cy.wait(2000)
        cy.visit('http://localhost:3000/category/all-products')
        cy.contains('Test Product')
      })
    })
  });

  describe("When the admin already added a product in the database", function () {

    beforeEach(function () {
      cy.request('POST', "http://localhost:3001/api/login", {
        username: 'TestAdminUser',
        password: 'TestPass'
      }).then(response => {
        localStorage.setItem('loggedUserTroveStore', JSON.stringify(response.body));
      }).then(() => {
        cy.wrap(window.localStorage.getItem('loggedUserTroveStore'))
      })
        .then((data) => {
          const token = JSON.parse(data).token;
          cy.fixture('mock-images/mock3.jpg', 'base64').then((fileContent) => {
            const stock = { U: 0, S: 10, M: 20, L: 20, XL: 10 };
            const formData = new FormData();
            formData.append("name", "Test Product");
            formData.append("description", "Embrace tropical vibes with this stylish tee. Made from lightweight, breathable fabric, featuring a vibrant summer design.");
            formData.append("price", 15);
            formData.append("stock", JSON.stringify(stock));
            formData.append("section", 'women');
            formData.append("category", []);
            formData.append("discount", 10);
            formData.append('featureImg', Cypress.Blob.base64StringToBlob(fileContent, 'image/jpeg'));
            cy.request({
              method: 'POST',
              url: 'http://localhost:3001/api/products',
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            });
          });
        }).then(() => {
          window.localStorage.removeItem("loggedUserTroveStore")
          cy.reload()
        })
    });
    it.only("Unregistered user can add items to the cart and is asked to login", function () {
      cy.get('#login')
      cy.get('#hero-banner').click()
      cy.contains('Test Product').click()
      cy.get('#size-S').click()
      cy.contains('Add to Cart').click()
      cy.contains('added to cart')
      cy.get('#cart').click()
      cy.contains('Login to checkout')
    })
  })

  after(function () {
    cy.wait(2000)
    cy.request('POST', 'http://localhost:3001/api/testing/delete-images')
  });

})