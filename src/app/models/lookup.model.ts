export class Lookup {
  id: string;
  name: string;
  description: string;
  lookups: LookupKeyVal[];
}

export class LookupKeyVal {
  defKey: string;
  val: string;
  altKey: string;
}

