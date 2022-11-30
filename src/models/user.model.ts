import crypto from 'crypto'
import { Task } from './task.model';

export class User{
    private _id: string;
    private _name: string;
    private _email: string;
    private _pass: string;

    constructor(name: string, email: string, pass: string) {
        this._id = crypto.randomUUID();
        this._name = name;
        this._email = email;
        this._pass = pass;        
    }

    static create(
        id: string,
        name: string,
        email: string,
        pass: string,
        ): User {
        const user = new User(name, email, pass);
        user._id = id;
        user._name = name;
        user._email = email;
        user._pass = pass
        
        return user;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email
    }

    get pass(): string {
        return this._pass;
    }

    update(name?: string, email?: string, pass?: string) {
        if (name) this._name = name;

        if(email) this._email = email;

        if(pass) this._pass = pass
    }

    toJson() {
        return {
            id: this._id,
            name: this._name,
            email: this._email,
        }
    }
}