import { Audit } from "./audit.model";

export class ConnectorLibrary extends Audit {
  id: string;
  name: string;
  description: string;
  file: string;
  isCustom: boolean;
  properties: string;
}
