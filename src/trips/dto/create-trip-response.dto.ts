import { Trip } from '@prisma/client';

export class CreateTripResponseDto {
  distance: string;

  constructor(model: Trip) {
    this.distance = `${(model.distance / 1000).toFixed(1)}km`;
  }
}
