import crypto from 'crypto'
import { Task } from './task.model';

export class User{
    private _id: string;
    private _name: string;
    private _email: string;
    private _pass: string;
    private _tasks: Task[];

    constructor(name: string, email: string, pass: string) {
        this._id = crypto.randomUUID();
        this._name = name;
        this._email = email;
        this._pass = pass;
        this._tasks = [];        
    }

    get id(): string {
        return this._id;
    }

    update(name: string, email: string) {
        this._name = name;
        this._email = email;
    }

    toJson(){
        return{
            id: this._id,
            name: this._name,
            email: this._email,
        }
    }
}