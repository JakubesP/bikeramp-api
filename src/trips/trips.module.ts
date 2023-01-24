import { Module } from '@nestjs/common';
import { TripsController } from './controller/trips.controller';
import { StatsController } from './controller/stats.controller';
import { TripsService } from './service/trips.service';
import { GoogleMapsModule } from '../google-maps/google-maps.module';
import { PrismaService } from '../prisma.service';
import { TripsRepository } from './trips.repository';
import { StatsService } from './service/stats.service';
import { ROAD_DISTANCE_SERVICE } from '../road-distance/road-distance-service.interface';
import { GoogleMapsDistanceService } from '../road-distance/service/google-maps-distance.service';

@Module({
  controllers: [TripsController, StatsController],
  providers: [
    TripsService,
    StatsService,
    PrismaService,
    TripsRepository,
    {
      provide: ROAD_DISTANCE_SERVICE,
      useClass: GoogleMapsDistanceService,
    },
  ],
  imports: [GoogleMapsModule],
})
export class TripsModule {}
