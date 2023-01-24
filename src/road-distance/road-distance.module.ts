import { Module } from '@nestjs/common';
import { GoogleMapsDistanceService } from './service/google-maps-distance.service';
import { GoogleMapsModule } from '../google-maps/google-maps.module';

@Module({
  imports: [GoogleMapsModule],
  providers: [GoogleMapsDistanceService],
})
export class RoadDistanceModule {}
