// create-scheduler.dto.ts
import { IsString, IsJSON, IsEnum, IsUUID } from 'class-validator';

export class CreateSchedulerDto {
  @IsString()
  timeStamp: Date;

  @IsString()
  command: string;

  @IsJSON()
  payload: any;

  @IsString()
  payloadId: string;

  @IsEnum(['Success', 'Pending'])
  status?: string;

  @IsUUID()
  createdBy: string;
}
