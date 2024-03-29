import request from 'supertest';

import { app } from '@shared/infra/http/app';

import { v4 as uuidV4 } from 'uuid';

import { hash } from 'bcryptjs';

import { Connection } from 'typeorm';

import createConnection from '@shared/infra/typeorm';

let connection: Connection;
describe('Create category controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", "driverLicense", "createdAt")
        values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'XXXXXX','now()')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able create new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin',
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app).post('/categories').send({
      name: 'Category supertest',
      description: 'Description supertest',
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });

    expect(response.status).toBe(201);
  });

  it('Should not be able to create new category with name exists', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin',
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app).post('/categories').send({
      name: 'Category supertest',
      description: 'Description supertest',
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });

    expect(response.status).toBe(400); 
  })
})  
