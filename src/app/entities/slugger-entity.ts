import { PermissionEntity } from './permission-entity';

export interface SluggerEntity extends PermissionEntity {
    slug: string;
}
