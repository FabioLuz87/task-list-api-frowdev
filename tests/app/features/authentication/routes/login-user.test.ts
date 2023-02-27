import supertest from "supertest";
import typeorm from "../../../../../src/main/database/database-connection";
import { UserEntity } from "../../../../../src/app/shared/database/entities/user.entity";
import app from '../../../../../src/main/config/app';
import dataSource from "../../../../../src/main/database/database-connection";
import crypto from 'crypto';

describe('POST - /login', () => {

    beforeAll(async () => {
        await typeorm.initialize();
    });

    test('deve retornar um 400 quando não for informado email na requisição', async () => {
        const response = await supertest(app).post('/login');

        expect(response.status).toBe(400);
    });

    test('Deve retornar o statusCode 200', async () => {
        
        const userEntity = await dataSource.manager.create(UserEntity, {
            id: crypto.randomUUID(),
            name: 'any_name',
            email: 'any_email@mail.com',
            pass: 'any_pass',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
        });

        await dataSource.manager.save(userEntity);

        const response = await supertest(app).post('/login').send({
            email: 'any_email@mail.com',
            pass: 'any_pass',
        });     

        await expect(response.statusCode).toBe(200);

        await dataSource.manager.delete(UserEntity, userEntity.id)
    });

    test('Deve retornar o statusCode 404', async () => {

        const userEntity = await dataSource.manager.create(UserEntity, {
            id: crypto.randomUUID(),
            name: 'any_name',
            email: 'any_email@mail.com',
            pass: 'any_pass',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
        });
        
        const response = await supertest(app).post('/login').send({
            email: 'any_email@mail.com',
            pass: 'diff_pass',
        });     

        await expect(response.statusCode).toBe(404);

        await dataSource.manager.delete(UserEntity, userEntity.id)

    });

    afterAll(async () => {
        await typeorm.destroy();
    });
});