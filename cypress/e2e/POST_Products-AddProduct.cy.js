describe('Kasir API', () => {

    const baseURL = "https://kasir-api.belajarqa.com/";
    let token;
    let categoryId;
  
    before(() => {
        cy.request({
            method: "POST",
            url: `${baseURL}authentications`,
            body: {
                email: "tokokartiko@gmail.com",
                password: "passwordtokokartiko"
            }
        }).then((respone) => {
            token = respone.body.data.accessToken;
        });
    });
  
    before(() => {
        cy.request({
            method: "POST",
            url: `${baseURL}categories`,
            headers: {
                    Authorization: `Bearer ${token}`
                    },
            body:{
                name: "Minuman Seduh",
                description: "Berbagai Macam Produk Minuman Sachet Yang Perlu Diseduh"
                }
        }).then((respone) => {
            categoryId = respone.body.data.categoryId;
        });
    });

    it("Sukses menambahkan product baru", () => {
        const requestBody={
            category_id : `${categoryId}`,
            code: "M01",
            name: "Kopi ABC",
            price: 2000,
            cost: 1500,
            stock: 100
          };
        
        cy.request({
            method: "POST",
            url: `${baseURL}products`,
            headers: {
                    Authorization:`Bearer ${token}`
                    },
            body:requestBody
            }).then ((respone) => {
              expect(respone.status).to.eq(201);
              expect(respone.body.status).to.eq("success");
              expect(respone.body.message).to.eq("Product berhasil ditambahkan");
            });
    });


    it("Gagal menambahkan produk karena value price < cost", () => {
        const requestBody={
            category_id : `${categoryId}`,
            code: "M01",
            name: "Kopi ABC",
            price: 1400,
            cost: 1500,
            stock: 100
          };
        
        cy.request({
            method: "POST",
            url: `${baseURL}products`,
            headers: {
                    Authorization:`Bearer ${token}`
                    },
            body:requestBody,
            failOnStatusCode: false
            }).then ((respone) => {
              expect(respone.status).to.eq(400);
              expect(respone.body.status).to.eq("fail");
              expect(respone.body.message).to.eq("\"price\" must be greater than ref:cost");
            });
    });


    it("Gagal menambahkan produk karena body category_id kosong", () => {
        const requestBody={
            category_id : ``,
            code: "M01",
            name: "Kopi ABC",
            price: 2000,
            cost: 1500,
            stock: 100
          };
        
        cy.request({
            method: "POST",
            url: `${baseURL}products`,
            headers: {
                    Authorization:`Bearer ${token}`
                    },
            body:requestBody,
            failOnStatusCode: false
            }).then ((respone) => {
              expect(respone.status).to.eq(400);
              expect(respone.body.status).to.eq("fail");
              expect(respone.body.message).to.eq("\"category_id\" is not allowed to be empty");
            });
    });


    it("Gagal menambahkan produk karena body code kosong", () => {
        const requestBody={
            category_id : `${categoryId}`,
            code: "",
            name: "Kopi ABC",
            price: 2000,
            cost: 1500,
            stock: 100
          };
        
        cy.request({
            method: "POST",
            url: `${baseURL}products`,
            headers: {
                    Authorization:`Bearer ${token}`
                    },
            body:requestBody,
            failOnStatusCode: false
            }).then ((respone) => {
              expect(respone.status).to.eq(400);
              expect(respone.body.status).to.eq("fail");
              expect(respone.body.message).to.eq("\"code\" is not allowed to be empty");
            });
    });


    it("Gagal menambahkan produk karena body name kosong", () => {
        const requestBody={
            category_id : `${categoryId}`,
            code: "M01",
            name: "",
            price: 2000,
            cost: 1500,
            stock:100
          };
        
        cy.request({
            method: "POST",
            url: `${baseURL}products`,
            headers: {
                    Authorization:`Bearer ${token}`
                    },
            body:requestBody,
            failOnStatusCode: false
            }).then ((respone) => {
              expect(respone.status).to.eq(400);
              expect(respone.body.status).to.eq("fail");
              expect(respone.body.message).to.eq("\"name\" is not allowed to be empty");
            });
    });

    it("Gagal menambahkan produk karena body price kosong", () => {
        const requestBody={
            category_id : `${categoryId}`,
            code: "M01",
            name: "Kopi ABC",
            price: "",
            cost: 1500,
            stock: 100
          };
        
        cy.request({
            method: "POST",
            url: `${baseURL}products`,
            headers: {
                    Authorization:`Bearer ${token}`
                    },
            body:requestBody,
            failOnStatusCode: false
            }).then ((respone) => {
              expect(respone.status).to.eq(400);
              expect(respone.body.status).to.eq("fail");
              expect(respone.body.message).to.eq("\"price\" must be a number");
            });
    });

    it("Gagal menambahkan produk karena body coast kosong", () => {
        const requestBody={
            category_id : `${categoryId}`,
            code: "M01",
            name: "Kopi ABC",
            price: 2000,
            cost: "",
            stock: 100
          };
        
        cy.request({
            method: "POST",
            url: `${baseURL}products`,
            headers: {
                    Authorization:`Bearer ${token}`
                    },
            body:requestBody,
            failOnStatusCode: false
            }).then ((respone) => {
              expect(respone.status).to.eq(400);
              expect(respone.body.status).to.eq("fail");
              expect(respone.body.message).to.eq("\"cost\" must be a number");
            });
    });



    it("Gagal menambahkan produk karena body stock kosong", () => {
        const requestBody={
            category_id : `${categoryId}`,
            code: "M01",
            name: "Kopi ABC",
            price: 1600,
            cost: 1500,
            stock: ""
          };
        
        cy.request({
            method: "POST",
            url: `${baseURL}products`,
            headers: {
                    Authorization:`Bearer ${token}`
                    },
            body:requestBody,
            failOnStatusCode: false
            }).then ((respone) => {
              expect(respone.status).to.eq(400);
              expect(respone.body.status).to.eq("fail");
              expect(respone.body.message).to.eq("\"stock\" must be a number");
            });
    });
})