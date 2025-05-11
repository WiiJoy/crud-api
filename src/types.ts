export interface IUser {
    username: string,
    age: number,
    hobbies: string[],
    id?: string,
}

export type database = IUser[]
