import { Connector } from './connector.model';
import { File } from './file.model';

export class Event {
  id: string;
  name: string;
  description: string;
  sourceConnector: Connector;
  message: any;
  routeLibrary: File;
  routeName: string;
  traceEnabled: boolean;
  triggerCount: number;
  routeDefinition: string;
}



