import { User } from "../../../src/app/models/user.model";

describe('User model', () => {
    test('Deve instanciar a classe conforme construtor e testar seus métodos', () => {
        const sut = new User("any_name", "any_email", "any_pass");

        expect(sut.name).toBe("any_name");
        expect(sut.email).toBe("any_email");
        expect(sut.pass).toBe("any_pass");
        expect(sut.id).toBeTruthy();
        
        sut.update("new_name", "new_email", "new_pass");
        expect(sut.name).toBe("new_name");
    });

    test("Deve istanciar pelo método estático", () => {
        const sut = User.create("any_id", "any_name", "any_email", "any_pass");

        expect(sut.id).toBe("any_id");
        expect(sut.name).toBe("any_name");
        expect(sut.email).toBe("any_email");
        expect(sut.pass).toBe("any_pass");
        expect(sut.toJson).toBeTruthy();
    });


});