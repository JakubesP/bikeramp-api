import { Module } from '@nestjs/common';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { GoogleMapsModule } from '../google-maps/google-maps.module';
import { PrismaService } from '../prisma.service';
import { TripsRepository } from './trips.repository';

@Module({
  controllers: [TripsController],
  providers: [TripsService, PrismaService, TripsRepository],
  imports: [GoogleMapsModule],
})
export class TripsModule {}
