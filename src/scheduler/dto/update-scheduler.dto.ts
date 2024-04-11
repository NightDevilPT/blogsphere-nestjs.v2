// update-scheduler.dto.ts
import { IsString, IsJSON, IsEnum, IsOptional, IsUUID } from 'class-validator';

export class UpdateSchedulerDto {
  @IsString()
  @IsOptional()
  timeStamp?: string;

  @IsString()
  @IsOptional()
  command?: string;

  @IsJSON()
  @IsOptional()
  payload?: any;

  @IsEnum(['Success', 'Pending'])
  @IsOptional()
  status?: string;

  @IsUUID()
  @IsOptional()
  createdBy?: string;
}
