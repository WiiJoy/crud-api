import { IUser, IAnswer, database } from "./types";
import { v4 as uuidv4 } from 'uuid'
import { ERROR, STATUS } from "./constants";
import { setUsefulFields } from "./utils";

class Database {
    private db: database

    constructor() {
        this.db = [
            // {
            //     id: '316a7cbd-3932-49ad-9678-a2a2fa8fb974',
            //     username: 'Test User',
            //     age: 30,
            //     hobbies: ['MMORPG', 'DnD']
            // }
        ]
    }

    public getUsers(): IAnswer {
        return {
            content: this.db,
            status: STATUS.SUCCESS
        }
    }

    public getUser(id: string): IAnswer {
        const user = this.db.find(user => user.id === id)
        return {
            content: user || ERROR.NOT_FOUND,
            status: user ? STATUS.SUCCESS : STATUS.NOT_FOUND
        }
    }

    public createUser(user: IUser): IAnswer {
        const id = uuidv4()
        const template = setUsefulFields(user)
        const newUser: IUser = {
            ...template,
            id
        }
        this.db.push(newUser)
        return {
            content: newUser,
            status: STATUS.CREATE
        }
    }

    public updateUser(id: string, user: IUser): IAnswer {
        const index = this.db.findIndex(user => user.id === id)
        const isUpdate = index >= 0

        const template = setUsefulFields(user, this.db[index])

        if (isUpdate) {
            this.db[index] = {
                ...this.db[index],
                ...template
            }
        }

        return {
            content: isUpdate ? this.db[index] : ERROR.NOT_FOUND,
            status: isUpdate ? STATUS.SUCCESS : STATUS.NOT_FOUND
        }
    }

    public removeUser(id: string): IAnswer {
        const index = this.db.findIndex(user => user.id === id)
        const deleted = index >= 0 ? this.db.splice(index, 1)[0] : undefined

        console.log('deleted', deleted)

        return {
            content: deleted || ERROR.NOT_FOUND,
            status: deleted ? STATUS.REMOVE : STATUS.NOT_FOUND
        }
    }
}

export const db = new Database()
