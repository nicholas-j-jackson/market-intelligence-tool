import supertest from 'supertest';
import createServer from '../createServer.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { Location } from '../models/locationModel.js';

// Mock server to be used with supertest

const app = createServer();

// Test data payloads

const locationPayload1 = {
    store_id: 146,
    reference: "1029",
    address: "56 Chambers Bridge Road",
    city: "Brick",
    state: "NJ",
    zip: 8723,
    latitude: 40.057441,
    longitude: -74.138842,
    type: "mike"
}

const locationPayload2 = {
    store_id: 137,
    reference: "1016",
    address: "2275 West County Line Road",
    city: "Jackson",
    state: "NJ",
    zip: 8527,
    latitude: 40.12695,
    longitude: -74.27108,
    type: "mike"
}

const locationPayload3 = {
    store_id: 150,
    reference: "1002",
    address: "2556 East Country Road",
    city: "Jersey City",
    state: "NJ",
    zip: 8527,
    latitude: 44.12695,
    longitude: -76.27108,
    type: "wendys"
}


describe('location tests', ()=> {
    beforeAll(async () => {
        // Connect to mock database server
        const mongoServer = await MongoMemoryServer.create()
        await mongoose.connect(mongoServer.getUri());

        // Fill the mock database with 3 mock items
        let newLocation1 = new Location(locationPayload1);
        let newLocation2 = new Location(locationPayload2);
        let newLocation3 = new Location(locationPayload3);
        await newLocation1.save();
        await newLocation2.save();
        await newLocation3.save();
    })

    afterAll(async () => {
        // Disconnect and clear mock database server
        await mongoose.disconnect();
        await mongoose.connection.close();
    })

    describe('get single location object', () => {
        describe('given location does not exist', () => {
            it('should return null', async () => {
                const fake_type = 'mikes';
                const fake_store_id = 123;
                await supertest(app).get(`/locations/type_id/${fake_type}/${fake_store_id}`).expect(null);
            })
        })
        describe('given location does exist', () => {
            it('should return 200 status and location information', async () => {
                const {body, statusCode} = await supertest(app).get(`/locations/type_id/${locationPayload1.type}/${locationPayload1.store_id}`);
                expect(body.store_id).toBe(locationPayload1.store_id);
                expect(body.reference).toBe(locationPayload1.reference);
                expect(body.address).toBe(locationPayload1.address);
                expect(body.city).toBe(locationPayload1.city);
                expect(body.state).toBe(locationPayload1.state);
                expect(body.zip).toBe(locationPayload1.zip);
                expect(body.latitude).toBe(locationPayload1.latitude);
                expect(body.longitude).toBe(locationPayload1.longitude);
                expect(body.type).toBe(locationPayload1.type);
                expect(statusCode).toBe(200);
            })
        })
    })
    describe('getting locations by type and state', () => {
        describe('getting both jersey mikes in NJ', () => {
            it('should return 2 locations', async () => {
                const {body, statusCode} = await supertest(app).get(`/locations/type_state/${locationPayload1.type}/${locationPayload1.state}`);
                expect(body.length).toBe(2);
                expect(body[0].store_id).toBe(146);
                expect(body[1].store_id).toBe(137);
                expect(statusCode).toBe(200);
            })
        })
        describe('no given locations in given state', () => {
            it('should return empty array', async () => {
                const fake_type = 'mikes';
                const fake_store_id = 123;
                await supertest(app).get(`/locations/type_state/${fake_type}/${fake_store_id}`).expect('[]');
            })
        })
    })
    describe('getting locations by state', () => {
        describe('getting all locations in NJ', () => {
            it('should return 3 locations', async () => {
                const {body, statusCode} = await supertest(app).get(`/locations/state/${"NJ"}`);
                expect(body.length).toBe(3);
                expect(body[0].store_id).toBe(146);
                expect(body[1].store_id).toBe(137);
                expect(body[2].store_id).toBe(150);
                expect(statusCode).toBe(200);
            })
        })
        describe('no locations in given state', () => {
            it('should return empty array', async () => {
                await supertest(app).get(`/locations/state/${"NY"}`).expect('[]');
            })
        })
    })
    describe('getting locations by zip code', () => {
        describe('getting all locations in 8527', () => {
            it('should return 2 locations', async () => {
                const {body, statusCode} = await supertest(app).get(`/locations/zip/${8527}`);
                expect(body.length).toBe(2);
                expect(body[0].store_id).toBe(137);
                expect(body[1].store_id).toBe(150);
                expect(statusCode).toBe(200);
            })
        })
        describe('no locations in given zip code', () => {
            it('should return empty array', async () => {
                await supertest(app).get(`/locations/state/${9000}`).expect('[]');
            })
        })
    })
    describe ('getting all location objects', ()=> {
        it('should return all 3 location', async () => {
            const {body, statusCode} = await supertest(app).get(`/locations`)
            expect(body.length).toBe(3);
            expect(body[0].store_id).toBe(146);
            expect(body[1].store_id).toBe(137);
            expect(body[2].store_id).toBe(150);
            expect(statusCode).toBe(200);
        })
    })

});