import { Observable } from 'rxjs/internal/Observable';

export interface SearchParams{
  page?: number;
  all?: any;
}

export interface HttpResource<T>{ //Type Generics
    
    list(searchParams: SearchParams) : Observable<{data: Array<T>, meta: any}>;
        
    get(id: number): Observable<T> ;
    
    create(data: T) : Observable<T>;
    
    update(id: number, data: T) : Observable<T>;
    
    //Não utilizar a palavra reservada delete
    destroy(id: number): Observable<any>;
    
}