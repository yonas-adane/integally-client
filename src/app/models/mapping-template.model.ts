import { MessageTemplate } from './message-template.model';

export class MappingTemplate {
  id: string;
  name: string;
  description: string;
  sourceTemplate:MessageTemplate;
  targetTemplate:MessageTemplate;
  transformScript: string;
  maps : Map[];
}

export class Map {
  id: string;
  function: string;
  clientFunction: string;
  target: Attribute;
  source: Attribute[];
  inactive: boolean;
}

export class Attribute {
  name: string;
  dataType: string;
  value: any;
  defaultValue: any;
  depth: number;
}