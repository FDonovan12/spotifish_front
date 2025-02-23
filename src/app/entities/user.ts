export interface UserDummy {
    username: string;
    password: string;
    accessToken: string;
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
        return `${birthAt.getFullYear()}-${
            birthAt.getMonth() + 1
        }-${birthAt.getDay()}`;
    }
}
