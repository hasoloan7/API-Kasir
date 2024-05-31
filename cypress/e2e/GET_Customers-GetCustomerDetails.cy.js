
describe('Kasir API', () => {

  const baseURL = "https://kasir-api.belajarqa.com/";
    let token;
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
                    })
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
    
    it("Berhasil mendapatkan detail costumer", () => {
        
        cy.request({
            method: "GET",
            url: `${baseURL}customers/${customerId}`,
            headers: {
                    Authorization: 'Bearer ' + token
                    }
            })
            .then ((respone) => {
              expect(respone.status).to.eq(200)
              
            })
    });
})