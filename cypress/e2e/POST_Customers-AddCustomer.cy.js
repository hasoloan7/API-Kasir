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
                      expect(respone.status).to.eq(201);
                      token=respone.body.data.accessToken;
                    })
    });

    it("Berhasil menambahkan kostumer", () => {
        const requestBody={
            name: "Kanai",
            phone: "089608440895",
            address: "Villa Bumi Sudimara, Blok C3/1",
            description: "Kanai Anabul Pak Roger"
            }

            cy.request({
                method: "POST",
                url: `${baseURL}customers`,
                headers: {
                        Authorization: `Bearer ${token}`
                        },
                body:requestBody
                }).then ((respone) => {
                  expect(respone.status).to.eq(201);
                  expect(respone.body.status).to.eq("success");
                  expect(respone.body.message).to.eq("Customer berhasil ditambahkan");
                  
                });
    });

    it("Gagal menambahkan pelanggan baru karena body name kosong", () => {
        const requestBody={
            name: "",
            phone: "089608440895",
            address: "Villa Bumi Sudimara, Blok C3/1",
            description: "Kanai Anabul Pak Roger"
            }

            cy.request({
                method: "POST",
                url: `${baseURL}customers`,
                headers: {
                        Authorization:  `Bearer ${token}`
                        },
                body:requestBody,
                failOnStatusCode: false
                }).then ((respone) => {
                  expect(respone.status).to.eq(400);
                  expect(respone.body.status).to.eq("fail");
                  expect(respone.body.message).to.eq("\"name\" is not allowed to be empty");           
                });
    });

    it("Gagal menambahkan pelanggan baru karena body phone tipe data string", () => {
        const requestBody={
            name: "Kanai",
            phone: "kosong",
            address: "Villa Bumi Sudimara, Blok C3/1",
            description: "Kanai Anabul Pak Roger"
            }

            cy.request({
                method: "POST",
                url:  `${baseURL}customers`,
                headers: {
                        Authorization:  `Bearer ${token}`
                        },
                body:requestBody,
                failOnStatusCode: false
                }).then ((respone) => {
                  expect(respone.status).to.eq(400);
                  expect(respone.body.status).to.eq("fail");
                  expect(respone.body.message).to.eq("\"phone\" must be a number");
                 
                });
    });



    it("Gagal menambahkan pelanggan baru karena body phone tipe data string dan integer", () => {
        const requestBody={
            name: "Kanai",
            phone: "088sdskl",
            address: "Villa Bumi Sudimara, Blok C3/1",
            description: "Kanai Anabul Pak Roger"
            }

            cy.request({
                method: "POST",
                url:  `${baseURL}customers`,
                headers: {
                        Authorization:  `Bearer ${token}`
                        },
                body:requestBody,
                failOnStatusCode: false
                }).then ((respone) => {
                  expect(respone.status).to.eq(400);
                  expect(respone.body.status).to.eq("fail");
                  expect(respone.body.message).to.eq("\"phone\" must be a number");
                 
                });
    });

    it("Gagal menambahkan pelanggan baru karena body name,phone,address,description kosong", () => {
        const requestBody={
            name: "",
            phone: "",
            address: "",
            description: ""
            }

            cy.request({
                method: "POST",
                url:  `${baseURL}customers`,
                headers: {
                        Authorization:  `Bearer ${token}`
                        },
                body:requestBody,
                failOnStatusCode: false
                }).then ((respone) => {
                  expect(respone.status).to.eq(400);
                  expect(respone.body.status).to.eq("fail");
                  expect(respone.body.message).to.eq("\"name\" is not allowed to be empty");
                });
    })
})