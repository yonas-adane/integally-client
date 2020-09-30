import { MessageTemplate } from './message-template.model';

export class MappingTemplate {
  id: string;
  name: string;
  description: string;
  sourceTemplate:MessageTemplate;
  targetTemplate:MessageTemplate;
  maps : Map[];
}

export class Map {
  id: string;
  function: string;
  target: Attribute;
  source: Attribute[];
}

export class Attribute {
  name: string;
  dataType: string;
  value: any;
  defaultValue: any;
  depth: number;
}