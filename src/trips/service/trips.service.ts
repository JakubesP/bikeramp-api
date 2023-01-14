import { Injectable } from '@nestjs/common';
import { GoogleMapsService } from '../../google-maps/google-maps.service';
import { CreateTripDto } from '../dto/create-trip.dto';
import { Status } from '@googlemaps/google-maps-services-js';
import { TripsRepository } from '../trips.repository';
import { RouteNotFoundException } from '../exceptions/route-not-found.exception';
import { Trip } from '@prisma/client';

@Injectable()
export class TripsService {
  constructor(
    private readonly googleMapsService: GoogleMapsService,
    private readonly tripsRepository: TripsRepository,
  ) {}

  async createTrip(createTripDto: CreateTripDto): Promise<Trip> {
    const { start_address, destination_address, date } = createTripDto;

    const roadDistanceData = await this.googleMapsService.getBikeRoadDistance(
      start_address,
      destination_address,
    );

    const distanceDataElement = roadDistanceData.rows[0].elements[0];
    const elementStatus = distanceDataElement.status;

    if (elementStatus !== Status.OK) {
      if ([Status.NOT_FOUND, Status.ZERO_RESULTS].includes(elementStatus)) {
        throw new RouteNotFoundException(
          `Distance between "${start_address}" and "${destination_address}" cannot be calculated`,
        );
      } else {
        throw new Error(
          `Element status is "${elementStatus}" for distance between "${start_address}" and "${destination_address}"`,
        );
      }
    }

    const distance = distanceDataElement.distance.value;

    const trip = await this.tripsRepository.createTrip({
      ...createTripDto,
      date: new Date(date),
      distance,
    });

    return trip;
  }
}
