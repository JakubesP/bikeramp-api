import { Test, TestingModule } from '@nestjs/testing';
import { TripsController } from '../controller/trips.controller';
import { TripsService } from '../service/trips.service';
import { RouteNotFoundException } from '../exceptions/route-not-found.exception';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Trip } from '@prisma/client';

const exampleCreateTripDto = {
  start_address: 'some_start_address',
  destination_address: 'some_destination_address',
  date: '2022-01-01',
  price: 1000,
};

const exampleTrip: Trip = {
  date: new Date('2022-01-01'),
  destination_address: 'some_destination_address',
  start_address: 'some_start_address',
  distance: 1000,
  id: 'a7fcd2d1-edfd-4296-8792-5caceba04a22',
  price: 1000,
};

const mockTripsService = () => ({
  createTrip: jest.fn(),
});

describe('TripsController', () => {
  let controller: TripsController;
  let tripsService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripsController],
      providers: [{ provide: TripsService, useFactory: mockTripsService }],
    }).compile();

    controller = module.get<TripsController>(TripsController);
    tripsService = module.get(TripsService);
  });

  describe('createTrip', () => {
    it('resolves CreateTripResponseDto if tripsService.createTrip resolves Trip', async () => {
      tripsService.createTrip.mockResolvedValue(exampleTrip);

      const result = await controller.createTrip(exampleCreateTripDto);
      expect(tripsService.createTrip).toBeCalledWith(exampleCreateTripDto);
      expect(result).toEqual({ distance: '1.0km' });
    });

    it('throws BAD_REQUEST HttpException if tripsService.createTrip throws RouteNotFoundException', async () => {
      tripsService.createTrip.mockImplementation(() => {
        throw new RouteNotFoundException();
      });

      try {
        await controller.createTrip(exampleCreateTripDto);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect((error as HttpException).getStatus()).toBe(
          HttpStatus.BAD_REQUEST,
        );
      }
    });
  });
});
