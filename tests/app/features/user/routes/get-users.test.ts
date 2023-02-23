import supertest from "supertest";

import app from '../../../../../src/main/config/app';

describe("GET- users", () => {
    test('Deve retornar um array como resposta', async () => {
        
        const response = await supertest(app).get('/users');

        expect(response.body).toBe([]);
    })
})