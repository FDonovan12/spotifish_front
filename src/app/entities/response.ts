export interface CustomResponse<T> {
    code: number;
    body: T;
}
export interface CustomListResponse<T> {
    code: number;
    body: T[];
    pagesElement: number;
    currentPages: number;
    previousPage: null;
    firstPage: null;
    nextPage: null;
    lastPage: null;
    totalPages: number;
    totalElements: number;
}
