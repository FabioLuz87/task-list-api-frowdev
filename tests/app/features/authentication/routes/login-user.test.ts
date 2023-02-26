import supertest from "supertest";
import app from '../../../../../src/main/config/app';

describe('POST - /login', () => {
    test('deve retornar um 400 quando não for informado email na requisição', async () => {
        const response = await supertest(app).post('/login');

        expect(response.status).toBe(400)
    });

    // test('Deve retornar um 404 para usuário não encontrado', async () => {
        
    // })
});