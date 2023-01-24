import { Test, TestingModule } from '@nestjs/testing';
import { TripsService } from '../service/trips.service';
import { TripsRepository } from '../trips.repository';
import { Trip } from '@prisma/client';
import { RouteNotFoundException } from '../../road-distance/exception/route-not-found.exception';

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

const mockRoadDistanceService = () => ({
  getDistance: jest.fn(),
});

const mockTripsRepository = () => ({
  createTrip: jest.fn(),
});

describe('TripsService', () => {
  let service: TripsService;
  let roadDistanceService: any;
  let tripsRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripsService,
        {
          provide: 'ROAD_DISTANCE_SERVICE',
          useFactory: mockRoadDistanceService,
        },
        { provide: TripsRepository, useFactory: mockTripsRepository },
      ],
    }).compile();

    service = module.get<TripsService>(TripsService);
    roadDistanceService = module.get('ROAD_DISTANCE_SERVICE');
    tripsRepository = module.get(TripsRepository);
  });

  describe('createTrip', () => {
    it('resolves Trip if tripsRepository.createTrip resolves Trip', async () => {
      roadDistanceService.getDistance.mockResolvedValue(1000);

      tripsRepository.createTrip.mockResolvedValue(exampleTrip);

      const result = await service.createTrip(exampleCreateTripDto);
      expect(tripsRepository.createTrip).toBeCalledWith({
        ...exampleCreateTripDto,
        distance: 1000,
        date: new Date('2022-01-01'),
      });
      expect(result).toEqual(exampleTrip);
    });

    it('throws RouteNotFoundException if roadDistanceService.getDistance throws RouteNotFoundException', async () => {
      roadDistanceService.getDistance.mockImplementation(() => {
        throw new RouteNotFoundException();
      });

      expect(service.createTrip(exampleCreateTripDto)).rejects.toThrow(
        RouteNotFoundException,
      );
    });
  });
});
