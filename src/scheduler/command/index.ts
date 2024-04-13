import { CreateSchedularHandler } from './handler/create-schedular.command';
import { RunSchedularHandler } from './handler/run-schedular.command';
import { UpdateSchedulerHandler } from './handler/update-schedular.command';

export const allSchedularCommand = [
  CreateSchedularHandler,
  RunSchedularHandler,
  UpdateSchedulerHandler,
];
