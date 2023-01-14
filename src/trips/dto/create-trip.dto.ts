import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';

const addressRegex = /^((?!\|).)*$/;

export class CreateTripDto {
  @IsString()
  @IsNotEmpty()
  @Matches(addressRegex, {
    message: 'address must be a valid google maps address',
  })
  start_address: string;

  @IsString()
  @IsNotEmpty()
  @Matches(addressRegex, {
    message: 'address must be a valid google maps address',
  })
  destination_address: string;

  @IsInt({
    message: 'price must be an integer number in the smallest denomination',
  })
  @Min(0)
  @Transform(({ value }) => Number.parseInt(value))
  price: number;

  @IsDateString({ strict: true })
  @MaxLength(10, { message: 'date must be in YYYY-MM-DD format' })
  date: string;
}
