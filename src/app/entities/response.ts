import { Data } from './liked-item';

export interface CustomResponse<T> {
    code: number;
    body: Body<T>;
}
export interface CustomListResponse<T> {
    code: number;
    body: Body<T>[];
    pagesElement: number;
    currentPages: number;
    previousPage: null;
    firstPage: null;
    nextPage: null;
    lastPage: null;
    totalPages: number;
    totalElements: number;
}

export interface Body<T> {
    data: T;
    permission: Permission;
}

export interface Permission {
    canEdit: boolean;
    canDelete: boolean;
    idEntity: string;
}
