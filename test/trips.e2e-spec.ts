import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma.service';
import { CreateTripDto } from '../src/trips/dto/create-trip.dto';
import { getDateString } from './helpers';

describe('TripsController  (e2e)', () => {
  let app: INestApplication;
  let database: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();

    database = moduleFixture.get(PrismaService);
  });

  beforeEach(async () => {
    await database.trip.deleteMany();
  });

  describe('/trips (POST)', () => {
    it('creates new trip if input data are valid', async () => {
      const now = new Date();

      const mockPayload: CreateTripDto = {
        start_address: 'Warszawa',
        destination_address: 'Nowy Targ',
        price: 7500,
        date: getDateString(now),
      };

      return request(app.getHttpServer())
        .post('/trips')
        .query(mockPayload)
        .expect(201)
        .expect(async (response: request.Response) => {
          const { distance } = response.body;
          expect(typeof distance).toBe('string');
          expect(distance).toContain('km');

          const tripsCount = await database.trip.count();
          expect(tripsCount).toBe(1);

          const createdTrip = await database.trip.findFirst();
          expect(createdTrip).toBeDefined();
          expect(createdTrip).not.toBeNull();
          expect(createdTrip.start_address).toBe(mockPayload.start_address);
          expect(createdTrip.destination_address).toBe(
            mockPayload.destination_address,
          );
          expect(createdTrip.price).toBe(mockPayload.price);
          expect(createdTrip.date.getUTCFullYear()).toBe(now.getUTCFullYear());
          expect(createdTrip.date.getUTCMonth()).toBe(now.getUTCMonth());
          expect(createdTrip.date.getUTCDate()).toBe(now.getUTCDate());
        });
    });

    it('returns 400 status code if input data are invalid', () => {
      const mockPayload = {
        start_address: '',
        destination_address: 'Nowy Targ',
        price: 7500,
        date: getDateString(new Date()),
      };

      return request(app.getHttpServer())
        .post('/trips')
        .query(mockPayload)
        .expect(400);
    });

    it('returns 400 status code if distance cannot be calculated', () => {
      const mockPayload = {
        start_address: 'Some Unknown location',
        destination_address: 'Nowy Targ',
        price: 7500,
        date: getDateString(new Date()),
      };

      return request(app.getHttpServer())
        .post('/trips')
        .query(mockPayload)
        .expect(400);
    });
  });
});
