# Automated Testing of the API Application KasirAja 

## Requirements

- Node Js v21.7.1
- Visual Studio Code
- Cypress 13.10.0

## How to Start

- Create a Project Directory and Install Cypress
  ```bash
  mkdir "my API test project"
  cd "my API test project location"
  npm init -y
  npm install --save-dev cypress@13.10.0
  ```
- Open Cypress
  ```bash
  npx cypress open
  ```
- Create a new API test file inside the "cypress/e2e" folder.
- Create Test Case

  Test cases are steps that Cypress will run to test the API. Here is an example of how to create a test case using Cypress:

  ```bash
  describe("Kasir API", ()=>{

  const baseURL = "https://kasir-api.belajarqa.com/";
  it("Sukses login dengan kredensial valid", () => {
    
      const requestBody={
        email: "tokokartiko@gmail.com",
        password: "passwordtokokartiko"
      }
      cy.request({
                  method: "POST",
                  url: `${baseURL}authentications`,
                  body:requestBody
                  })
                  .then ((respone) => {
                    expect(respone.status).to.eq(201)
                    expect(respone.body.status).to.eq("success")
                    expect(respone.body.message).to.eq("Authentication berhasil ditambahkan")
                    expect(respone.body.data.user.role).to.eq("admin")
                    expect(respone.headers).to.have.property("content-type", "application/json; charset=utf-8")
                  })
  })
  ```
- Execute Test Case

  After we create a test case, we can run it using Cypress. To run the test case, we can click the run button on Cypress. We will get the test results in the form of a report.
## Test Documentation

[View Test Report](https://hasoloan7.github.io/Test_API_Kasiraja/cypress/reports/html/index.html)

