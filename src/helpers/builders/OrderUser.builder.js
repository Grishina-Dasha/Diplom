import { faker } from "@faker-js/faker";
export class OrderUserBuilder{
    withFirstName (firstName){
        this.firstName = firstName ?? faker.person.firstName();
        return this;
    }
    withLastName (lastName){
        this.lastName = lastName ?? faker.person.lastName();
        return this;
    }
    withPostCode (postCode){
        this.postCode = postCode ?? faker.location.zipCode();
        return this;
    }
    build()
    {
        const result = {... this}
        return result;
    }
}