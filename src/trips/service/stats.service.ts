import { Injectable } from '@nestjs/common';
import { TripsRepository } from '../trips.repository';

@Injectable()
export class StatsService {
  constructor(private readonly tripsRepository: TripsRepository) {}
}
