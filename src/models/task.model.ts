import crypto from 'crypto';

export class Task{
    private _id: string;
    private _description: string;
    private _detail: string

    constructor( description: string, detail: string) {
        this._id = crypto.randomUUID();
        this._description = description;
        this._detail = detail;
    }

    get id() {
        return this._id;
    }
}