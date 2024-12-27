import * as chaiModule from 'chai';
import chaiHttp from 'chai-http';
require('dotenv').config();

const { expect } = chaiModule;
const chai = chaiModule.use(chaiHttp);

const baseUrl = process.env.BASE_URL;
const email = process.env.EMAIL;
const passwordRegister = process.env.PASSWORD_REGISTER;
const passwordLogin = process.env.PASSWORD_LOGIN;
const nameUpdate = process.env.NAME_UPDATE;
const jobUpdate = process.env.JOB_UPDATE;

describe("Reqres API Test", () => {
	describe("GET /api/users/:id", () => {
    	it("should return a single user with valid id", async () => {
      		const res = await chai.request(baseUrl).get("/api/users/8");
      		expect(res).to.have.status(200);
      		expect(res.body.data).to.have.property("id", 8);
    	});

    	it("should return 404 for an invalid user id", async () => {
      		const res = await chai.request(baseUrl).get("/api/users/27");
     	 	expect(res).to.have.status(404);
    	});
  });

  	describe("POST /api/register", () => {
		it("should register successfully with valid data", async () => {
			const res = await chai
				.request(baseUrl)
				.post("/api/register")
				.send({ email: email, password: passwordRegister });
			expect(res).to.have.status(200);
			expect(res.body).to.have.property("id");
			expect(res.body).to.have.property("token");
		});

		it("should fail to register with missing data", async () => {
			const res = await chai
				.request(baseUrl)
				.post("/api/register")
				.send({ email: email });
			expect(res).to.have.status(400);
			expect(res.body).to.have.property("error", "Missing password");
		});
  });

  	describe("POST /api/login", () => {
		it("should login successfully with valid data", async () => {
			const res = await chai
				.request(baseUrl)
				.post("/api/login")
				.send({ email: email, password: passwordLogin });
			expect(res).to.have.status(200);
			expect(res.body).to.have.property("token");
		});

		it("should fail to login with missing data", async () => {
			const res = await chai
				.request(baseUrl)
				.post("/api/login")
				.send({ email: email });
			expect(res).to.have.status(400);
			expect(res.body).to.have.property("error", "Missing password");
		});
  });

  	describe("PATCH /api/users/:id", () => {
		it("should update user successfully with valid data", async () => {
			const res = await chai
				.request(baseUrl)
				.patch("/api/users/2")
				.send({ name: nameUpdate, job: jobUpdate });
			expect(res).to.have.status(200);
			expect(res.body).to.have.property("name",nameUpdate);
			expect(res.body).to.have.property("job", jobUpdate);
		});
  	});
});
