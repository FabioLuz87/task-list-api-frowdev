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

    get description() {
        return this._description;
    }

    get detail() {
        return this._detail;
    }

    updateTasks(task: Task){
        this._description = task.description,
        this._detail = task.detail
    }

    toJson() {
        return {
            id: this._id,
            description: this._description,
            detail: this._detail,
        };
    }
}