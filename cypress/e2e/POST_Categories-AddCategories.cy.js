describe('Kasir API', () => {
  const baseURL = "https://kasir-api.belajarqa.com/";    
  let token;

    before(() => {
        cy.request({
                    method: "POST",
                    url: `${baseURL}authentications`,
                    body:{email: "tokokartiko@gmail.com",
                    password: "passwordtokokartiko"
                    }
                    })
                    .then ((respone) => {
                      token=respone.body.data.accessToken;
                    })
    });


    it("Berhasil menambahkan kategori baru", () => {
      const requestBody={
                        name: "Minuman Seduh",
                        description: "Berbagai Macam Produk Minuman Sachet Yang Perlu Diseduh"
                      };
        
        cy.request({
            method: "POST",
            url: `${baseURL}categories`,
            headers: {
                Authorization: `Bearer ${token}`
                    },
            body:requestBody
            }).then ((respone) => {
              expect(respone.status).to.eq(201);
              expect(respone.body.status).to.eq("success");
              expect(respone.body.message).to.eq("Category berhasil ditambahkan");
            
            });
    });



    it("Gagal menambahkan kategori baru karena body name kosong", () => {

        const requestBody={
            name: "",
            description: "Berbagai Macam Produk Minuman Sachet Yang Perlu Diseduh"
          }
        
        cy.request({
            method: "POST",
            url: `${baseURL}categories`,
            headers: {
                Authorization:`Bearer ${token}`
                    },
            body:requestBody,
            failOnStatusCode: false
            })
            .then ((respone) => {
              expect(respone.status).to.eq(400)
              expect(respone.body.status).to.eq("fail")
              expect(respone.body.message).to.eq("\"name\" is not allowed to be empty")
            })
    });



it("Gagal menambahkan kategori baru karena body name dan description kosong", () => {

        const requestBody={
            name: "",
            description: ""
          }
        
        cy.request({
            method: "POST",
            url: `${baseURL}categories`,
            headers: {
                Authorization: `Bearer ${token}`
                    },
            body:requestBody,
            failOnStatusCode: false
            })
            .then ((respone) => {
              expect(respone.status).to.eq(400)
              expect(respone.body.status).to.eq("fail")
              expect(respone.body.message).to.eq("\"name\" is not allowed to be empty")
            })
    });


})