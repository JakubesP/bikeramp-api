import { Inject, Injectable } from '@nestjs/common';
import { CreateTripDto } from '../dto/create-trip.dto';
import { TripsRepository } from '../trips.repository';
import { Trip } from '@prisma/client';
import {
  ROAD_DISTANCE_SERVICE,
  RoadDistanceServiceInterface,
} from '../../road-distance/road-distance-service.interface';

@Injectable()
export class TripsService {
  constructor(
    @Inject(ROAD_DISTANCE_SERVICE)
    private readonly roadDistanceService: RoadDistanceServiceInterface,
    private readonly tripsRepository: TripsRepository,
  ) {}

  async createTrip(createTripDto: CreateTripDto): Promise<Trip> {
    const { start_address, destination_address, date } = createTripDto;

    const trip = await this.tripsRepository.createTrip({
      ...createTripDto,
      date: new Date(date),
      distance: await this.roadDistanceService.getDistance(
        start_address,
        destination_address,
      ),
    });

    return trip;
  }
}
