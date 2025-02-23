export interface CustomResponse<T> {
    code: number;
    message: string;
    entity: string;
    value: T;
}
export interface CustomResponseList<T> {
    code: number;
    message: string;
    entity: string;
    value: T[];
}
