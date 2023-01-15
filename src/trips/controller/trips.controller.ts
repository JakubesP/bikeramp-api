import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTripDto } from '../dto/create-trip.dto';
import { TripsService } from '../service/trips.service';
import { RouteNotFoundException } from '../exceptions/route-not-found.exception';
import { CreateTripResponseDto } from '../dto/create-trip-response.dto';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  async createTrip(
    @Query() createTripDto: CreateTripDto,
  ): Promise<CreateTripResponseDto> {
    try {
      const trip = await this.tripsService.createTrip(createTripDto);

      return new CreateTripResponseDto(trip);
    } catch (exception: unknown) {
      if (exception instanceof RouteNotFoundException) {
        throw new HttpException(exception.message, HttpStatus.BAD_REQUEST);
      }

      throw exception;
    }
  }
}
