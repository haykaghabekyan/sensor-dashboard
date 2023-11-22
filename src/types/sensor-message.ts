import { CommandType } from './command';

export type SensorMessageType = {
  id: string;
  command: CommandType;
};
