export class Connector {
  id: string;
  name: string;
  description: string;
  setting: Setting[];
}

export class Setting{
  profile: string;
  key: string;
  value: string;
}

