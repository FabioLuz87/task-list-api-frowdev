import { Task } from "../../../src/app/models/task.model";

describe('Task model', () => {
    test('Deve instanciar a classe conforme construtor', () => {
        const sut = new Task("any_description", "any_detail", "any_user_id");

        expect(sut.userId).toBe("any_user_id");
        expect(sut.description).toBe("any_description");
        expect(sut.detail).toBe("any_detail");
        expect(sut.isItArchived).toBeFalsy();
        expect(sut.id).toBeTruthy();

        sut.update("new_description", "new_detail");
        sut.updateArchived(true);

        expect(sut.id).toBeTruthy();
        expect(sut.description).toBe("new_description");
        expect(sut.detail).toBe("new_detail");
        expect(sut.isItArchived).toBeTruthy();
    });

    test("Deve instanciar pelo método estático", () => {
        const sut = Task.create("any_id", "any_description", "any_detail", "any_user", false);

        expect(sut.id).toBe("any_id");
        expect(sut.description).toBe("any_description");
        expect(sut.detail).toBe("any_detail");
        expect(sut.userId).toBe("any_user");
        expect(sut.isItArchived).toBeFalsy();
        expect(sut.toJson().id).toBeTruthy();
        expect(sut.toJson().description).toBe("any_description");
        expect(sut.toJson().detail).toBe("any_detail");
    });
});