import { Test, TestingModule } from '@nestjs/testing';
import { GoogleMapsService } from '../../google-maps/google-maps.service';
import { GoogleMapsDistanceService } from '../service/google-maps-distance.service';
import { Status } from '@googlemaps/google-maps-services-js';
import { RouteNotFoundException } from '../exception/route-not-found.exception';

const mockGoogleMapsService = () => ({
  getBikeRoadDistance: jest.fn(),
});

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

describe('GoogleMapsDistanceService', () => {
  let service: GoogleMapsDistanceService;
  let googleMapsService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoogleMapsDistanceService,
        { provide: GoogleMapsService, useFactory: mockGoogleMapsService },
      ],
    }).compile();

    service = module.get<GoogleMapsDistanceService>(GoogleMapsDistanceService);
    googleMapsService = module.get(GoogleMapsService);
  });

  describe('getDistance', () => {
    it('resolves distance if googleMapsService resolves DistanceMatrixResponseData', async () => {
      googleMapsService.getBikeRoadDistance.mockResolvedValue(
        generateExampleGetBikeRoadDistanceReturnObject(Status.OK, {
          value: 1000,
        }),
      );

      const result = await service.getDistance(
        'some_origin_address',
        'some_destination_address',
      );

      expect(result).toEqual(1000);
    });

    it('throws RouteNotFoundException if googleMapsService.getBikeRoadDistance resolves object with NOT_FOUND element status', () => {
      googleMapsService.getBikeRoadDistance.mockResolvedValue(
        generateExampleGetBikeRoadDistanceReturnObject(Status.NOT_FOUND),
      );

      expect(
        service.getDistance('some_origin_address', 'some_destination_address'),
      ).rejects.toThrow(RouteNotFoundException);
    });

    it('throws RouteNotFoundException if googleMapsService.getBikeRoadDistance resolves object with ZERO_RESULTS element status', () => {
      googleMapsService.getBikeRoadDistance.mockResolvedValue(
        generateExampleGetBikeRoadDistanceReturnObject(Status.ZERO_RESULTS),
      );

      expect(
        service.getDistance('some_origin_address', 'some_destination_address'),
      ).rejects.toThrow(RouteNotFoundException);
    });
  });
});
