import { IUser, IAnswer, database } from "./types";
import { v4 as uuidv4 } from 'uuid'
import { ERROR } from "./constants";

class Database {
    private db: database

    constructor() {
        this.db = [
            {
                id: '316a7cbd-3932-49ad-9678-a2a2fa8fb974',
                username: 'Test User',
                age: 30,
                hobbies: ['MMORPG', 'DnD']
            }
        ]
    }

    public getUsers(): IAnswer {
        return {
            content: this.db,
            status: 200
        }
    }

    public getUser(id: string): IAnswer {
        const user = this.db.find(user => user.id === id)
        return {
            content: user || ERROR.NOT_FOUND,
            status: user ? 200 : 404
        }
    }

    public createUser(user: IUser): IAnswer {
        const id = uuidv4()
        const newUser: IUser = {
            ...user,
            id
        }
        this.db.push(newUser)
        return {
            content: newUser,
            status: 201
        }
    }

    public updateUser(id: string, user: IUser): IAnswer {
        const index = this.db.findIndex(user => user.id === id)
        const isUpdate = index >= 0

        if (isUpdate) {
            this.db[index] = {
                ...this.db[index],
                ...user
            }
        }

        return {
            content: isUpdate ? this.db[index] : ERROR.NOT_FOUND,
            status: isUpdate ? 200 : 404
        }
    }

    public removeUser(id: string): IAnswer {
        const index = this.db.findIndex(user => user.id === id)
        const deleted = index >= 0 ? this.db.splice(index, 1)[0] : undefined

        console.log('deleted', deleted)

        return {
            content: deleted || ERROR.NOT_FOUND,
            status: deleted ? 204 : 404
        }
    }
}

export const db = new Database()
