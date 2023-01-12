import { Injectable } from '@nestjs/common';
import {
  Client,
  DistanceMatrixResponseData,
  TravelMode,
} from '@googlemaps/google-maps-services-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleMapsService extends Client {
  private readonly accessKey = this.config.get('GOOGLE_MAPS_API_KEY');

  constructor(private config: ConfigService) {
    super();
  }

  async getBikeRoadDistance(
    origin: string,
    destination: string,
  ): Promise<DistanceMatrixResponseData> {
    const response = await this.distancematrix({
      params: {
        origins: [origin],
        destinations: [destination],
        mode: TravelMode.bicycling,
        key: this.accessKey,
      },
    });

    return response.data;
  }
}
