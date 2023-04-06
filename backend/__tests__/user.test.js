import supertest from 'supertest';
import createServer from '../createServer.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
// Mock server to be used with supertest

const app = createServer();

const agent = supertest.agent(app);

const user1Payload = {
    username: "username1",
    password: "userPassword1",
    first_name: "John",
    last_name: "Doe",
    email: "user1@gmail.com"
}

const user2Payload = {
    username: "username2",
    password: "userPassword2",
    first_name: "Jane",
    last_name: "Smith",
    email: "user2@gmail.com"
}

const dupUsername1Payload = {
    username: "username1",
    password: "dupUserPassword1",
    first_name: "John B.",
    last_name: "Doe",
    email: "dupUser1@gmail.com"
}

const dupEmail1Payload = {
    username: "new_username1",
    password: "dupUserPassword1",
    first_name: "John B.",
    last_name: "Doe",
    email: "user1@gmail.com"
}

const invalidUser = {
    username: " ",
    password: " ",
    first_name: " ",
    last_name: " ",
    email: " "
}

describe('user tests', ()=> {
    beforeAll(async () => {
        // Connect to mock database server
        const mongoServer = await MongoMemoryServer.create()
        await mongoose.connect(mongoServer.getUri());

    })

    afterAll(async () => {
        // Disconnect and clear mock database server
        await mongoose.disconnect();
        await mongoose.connection.close();
    })

    // '/api/users/create'
    // '/api/users/login'
    describe('Test user creation and login POST requests', () => {
        it('adding first user, should succeed', async () => {
           await supertest(app).post('/api/users/create').send(user1Payload)
            .expect(200).then(res => {
                expect(res.body).toBe("User added!");
            })
        })
        it('should login user 1 successfully', async () => {
            await supertest(app).post('/api/users/login').send({username: user1Payload.username, password: user1Payload.password})
            .expect(200).then(res => {
                expect(res.body.status).toBe("login_successful");
                expect(res.body.account_data.username).toBe(user1Payload.username);
            })
        })
        it('incorrect password for user 1, should fail', async () => {
            const password = "wrong_password";
            await supertest(app).post('/api/users/login').send({username: user1Payload.username, password: password})
            .expect(200).then(res => {
                expect(res.body.status).toBe("incorrect_password");
            })
        })
        it('incorrect username for user 1, should fail', async () => {
            const username = "wrong_username";
            await supertest(app).post('/api/users/login').send({username: username, password: user1Payload.password})
            .expect(200).then(res => {
                expect(res.body.status).toBe("user_does_not_exist");
            })
        })
        it('adding second user, should succeed', async () => {
            await supertest(app).post('/api/users/create').send(user2Payload)
             .expect(200).then(res => {
                 expect(res.body).toBe("User added!");
             })
         })
        it('invalid user, should fail', async () => {
            await supertest(app).post('/api/users/create').send(invalidUser)
            .expect(400);
         })
        it('duplicate username, should fail', async () => {
            await supertest(app).post('/api/users/create').send(dupUsername1Payload)
             .expect(200).then(res => {
                 expect(res.body.message).toBe("A user already exists with the given username or email.");
                 expect(res.body.status).toBe("duplicate_username_or_email");
             })
         })
         it('duplicate email, should fail', async () => {
            await supertest(app).post('/api/users/create').send(dupEmail1Payload)
             .expect(200).then(res => {
                 expect(res.body.message).toBe("A user already exists with the given username or email.");
                 expect(res.body.status).toBe("duplicate_username_or_email");
             })
         })
         it('duplicate username and email, should fail', async () => {
            await supertest(app).post('/api/users/create').send(user1Payload)
             .expect(200).then(res => {
                 expect(res.body.message).toBe("A user already exists with the given username or email.");
                 expect(res.body.status).toBe("duplicate_username_or_email");
             })
         })
         
    })

    // '/api/users'
    // '/api/users/:username'
    describe('Test account retrieval GET requests', () => {
        it('should retrieve user1', async () => {
            const {body, statusCode} = await supertest(app).get(`/api/users/${user1Payload.username}`);
            
            // test password is successfully hashed
            let hashed_password = user1Payload.password;
            const saltRounds = 10;
            bcrypt.hash(user1Payload.password, saltRounds).then(hashed=>{hashed_password=hashed})

            expect(body.username).toBe(user1Payload.username);
            expect(hashed_password).toBe(user1Payload.password);
            expect(body.first_name).toBe(user1Payload.first_name);
            expect(body.last_name).toBe(user1Payload.last_name);
            expect(body.email).toBe(user1Payload.email);
            expect(statusCode).toBe(200);
        })
        it('should retrieve both users', async () => {
            const {body, statusCode} = await supertest(app).get('/api/users/');
            
            // test password is successfully hashed
            let hashed_password = user1Payload.password;
            const saltRounds = 10;
            bcrypt.hash(user1Payload.password, saltRounds).then(hashed=>{hashed_password=hashed})

            expect(body[0].username).toBe(user1Payload.username);
            expect(hashed_password).toBe(user1Payload.password);
            expect(body[0].first_name).toBe(user1Payload.first_name);
            expect(body[0].last_name).toBe(user1Payload.last_name);
            expect(body[0].email).toBe(user1Payload.email);
            expect(statusCode).toBe(200);

            // test password is successfully hashed
            let hashed_password2 = user2Payload.password;
            bcrypt.hash(user2Payload.password, saltRounds).then(hashed=>{hashed_password2=hashed})

            expect(body[1].username).toBe(user2Payload.username);
            expect(hashed_password2).toBe(user2Payload.password);
            expect(body[1].first_name).toBe(user2Payload.first_name);
            expect(body[1].last_name).toBe(user2Payload.last_name);
            expect(body[1].email).toBe(user2Payload.email);
            expect(statusCode).toBe(200);
        })
        it('invalid user, should fail', async () => {
            const fake_username = "fake_username";
            const {body, statusCode} = await supertest(app).get(`/api/users/${fake_username}`);
            
            expect(body).toBe(null);
        })
    })

});