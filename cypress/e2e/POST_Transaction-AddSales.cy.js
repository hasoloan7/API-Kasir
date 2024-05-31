describe('Kasir API', () => {
    const baseURL = "https://kasir-api.belajarqa.com/";
      let token;
      let categoryId;
      let productsId;
      let officeId;
      let customerId;



      before(() => {
          cy.request({
            method: "POST",
            url: `${baseURL}authentications`,
            body:{email: "tokokartiko@gmail.com",
                password: "passwordtokokartiko"
                }
            })
            .then ((respone) => {
            expect(respone.status).to.eq(201);
            token=respone.body.data.accessToken;
            officeId=respone.body.data.user.officeId
            })
      });

      before(() => {
        cy.request({
            method: "POST",
            url: `${baseURL}categories`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {
                name: "Minuman Seduh",
                description: "Berbagai Macam Produk Minuman Sachet Yang Perlu Diseduh"
            }
        }).then((respone) => {
            categoryId = respone.body.data.categoryId;
        });
        });

    
      before(() => {
        cy.request({
            method: "POST",
            url: `${baseURL}products`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {category_id : `${categoryId}`,
            code: "M01",
            name: "Kopi ABC",
            price: "2000",
            cost: "1500",
            stock: "100"
            }
        }).then((respone) => {
          productsId = respone.body.data.productId;
        });
        });


    before(() => {
        cy.request({
            method: "POST",
            url: `${baseURL}customers`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {
                name: "Kanai",
                phone: "089608440895",
                address: "Villa Bumi Sudimara, Blok C3/1",
                description: "Kanai Anabul Pak Roger"
            }
        }).then((respone) => {
          customerId = respone.body.data.customerId;
        });
        });


    it("Berhasil menambahkan penjualan", () => {
        const requestBody={
            officeId: `${officeId}`,
            customerId: `${customerId}`,
            date: "2023-07-24",
            invoice: "INVOICE_001",
            amount: 20000,
            discount: 0,
            description: "Kanai Beli Kopi",
            items : [
                {
                    productId: `${productsId}`,
                    quantity: 10,
                    price: 20000
                }
            ]
         }
         cy.request({
            method: "POST",
            url: `${baseURL}sales`,
            headers: {
                    Authorization:`Bearer ${token}`
                    },
            body:requestBody
        })
        .then ((respone) => {
        expect(respone.status).to.eq(201);
        expect(respone.body.status).to.eq("success");
        expect(respone.body.message).to.eq("transaksi ditambahkan");
        });
    });

    it("Gagal menambahkan penjualan karena body office id kosong", () => {
        const requestBody={
            officeId: ``,
            customerId: `${customerId}`,
            date: "2023-07-24",
            invoice: "INVOICE_001",
            amount: 20000,
            discount: 0,
            description: "Kanai Beli Kopi",
            items : [
                {
                    productId: `${productsId}`,
                    quantity: 10,
                    price: 20000
                }
            ]
         }
         cy.request({
            method: "POST",
            url: `${baseURL}sales`,
            headers: {
                    Authorization:`Bearer ${token}`
                    },
            body:requestBody,
            failOnStatusCode: false
        })
        .then ((respone) => {
        expect(respone.status).to.eq(400);
        expect(respone.body.status).to.eq("fail");
        expect(respone.body.message).to.eq("\"officeId\" is not allowed to be empty");
        });
    });


    it("Gagal menambahkan penjualan karena body custumerId kosong", () => {
        const requestBody={
            officeId: `${officeId}`,
            customerId: ``,
            date: "2023-07-24",
            invoice: "INVOICE_001",
            amount: 20000,
            discount: 0,
            description: "Kanai Beli Kopi",
            items : [
                {
                    productId: `${productsId}`,
                    quantity: 10,
                    price: 20000
                }
            ]
         }
         cy.request({
            method: "POST",
            url: `${baseURL}sales`,
            headers: {
                    Authorization:`Bearer ${token}`
                    },
            body:requestBody,
            failOnStatusCode: false
        })
        .then ((respone) => {
        expect(respone.status).to.eq(400);
        expect(respone.body.status).to.eq("fail");
        expect(respone.body.message).to.eq("\"customerId\" is not allowed to be empty");
        });
    });

    it("Gagal menambahkan penjualan karena body date kosong", () => {
        const requestBody={
            officeId: `${officeId}`,
            customerId: `${customerId}`,
            date: "",
            invoice: "INVOICE_001",
            amount: 20000,
            discount: 0,
            description: "Kanai Beli Kopi",
            items : [
                {
                    productId: `${productsId}`,
                    quantity: 10,
                    price: 20000
                }
            ]
         }
         cy.request({
            method: "POST",
            url: `${baseURL}sales`,
            headers: {
                    Authorization:`Bearer ${token}`
                    },
            body:requestBody,
            failOnStatusCode: false
        })
        .then ((respone) => {
        expect(respone.status).to.eq(400);
        expect(respone.body.status).to.eq("fail");
        expect(respone.body.message).to.eq("\"date\" must be a valid date");
        });
    });

    it("Gagal menambahkan penjualan karena body items kosong", () => {
        const requestBody={
            officeId: `${officeId}`,
            customerId: `${customerId}`,
            date: "2023-07-24",
            invoice: "INVOICE_001",
            amount: 20000,
            discount: 0,
            description: "Kanai Beli Kopi",
            items : [
                {
                   
                }
            ]
         }
         cy.request({
            method: "POST",
            url: `${baseURL}sales`,
            headers: {
                    Authorization:`Bearer ${token}`
                    },
            body:requestBody,
            failOnStatusCode: false
        })
        .then ((respone) => {
        expect(respone.status).to.eq(400);
        expect(respone.body.status).to.eq("fail");
        expect(respone.body.message).to.eq("\"items[0].productId\" is required");
        });
    });

})