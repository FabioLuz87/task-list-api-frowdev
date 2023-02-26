import supertest from "supertest";
import dataSource from "../../../../../src/main/database/database-connection";
import crypto from 'crypto';

import app from '../../../../../src/main/config/app';
import typeorm from "../../../../../src/main/database/database-connection";
import { UserRepository } from "../../../../../src/app/features/user/repositories/user.repository";
import { UserEntity } from "../../../../../src/app/shared/database/entities/user.entity";

describe("CRUD - users", () => {
    
    beforeAll(async () => {
        await typeorm.initialize();

    });

    test('Deve retornar um statusCode 400 ao tentar criar um user sem body', async () => {
        const response = await supertest(app).post('/user');
        
        expect(response.statusCode).toBe(400);
    });

    test('Deve retornar um statusCode 400 ao tentar criar um user sem email', async () => {
        const response = await supertest(app).post('/user').send(
            {
                name: 'any_name'
            }
        );
        
        expect(response.statusCode).toBe(400);
    });

    test('Deve retornar um statusCode 400 ao tentar criar um user sem pass', async () => {
        const response = await supertest(app).post('/user').send(
            {
                name: 'any_name',
                email: 'any_email@mail.com'
            }
        );
        
        expect(response.statusCode).toBe(400);
    });

    test('Deve criar um user e retornar um 201', async () => {
        const response = await supertest(app).post('/user').send(
            {
                name: 'any_name',
                email: 'any_email@mail.com',
                pass: '12345'
            }
        );
        
        await expect(response.statusCode).toBe(201);

        await dataSource.manager.delete(UserEntity, response.body.id)
    });

    test('Deve editar um user e retornar um stautsCode 200', async () => {

        const userEntity = await dataSource.manager.create(UserEntity, {
            id: crypto.randomUUID(),
            name: 'any_name',
            email: 'any_email@mail.com',
            pass: 'any_pass',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
        });

        await dataSource.manager.save(userEntity);

        const response = await supertest(app).put(`/user/${userEntity.id}`).send(
            {
                name: 'new_name',
                email: 'new_email@mail.com',
                pass: 'new'
            }
        );
        
        await expect(response.statusCode).toBe(200);

        await dataSource.manager.delete(UserEntity, response.body.id)
    });

    test('Deve pegar um user e retornar um stautsCode 200', async () => {

        const userEntity = await dataSource.manager.create(UserEntity, {
            id: crypto.randomUUID(),
            name: 'any_name',
            email: 'any_email@mail.com',
            pass: 'any_pass',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
        });

        await dataSource.manager.save(userEntity);

        const response = await supertest(app).get(`/user/${userEntity.id}`)
        
        await expect(response.statusCode).toBe(200);

        await dataSource.manager.delete(UserEntity, response.body.id)
    });

    test('Deve deletar um user e retornar um stautsCode 200', async () => {

        const userEntity = await dataSource.manager.create(UserEntity, {
            id: crypto.randomUUID(),
            name: 'any_name',
            email: 'any_email@mail.com',
            pass: 'any_pass',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
        });

        await dataSource.manager.save(userEntity);

        const response = await supertest(app).delete(`/user/${userEntity.id}`);
        
        await expect(response.statusCode).toBe(200);
    });

    test('Deve retornar um 422 ao tentar criar um usuário', async () => {
        const response = await supertest(app).post('/user').send(
            {
                name: 'any_name_com_mais_de_cinquenta_caracteres_para_nao_funcionar',
                email: 'any_email@mail.com',
                pass: '12345'
            }
        );
        
        await expect(response.statusCode).toBe(422);
    });

    test('Deve retornar um valor não nulo', async () => {    

        const response = await supertest(app).get('/users');     

        expect(response.body).toBeTruthy();
    });

    afterAll(async () => {
        await typeorm.destroy();
    });
})