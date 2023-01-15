import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Trip } from '@prisma/client';
import { getMonthRange, getWeekRange } from '../util/dates';

export type TripInputData = Omit<Trip, 'id'>;

export type WeeklyStats = {
  total_distance: number;
  total_price: number;
};

export type MonthlyStatsItem = {
  day: Date;
  total_distance: number;
  avg_ride: number;
  avg_price: number;
};

@Injectable()
export class TripsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async createTrip(trip: TripInputData): Promise<Trip> {
    return await this.prismaService.trip.create({
      data: trip,
    });
  }

  public async getWeeklyStats(): Promise<WeeklyStats | null> {
    const [fd, ld] = getWeekRange(new Date());

    const stats = await this.prismaService.trip.aggregate({
      where: {
        date: {
          gte: fd,
          lte: ld,
        },
      },
      _sum: {
        distance: true,
        price: true,
      },
    });

    if (!stats._sum.distance || !stats._sum.price) return null;

    return {
      total_distance: stats._sum.distance,
      total_price: stats._sum.price,
    };
  }

  public async getMonthlyStats(): Promise<MonthlyStatsItem[]> {
    const [fd, ld] = getMonthRange(new Date());

    const stats = await this.prismaService.trip.groupBy({
      by: ['date'],
      where: {
        date: {
          gte: fd,
          lte: ld,
        },
      },
      _sum: {
        distance: true,
      },
      _avg: {
        distance: true,
        price: true,
      },
    });

    return stats.map((group) => ({
      day: group.date,
      total_distance: group._sum.distance,
      avg_ride: group._avg.distance,
      avg_price: group._avg.price,
    }));
  }
}
