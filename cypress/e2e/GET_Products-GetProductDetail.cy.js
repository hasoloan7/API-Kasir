describe('Kasir API', () => {

    const baseURL = "https://kasir-api.belajarqa.com/";
      let token;
      let categoryId;
      let productsId;


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
                      })
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
      
      it("Berhasil mendapatkan detail product", () => {
          
          cy.request({
              method: "GET",
              url: `${baseURL}products/${productsId}`,
              headers: {
                      Authorization: 'Bearer ' + token
                      }
              })
              .then ((respone) => {
                expect(respone.status).to.eq(200);
                expect(respone.body.status).to.eq("success");
                expect(respone.body.data.product.code).to.eq("M01")
                
              })
      });
  })