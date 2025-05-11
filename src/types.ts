export interface IUser {
    username: string,
    age: number,
    hobbies: string[],
    id?: string,
}

export interface IAnswer {
    content: IUser | IUser[] | string | undefined,
    status: number
}

export type database = IUser[]
