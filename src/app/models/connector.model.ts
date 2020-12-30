import { Audit } from "./audit.model";

export class Connector extends Audit {
  id: string;
  name: string;
  description: string;
  packageFileName: string;
  packageFile: string;
}

export class ConnectorSetting extends Audit{
  id: string;
  connectorId: string;
  profile: string;
  key: string;
  value: string;
  secret: boolean;
}

