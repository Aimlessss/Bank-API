import request from 'supertest';
//import express from 'express';

import app from "./index";

describe("GET /getaccsummary", () => {
    it('resopose ', async () => {
      const response = await request(app).get('/getaccsummary');
      expect(response.status).toBe(200);
      
    });
  });


describe("GET /account/:id", () => {
  it('resopose ', async () => {
    const response = await request(app).get('/account/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('accType');
    expect(response.body).toHaveProperty('Data_Acc_created');
    expect(response.body).toHaveProperty('balance');
    expect(response.body).toHaveProperty('Nooftransaction');
  });

});

describe("GET /account/getfiltertransaction/:start/:end", () => {
  it("responds with filtered transactions", async () => {
    const response = await request(app).get("/account/getfiltertransaction/2019-01-16/2021-01-16");
    expect(response.status).toBe(200);
    for (const transaction of response.body) {
      expect(transaction).toHaveProperty('id');
      expect(transaction).toHaveProperty('amount');
      expect(transaction).toHaveProperty('transactiontime');
    }
  });
});


describe("GET /accounts/:start/:end",()=>{
  it("resposne with accounts which are created between start date and end date",async()=>{
    const response = await request(app).get("/accounts/2018-01-16/2021-01-16");
    expect(response.status).toBe(200);
    for(const transaction of response.body){
      expect(transaction).toHaveProperty('id');
      expect(transaction).toHaveProperty('name');
      expect(transaction).toHaveProperty('accType');
      expect(transaction).toHaveProperty('email');
      expect(transaction).toHaveProperty('Data_Acc_created');
      expect(transaction).toHaveProperty('balance');
    }
  })
})



describe("POST /createnewaccount", () => {
  it('response with new account', async()=>{
    const newAccount = {
      name : "atharva",
      accType : "Current",
      email : "ath@gmail.com",
      password : "abc"
    }
    const response = await request (app).post('/createnewaccount').send(newAccount);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('accType');
    expect(response.body).toHaveProperty('email');
  }) 
});

describe("POST /account/:id/deposite" ,()=>{
  it('respose with deposited amount ', async()=>{
    
    const input = {
      id : 1,
      amount : 200
    }
    const response = await  request(app).post('/account/1/deposite').send(input);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('accType');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('Data_Acc_created');
    expect(response.body).toHaveProperty('balance');
    expect(response.body).toHaveProperty('Nooftransaction');
  })
})

describe("POST /account/:id/withdraw" ,()=>{
  it('respose with withdrawed amount ', async()=>{
    
    const input = {
      id : 1,
      amount : 200
    }
    const response = await  request(app).post('/account/1/withdraw').send(input);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('accType');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('Data_Acc_created');
    expect(response.body).toHaveProperty('balance');
    expect(response.body).toHaveProperty('Nooftransaction');
  })
})
describe("GET /gettraans", () => {
  it('resopose with  all transactions ', async () => {
    const response  = await request(app).get("/gettraans");
    expect(response.status).toBe(200);
    for(const transaction of response.body){
      expect(transaction).toHaveProperty('id');
      expect(transaction).toHaveProperty('transactiontime');
      expect(transaction).toHaveProperty('amount');
    }
  });
});

describe("GET /account/getfiltertransaction/:id/:start/:end",()=>{
  it("should response with filter transaction to specific id", async()=>{
    const response = await request(app).get('/account/getfiltertransaction/1/2015-01-16/2017-01-16');
    expect(response.status).toBe(200);
    for(const transaction of response.body){
      expect(transaction).toHaveProperty('id');
      expect(transaction).toHaveProperty('transactiontime');
      expect(transaction).toHaveProperty('amount');
    }
  })
})

describe("DELETE /account/delete/:id",()=>{
  it('response with deleted files', async()=>{
    const resopose = await request(app).delete('/account/delete/1');
    expect(resopose.status).toBe(200);
  })
})