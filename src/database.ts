import { IUser, database } from "types";

class Database {
    private db: database

    constructor() {
        this.db = [
            {
                id: '111',
                username: 'Test User',
                age: 30,
                hobbies: ['MMORPG', 'DnD']
            }
        ]
    }

    public getUsers(): database {
        return this.db
    }

    public getUser(id: string): IUser | null {
        return this.db.find(user => user.id === id) || null
    }

    public createUser(user: IUser): IUser {
        this.db.push(user)
        return user
    }

    public updateUser(id: string, user: IUser): IUser | undefined {
        const index = this.db.findIndex(user => user.id === id)
        this.db[index] = {
            ...this.db[index],
            ...user
        }

        return this.db[index]
    }

    public removeUser(id: string): IUser | undefined {
        const index = this.db.findIndex(user => user.id === id)
        const deleted = this.db.splice(index, 1)[0]

        return deleted
    }
}

export const db = new Database()
