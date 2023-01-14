import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Trip } from '@prisma/client';

export type TripInputData = Omit<Trip, 'id'>;

@Injectable()
export class TripsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async createTrip(trip: TripInputData): Promise<Trip> {
    return await this.prismaService.trip.create({
      data: trip,
    });
  }
}
