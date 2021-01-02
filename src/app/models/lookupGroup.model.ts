import { Audit } from "./audit.model";

export class LookupGroup extends Audit {
  id: string;
  name: string;
  description: string;
}

export class Lookup extends Audit {
  id: string;
  lookupGroupId: string;
  defKey: string;
  val: string;
  altKey: string;
}
