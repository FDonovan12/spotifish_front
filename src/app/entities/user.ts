import { ContributorBase, ContributorOutputBase } from './contributor';
import { LikeableItemBase } from './likeable-item';
import { SluggerEntity } from './slugger-entity';
import { UserLikeableItemBase, UserLikeableItemOutputBase } from './user-likeable-item';

export interface UserBase extends LikeableItemBase {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthAt: Date;
    createdAt: Date;
    userLikeableitems: UserLikeableItemBase[];
    contributors: ContributorBase[];
}

export interface UserOutputBase extends UserBase, SluggerEntity {
    userLikeableitems: UserLikeableItemOutputBase[];
    contributors: ContributorOutputBase[];
}

export interface UserLoginResponse {
    accessToken: string;
    refreshToken: string;
}

export interface UserRegisterInput {
    email: string;
    password: string;
    passwordConfirmed: string;
    username: string;
    firstName: string;
    lastName: string;
    birthAt: Date;
}

export namespace UserRegisterInput {
    export function formDate(birthAt: Date): string {
        console.log(birthAt);
        console.log(typeof birthAt);
        return `${birthAt.getFullYear()}-${birthAt.getMonth() + 1}-${birthAt.getDay()}`;
    }
}
