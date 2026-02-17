export class AuthUserBuilder{
    constructor(){
        this.name = process.env.SAUCE_LOGIN;
        this.password = process.env.SAUCE_PASSWORD;
    }
    withName (name){
        this.name = name;
        return this;
    }
    withPassword (password){
        this.password = password;
        return this;
    }
   build() {
  const result = { ...this };
  return result;
}
}