export class Page<T> {
    totalElements: number;
    totalPages: number;
    numberOfElements: number;
    size:number;
    empty:boolean;
    first:boolean;
    last:boolean;
    content:T[];

}
  