import crypto from 'crypto';

export class Task{
    private _id: string;
    private _description: string;
    private _detail: string
    private _userId: string;
    private _isItArchived: boolean

    constructor( description: string, detail: string, userId: string) {
        this._id = crypto.randomUUID();
        this._description = description;
        this._detail = detail;
        this._userId = userId;
        this._isItArchived = false;
    }

    static create(
        id: string,
        description: string,
        detail: string,
        userId: string,
        isItArchived: boolean,
        ): Task {
        const task = new Task(description, detail, userId)
        task._id = id;
        task._isItArchived = isItArchived;

        return task;
    }

    get id() {
        return this._id;
    }

    get description() {
        return this._description;
    }

    get detail() {
        return this._detail;
    }

    get userId() {
        return this._userId;
    }

    get isItArchived() {
        return this._isItArchived;
    }

    update(description: string, detail: string){
        this._description = description,
        this._detail = detail
    }

    toJson() {
        return {
            id: this._id,
            description: this._description,
            detail: this._detail,
        };
    }
}