import { Controller, NotImplementedException, Post } from '@nestjs/common';

@Controller('trips')
export class TripsController {
  @Post()
  createTrip() {
    throw new NotImplementedException();
  }
}
