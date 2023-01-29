import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma.service';
import {
  getWeekRange,
  getDateAsString,
  getMonthRange,
} from '../src/util/dates';

describe('StatsController (e2e)', () => {
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

  describe('/stats/weekly (GET)', () => {
    it('returns weekly stats', async () => {
      const [firstWeekDate, secondWeekDate] = getWeekRange(new Date());

      await database.trip.createMany({
        data: [
          {
            date: firstWeekDate,
            start_address: 'Warszawa',
            destination_address: 'Nowy Targ',
            distance: 385400,
            price: 6700,
          },
          {
            date: firstWeekDate,
            start_address: 'Bolestraszyce',
            destination_address: 'Gdynia',
            distance: 744100,
            price: 10430,
          },
          {
            date: secondWeekDate,
            start_address: 'Wojnicz',
            destination_address: 'Nowy Targ',
            distance: 122900,
            price: 3000,
          },
        ],
      });

      return request(app.getHttpServer())
        .get('/stats/weekly')
        .expect(200)
        .expect((response: request.Response) => {
          const stats = response.body;
          expect(stats).toEqual({
            total_distance: '1252.4km',
            total_price: '201.30PLN',
          });
        });
    });

    it('returns 404 status code if there is no trips for current week', () => {
      return request(app.getHttpServer()).get('/stats/weekly').expect(404);
    });
  });

  describe('/stats/monthly (GET)', () => {
    it('returns monthly stats list', async () => {
      const [firstMonthDate, secondMonthDate] = getMonthRange(new Date());

      await database.trip.deleteMany();

      await database.trip.createMany({
        data: [
          {
            date: firstMonthDate,
            start_address: 'Warszawa',
            destination_address: 'Nowy Targ',
            distance: 385400,
            price: 6700,
          },
          {
            date: firstMonthDate,
            start_address: 'Bolestraszyce',
            destination_address: 'Gdynia',
            distance: 744100,
            price: 10430,
          },
          {
            date: secondMonthDate,
            start_address: 'Wojnicz',
            destination_address: 'Nowy Targ',
            distance: 122900,
            price: 3000,
          },
        ],
      });

      return request(app.getHttpServer())
        .get('/stats/monthly')
        .expect(200)
        .expect((response: request.Response) => {
          const stats = response.body;

          expect(stats.length).toBe(2);

          expect(stats).toEqual(
            expect.arrayContaining([
              {
                day: getDateAsString(firstMonthDate),
                total_distance: '1129.5km',
                avg_ride: '564.8km',
                avg_price: '85.65PLN',
              },
            ]),
          );
          expect(stats).toEqual(
            expect.arrayContaining([
              {
                day: getDateAsString(secondMonthDate),
                total_distance: '122.9km',
                avg_ride: '122.9km',
                avg_price: '30.00PLN',
              },
            ]),
          );
        });
    });
  });
});
