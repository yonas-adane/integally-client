import { Audit } from './audit.model';

export class MessageTemplateMap extends Audit{
  id: string;
  name: string;
  description: string;
  sourceMessageTemplateId: string;
  sourceMessageTemplateName: string;
  sourceMessageKeyAttributeId: string;
  targetMessageRelationshipAttributeId: string;
  sourceMessageKeyAttributeName;
  targetMessageRelationshipAttributeName;
  targetMessageTemplateId: string;
  targetMessageTemplateName: string;
  targetMessageKeyAttributeId: string;
  sourceMessageRelationshipAttributeId: string;
  targetMessageKeyAttributeName: string;
  sourceMessageRelationshipAttributeName: string;
  clientScript: string;
}

export class MessageAttributeMap extends Audit{

  id: string;
  messageTemplateMapId: string;
  sourceMessageAttributes: MessageAttributeMapSource[];
  function: string;
  clientFunction: string;
  targetMessageAttributeId: any;
  targetMessageAttributeName: string;
  inactive: boolean;

}

export class MessageAttributeMapSource extends Audit{

  id: string;
  messageAttributeMapId: string;
  sourceMessageAttributeId: string;
  sourceMessageAttributeName: string;

}
