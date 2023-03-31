import supertest from 'supertest';
import createServer from '../createServer.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { Price } from '../models/priceModel.js';

// Mock server to be used with supertest

const app = createServer();

// Test data payloads

const pricePayload1 = {
    store_id: 146,
    item: "Turkey Sub",
    size: "Medium",
    price: 9.99,
    type: "mikes",
    time: "3/28/23"      
}

const pricePayload2 = {
    store_id: 146,
    item: "Ham Sub",
    size: "Medium",
    price: 6.95,
    type: "mikes",
    time: "3/29/23"      
}

const pricePayload3 = {
    store_id: 200,
    item: "Baconator",
    size: "Medium",
    price: 8.99,
    type: "wendys",
    time: "3/30/23"  
}

describe('price tests', ()=> {
    beforeAll(async () => {
        // Connect to mock database server
        const mongoServer = await MongoMemoryServer.create()
        await mongoose.connect(mongoServer.getUri());

        // Fill the mock database with 3 mock items
        let newPrice1 = new Price(pricePayload1);
        let newPrice2 = new Price(pricePayload2);
        let newPrice3 = new Price(pricePayload3);
        await newPrice1.save();
        await newPrice2.save();
        await newPrice3.save();
    })

    afterAll(async () => {
        // Disconnect and clear mock database server
        await mongoose.disconnect();
        await mongoose.connection.close();
    })

    describe('get single price object', ()=> {
        describe('given price does not exist', () => {
            it('should return null', async () => {
                const fake_type = 'mikes';
                const fake_store_id = 123;
                const fake_item = 'Turkey Sub'
                await supertest(app).get(`/prices/type_id_item/${fake_type}/${fake_store_id}/${fake_item}`).expect(null)
            });
        });
        describe('given price does exist', () => {
            it('should return 200 status and price information', async () => {
                const {body, statusCode} = await supertest(app).get(`/prices/type_id_item/${pricePayload1.type}/${pricePayload1.store_id}/${pricePayload1.item}`)
                expect(body.item).toBe("Turkey Sub")
                expect(body.price).toBe(9.99)
                expect(body.type).toBe("mikes")
                expect(body.store_id).toBe(146)
                expect(statusCode).toBe(200);
            })
        })
    });
    describe('getting multiple price objects from one location', ()=> {
        describe('location with 2 items', () => {
            it('should return 200 status and 2 different prices objects', async () => {
                const {body, statusCode} = await supertest(app).get(`/prices/type_id/${pricePayload1.type}/${pricePayload1.store_id}`)
                expect(body[0].item).toBe("Turkey Sub")
                expect(body[0].price).toBe(9.99)
                expect(body[0].type).toBe("mikes")
                expect(body[0].store_id).toBe(146)
                expect(body[1].item).toBe("Ham Sub")
                expect(body[1].price).toBe(6.95)
                expect(body[1].type).toBe("mikes")
                expect(body[1].store_id).toBe(146)
                expect(statusCode).toBe(200);
            })
        })
        describe('location does not exist', () => {
            it('should return empty array', async () => {
                const fake_type = "Burger King";
                const fake_store_id = 123;
                await supertest(app).get(`/prices/type_id/${fake_type}/${fake_store_id}`).expect("[]")
            })
        })
    })
    describe ('getting all price objects', ()=> {
        it('should return all 3 price objects', async () => {
            const {body, statusCode} = await supertest(app).get(`/prices`)
            expect(body[0].item).toBe("Turkey Sub")
            expect(body[0].price).toBe(9.99)
            expect(body[0].type).toBe("mikes")
            expect(body[0].store_id).toBe(146)
            expect(body[1].item).toBe("Ham Sub")
            expect(body[1].price).toBe(6.95)
            expect(body[1].type).toBe("mikes")
            expect(body[1].store_id).toBe(146)
            expect(body[2].item).toBe("Baconator")
            expect(body[2].price).toBe(8.99)
            expect(body[2].type).toBe("wendys")
            expect(body[2].store_id).toBe(200)
            expect(statusCode).toBe(200);
        })
    })
});