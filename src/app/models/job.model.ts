import { Event } from 'src/app/models/event.model';

export class Job {
  id: string;
  dateStart: Date;
  dateEnd: Date;
  dateAdded: Date;
  priority: number;
  event: Event;
  status: number;
  tag: string;
  traceEnabled: boolean;
}





