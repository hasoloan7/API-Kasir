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
  });

  it("Gagal login karena password tidak valid", () => {  
    const requestBody={
                      email: "tokokartiko@gmail.com",
                      password: "qwuie"
                    }
    cy.request({
                method: "POST",
                url: `${baseURL}authentications`,
                failOnStatusCode: false,
                body:requestBody
                })
                .then ((respone) => {
                  expect(respone.status).to.eq(401)
                  expect(respone.body.status).to.eq("fail")
                  expect(respone.body.message).to.eq('Kredensial yang Anda berikan salah')
                
                })
  
});

it("Gagal login karena email tidak valid", () => {
  const requestBody={
                email: "toko@gmail.com",
                password: "passwordtokokartiko"
                }
  cy.request({
              method: "POST",
              url: `${baseURL}authentications`,
              body:requestBody,
              failOnStatusCode: false
              })
              .then ((respone) => {
                expect(respone.status).to.eq(401)
                expect(respone.body.status).to.eq("fail")
                expect(respone.body.message).to.eq("Kredensial yang Anda berikan salah")
              })
});

it("Gagal login karena email dan password tidak valid", () => {
  const requestBody={
                      email: "toko@gmail.com",
                      password: "wqewx"
                    }
  cy.request({
              method: "POST",
              url: `${baseURL}authentications`,
              body:requestBody,
              failOnStatusCode: false
              })
              .then ((respone) => {
                expect(respone.status).to.eq(401)
                expect(respone.body.status).to.eq("fail")
                expect(respone.body.message).to.eq("Kredensial yang Anda berikan salah")
              })
});

it("Gagal login karena format email salah", () => {
  const requestBody={
              email: "tokokartikogmail.com",
              password: "passwordtokokartiko"
            }
  cy.request({
              method: "POST",
              url: `${baseURL}authentications`,
              body:requestBody,
              failOnStatusCode: false
              })
              .then ((respone) => {
                expect(respone.status).to.eq(400)
                expect(respone.body.status).to.eq("fail")
                expect(respone.body.message).to.eq("\"email\" must be a valid email")
              })
});

it("Gagal login karena body email kosong", () => {
  const requestBody={
                    email: "",
                    password: "passwordtokokartiko"
                  }
  cy.request({
              method: "POST",
              url: `${baseURL}authentications`,
              body:requestBody,
              failOnStatusCode: false
              })
              .then ((respone) => {
                expect(respone.status).to.eq(400)
                expect(respone.body.status).to.eq("fail")
                expect(respone.body.message).to.eq("\"email\" is not allowed to be empty")
              })
});

it("Gagal login karena body password kosong", () => {
  const requestBody={
                    email: "tokokartiko@gmail.com",
                    password: ""
                  }
  cy.request({
              method: "POST",
              url:`${baseURL}authentications`,
              body:requestBody,
              failOnStatusCode: false
              })
              .then ((respone) => {
                expect(respone.status).to.eq(400)
                expect(respone.body.status).to.eq("fail")
                expect(respone.body.message).to.eq("\"password\" is not allowed to be empty")
              })
        
});

it("Gagal login karena body password kosong", () => {
    
  const requestBody={
                    email: "",
                    password: ""
                  }
  cy.request({
              method: "POST",
              url: `${baseURL}authentications`,
              body:requestBody,
              failOnStatusCode: false
              })
              .then ((respone) => {
                expect(respone.status).to.eq(400)
                expect(respone.body.status).to.eq("fail")
                expect(respone.body.message).to.eq("\"email\" is not allowed to be empty")
              })
        
});
})