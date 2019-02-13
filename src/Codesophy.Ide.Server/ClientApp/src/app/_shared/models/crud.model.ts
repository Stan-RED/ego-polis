import { Observable } from 'rxjs';

/**
 * Common interface for CRUD services.
 */
export interface CRUD<T> {
    create(model: T): Observable<{}>;
    getAll(): Observable<T[]>;
    getOne?(id: string): Observable<T>;
    remove(id: string): Observable<void>;
    update(newModel: Partial<T> & {id: string}): Observable<{}>;
}
