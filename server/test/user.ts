import app from '../config';
import * as request from 'supertest';
import * as assert from 'assert';

import { Promise } from 'es6-promise';
import { ConnectionFactory } from "../db/connectionFactory";

const DatabaseCleaner = require('database-cleaner');

describe('#UserController', () => {
    const databaseCleaner = new DatabaseCleaner('mysql');
    const server = request.agent(app); //para poder manter salvo os cookies com as sessoes da requisao nas proximas requisições, para realizar validacao de autenticação de login

    function createUser(): Promise<any> {
        return new Promise(resolve => {
            server.post('/save').send({
                email: 'teste@yahoo.com.br',
                password: '123456',
                type: 0
            }).expect(200).end((err, result) => {
                resolve(result.body.id)
            })
        })
    }

    function autenthication(): Promise<any> {
        return new Promise(resolve => {
            server.post('/login').send({
                email: 'teste@yahoo.com.br',
                password: '123456'
            }).expect(200).end((err, result) => {
                resolve(result.body.data)
            })
        })
    }

    beforeEach((done) => {
        databaseCleaner.clean(ConnectionFactory.call(), done)
    });

    after(function (done) {
        databaseCleaner.clean(ConnectionFactory.call(), done)
    });

    it('POST save valid', (done) => {
        request(app).post('/save').send({
            email: 'teste@yahoo.com.br',
            password: '123456',
            type: 0
        }).expect(200).end((err, result) => {
            assert.equal(result.body.success, true);
            done();
        });
    });

    it('POST save invalid', (done) => {
        request(app).post('/save').send({
            email: 'teste@yahoo.com.br',
            password: '123',
            type: 0
        }).expect(200).end((err, result) => {
            assert.equal(result.body.success, false);
            done();
        });
    });

    it('POST update valid', (done) => {
        createUser().then((resolve) => {
            request(app).post('/update-user/' + resolve).send({
                type: 1,
            }).expect(200).end((err, result) => {
                assert.equal(result.body.success, true);
                done();
            });
        })
    });

    it('POST update invalid', (done) => {
        createUser().then((resolve) => {
            request(app).post('/update-user/' + resolve).send({
                type: 1,
            }).expect(200).end((err, result) => {
                assert.equal(result.body.success, true);
                done();
            });
        })
    });

    it('POST login valid', (done) => {
        createUser().then(() => {
            request(app).post('/login').send({
                email: 'teste@yahoo.com.br',
                password: '123456'
            }).expect(200).end((err, result) => {
                assert.equal(result.body.success, true);
                done();
            })
        })
    });

    it('POST login invalid', (done) => {
        createUser().then(() => {
            request(app).post('/login').send({
                email: 'teste2@yahoo.com.br',
                password: '123456'
            }).expect(200).end((err, result) => {
                assert.equal(result.body.success, false);
                done();
            })
        })
    });

    it('GET show-users success', function (done) {
        createUser().then(() => autenthication()).then(() => {
            server.get('/show-users').expect(200).end((err, result) => {
                assert.equal(result.body.success, true);
                done();
            });
        })
    });

    it('GET show-users failed authentication', function (done) {
        let serverWithouCredentials = request.agent(app); //apontando o request novamente sem o armazenamento do cookies de session do login

        createUser().then(() => autenthication()).then(() => {
            serverWithouCredentials.get('/show-users').expect(200).end((err, result) => {
                assert.equal(result.body.logado, false);
                done();
            });
        })
    });

    it('GET show-user by id success', function (done) {
        createUser().then((resolve) => autenthication()).then((resolve) => {
            server.get('/show-user/' + resolve).expect(200).end((err, result) => {
                assert.equal(result.body.success, true);
                done();
            });
        })
    });

    it('GET show-user by id invalid', function (done) {
        createUser().then((resolve) => autenthication()).then((resolve) => {
            server.get('/show-user/' + '01').expect(200).end((err, result) => {
                assert.equal(result.body.success, false);
                done();
            });
        })
    });

    it('GET show-user by id failed authentication', function (done) {
        let serverWithouCredentials = request.agent(app); //apontando o request novamente sem o armazenamento do cookies de session do login

        createUser().then((resolve) => autenthication()).then((resolve) => {
            serverWithouCredentials.get('/show-user/' + resolve).expect(200).end((err, result) => {
                assert.equal(result.body.logado, false);
                done();
            });
        })
    });

    it('GET verify-user valid', (done) => {
        createUser().then(() => {
            server.get('/verify-user').expect(200).end((err, result) => {
                assert.equal(result.body.success, true);
                done();
            })
        })
    });

    it('GET verify-user failed authentication', (done) => {
        let serverWithouCredentials = request.agent(app); //apontando o request novamente sem o armazenamento do cookies de session do login

        createUser().then(() => {
            serverWithouCredentials.get('/verify-user').expect(200).end((err, result) => {
                assert.equal(result.body.logado, false);
                done();
            })
        })
    });

    it('GET logout', (done) => {
        request(app).get('/logout').expect(200).end((err, result) => {
            assert.equal(result.body.success, true);
            done();
        })
    });
});
