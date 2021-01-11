import { Audit } from './audit.model';

export class Job extends Audit {
  id: string;
  dateStart: Date;
  dateEnd: Date;
  priority: number;
  eventId: string;
  message: string;
  status: string;
  tag: string;
  triggerCount: number;
  size: number;
}

