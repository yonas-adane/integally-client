import { Audit } from "./audit.model";

export class EventMessage extends Audit {
  id: string;
  queueName: string;
  eventId: string;
  message: string;
  status: string;
  statusDescription: string;
  startDate: Date;
  endDate: Date;
  size: number;
  duration: number;
  dequeueCount: number;
  traceInstanceId: string;
}

