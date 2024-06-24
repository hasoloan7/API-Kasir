
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
          body: {
              name: "Minuman Seduh",
              description: "Berbagai Macam Produk Minuman Sachet Yang Perlu Diseduh"
          }
      }).then((respone) => {
          categoryId = respone.body.data.categoryId;
      });
  });
  it("Berhasil menampilkan detail kategori yang baru ditambahkan", () => {
      cy.request({
          method: "GET",
          url: `${baseURL}categories/${categoryId}`,
          headers: {
              Authorization: `Bearer ${token}`
          }
      }).then((respone) => {
          expect(respone.status).to.eq(200);
          expect(respone.body.status).to.eq("success");
          ;
      });
  });
});
