describe('Test API', () => {
    const baseURL = "https://kasir-api.belajarqa.com/";
      let token;
      let categoryId;
      let productsId;
      let officeId;
      let customerId;
      let saleId;



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

        before(() => {
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
            saleId = respone.body.data.saleId
            });
        });


    it("Berhasil mendapatkan data penjualan", () => {
        cy.request({
            method: "GET",
            url: `${baseURL}sales/${saleId}`,
            headers: {
                    Authorization: 'Bearer ' + token
                    }
            })
            .then ((respone) => {
              expect(respone.status).to.eq(200)
              
            })
    });
})