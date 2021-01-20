import { Audit } from "./audit.model";

export class Trace extends Audit {
  id: string;
  dateAdded: Date;
  instanceId: string;
  eventId: string;
  tag: string;
  tagDescription: string;
  info: any;
  count: string;
  startTime: Date;
  endTime: Date;
  exitTag: string;
}





