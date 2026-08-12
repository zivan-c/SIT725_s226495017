const expect = require("chai").expect;
const request = require("request");

describe("Multiplication API", function () {
  const baseUrl = "http://localhost:3000";


  it("returns status code 200 if the api works", function(done) {
    request(baseUrl, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done()
        });
  });


  it("Proper behavior is to return the product of two valid numbers", function (done) {
    request.get(`${baseUrl}/multiply?a=3&b=9`, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.include("27"); //should return 27 as the result
      done();
    });
  });

  it("Proper behavior of returning a number multiplied by zero", function (done) {
    request.get(`${baseUrl}/multiply?a=0&b=42`, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.include("0"); // should return 0 as the result
      done();
    });
  });

  it("should correctly multiply negative numbers", function (done) {
    request.get(`${baseUrl}/multiply?a=-3&b=7`, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.include("-21"); //should return -21 as the result
      done();
    });
  });

  it("should correctly multiply decimal numbers", function (done) {
    request.get(`${baseUrl}/multiply?a=2.5&b=3`, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.include("7.5"); //should return 7.5 as the result
      done();
    });
  });


  it("Missing parameters should return error", function (done) {
    request.get(`${baseUrl}/multiply?a=6`, function (error, response, body) {
      expect(response.statusCode).to.not.equal(200);
      done();
    });
  });

  it("should return error for FULLY empty parameter values", function (done) {
    request.get(`${baseUrl}/multiply?a=&b=`, function (error, response, body) {
      expect(response.statusCode).to.not.equal(200);
      done();
    });
  });

  it("should return error for whitespace values", function (done) {
    request.get(`${baseUrl}/multiply?a= &b= `, function (error, response, body) {
      expect(response.statusCode).to.not.equal(200);
      done();
    });
  });
  
  it("should return error for special characters", function (done) {
    request.get(`${baseUrl}/multiply?a=@&b=!`, function (error, response, body) {
      expect(response.statusCode).to.not.equal(200);
      done();
    });
  });

  it("string inputs should return error", function (done) {
    request.get(`${baseUrl}/multiply?a=whats&b=up`, function (error, response, body) {
      expect(response.statusCode).to.not.equal(200);
      done();
    });
  });


});