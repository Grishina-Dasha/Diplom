export class AuthUserBuilder{
    constructor(){
        this.name = "standard_user";
        this.password = "secret_sauce";
    }
    withName (name){
        this.name = name;
        return this;
    }
    withPassword (password){
        this.password = password;
        return this;
    }

    build()
    {
        const result = {... this}
        return result;
    }
}