import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateReminderDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  public message: string;

  @IsString()
  public date: string;

  @IsString()
  @IsOptional()
  public colorHex: string;

  @IsString()
  @IsOptional()
  public city: string;
}
