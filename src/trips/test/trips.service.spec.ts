import { Test, TestingModule } from '@nestjs/testing';
import { TripsService } from '../trips.service';
import { GoogleMapsService } from '../../google-maps/google-maps.service';
import { TripsRepository } from '../trips.repository';
import { Status } from '@googlemaps/google-maps-services-js';
import { RouteNotFoundException } from '../service-exceptions/route-not-found.exception';
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

const generateExampleGetBikeRoadDistanceReturnObject = (
  elementStatus: Status,
  distance?: { value: number },
) => ({
  destination_addresses: ['some_destination_address'],
  origin_addresses: ['some_origin_address'],
  status: Status.OK,
  rows: [
    {
      elements: [
        {
          status: elementStatus,
          distance,
        },
      ],
    },
  ],
});

const mockGoogleMapsService = () => ({
  getBikeRoadDistance: jest.fn(),
});

const mockTripsRepository = () => ({
  createTrip: jest.fn(),
});

describe('TripsService', () => {
  let service: TripsService;
  let googleMapsService: any;
  let tripsRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripsService,
        { provide: GoogleMapsService, useFactory: mockGoogleMapsService },
        { provide: TripsRepository, useFactory: mockTripsRepository },
      ],
    }).compile();

    service = module.get<TripsService>(TripsService);
    googleMapsService = module.get(GoogleMapsService);
    tripsRepository = module.get(TripsRepository);
  });

  describe('createTrip', () => {
    it('resolves Trip if tripsRepository.createTrip resolves Trip', async () => {
      googleMapsService.getBikeRoadDistance.mockResolvedValue(
        generateExampleGetBikeRoadDistanceReturnObject(Status.OK, {
          value: 1000,
        }),
      );

      tripsRepository.createTrip.mockResolvedValue(exampleTrip);

      const result = await service.createTrip(exampleCreateTripDto);
      expect(tripsRepository.createTrip).toBeCalledWith({
        ...exampleCreateTripDto,
        distance: 1000,
        date: new Date('2022-01-01'),
      });
      expect(result).toEqual(exampleTrip);
    });

    it('throws RouteNotFoundException if googleMapsService.getBikeRoadDistance resolves object with NOT_FOUND element status', () => {
      googleMapsService.getBikeRoadDistance.mockResolvedValue(
        generateExampleGetBikeRoadDistanceReturnObject(Status.NOT_FOUND),
      );

      expect(service.createTrip(exampleCreateTripDto)).rejects.toThrow(
        RouteNotFoundException,
      );
    });

    it('throws RouteNotFoundException if googleMapsService.getBikeRoadDistance resolves object with ZERO_RESULTS element status', () => {
      googleMapsService.getBikeRoadDistance.mockResolvedValue(
        generateExampleGetBikeRoadDistanceReturnObject(Status.ZERO_RESULTS),
      );

      expect(service.createTrip(exampleCreateTripDto)).rejects.toThrow(
        RouteNotFoundException,
      );
    });
  });
});
