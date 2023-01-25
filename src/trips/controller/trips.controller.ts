import { Controller, Post, Query } from '@nestjs/common';
import { CreateTripDto } from '../dto/create-trip.dto';
import { TripsService } from '../service/trips.service';
import { CreateTripResponseDto } from '../dto/create-trip-response.dto';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  async createTrip(
    @Query() createTripDto: CreateTripDto,
  ): Promise<CreateTripResponseDto> {
    const trip = await this.tripsService.createTrip(createTripDto);

    return new CreateTripResponseDto(trip);
  }
}
