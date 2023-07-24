const chai =  require("chai")
const chaihttp = require('chai-http')
const sinon =  require("sinon")
const app = require("../server.js")
const User =  require("../models/user")
const chaiHttp = require("chai-http")
chai.use(chaiHttp)
const expect =  chai.expect 


describe("User Registration", () => {
  beforeEach(() => {
    // Stub the User.create() method to prevent actual database operations during testing
    sinon.stub(User, "create").resolves({});
  });

  afterEach(() => {
    // Restore the stubbed method after each test
    User.create.restore();
  });

  it("should register a new user", async () => {
    const userData = {
      Username: "John Doe",
      email: "john@example.com",
      password: "password123",
    };

    const res = await chai.request(app).post("/api/user/register").send(userData);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body.message).to.equal("User registered successfully");
  });

  it("should return an error for missing required fields", async () => {
    const userData = {
      name: "John Doe",
    };

    const res = await chai.request(app).post("/api/user/register").send(userData);

    expect(res).to.have.status(400);
    expect(res.body).to.be.an("object");
    expect(res.body.error).to.equal("Missing required fields");
  });
});
