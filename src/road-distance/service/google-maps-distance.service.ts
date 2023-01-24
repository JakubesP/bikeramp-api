import { Injectable } from '@nestjs/common';
import { RoadDistanceServiceInterface } from '../road-distance-service.interface';
import { GoogleMapsService } from '../../google-maps/google-maps.service';
import { Status } from '@googlemaps/google-maps-services-js';
import { RouteNotFoundException } from '../exception/route-not-found.exception';

@Injectable()
export class GoogleMapsDistanceService implements RoadDistanceServiceInterface {
  constructor(private readonly googleMapsService: GoogleMapsService) {}

  async getDistance(origin: string, destination: string): Promise<number> {
    const roadDistanceData = await this.googleMapsService.getBikeRoadDistance(
      origin,
      destination,
    );

    const distanceDataElement = roadDistanceData.rows[0].elements[0];
    const elementStatus = distanceDataElement.status;

    if (elementStatus !== Status.OK) {
      if ([Status.NOT_FOUND, Status.ZERO_RESULTS].includes(elementStatus)) {
        throw new RouteNotFoundException(
          `Distance between "${origin}" and "${destination}" cannot be calculated`,
        );
      } else {
        throw new Error(
          `Element status is "${elementStatus}" for distance between "${origin}" and "${destination}"`,
        );
      }
    }

    const distance = distanceDataElement.distance.value;

    return distance;
  }
}
