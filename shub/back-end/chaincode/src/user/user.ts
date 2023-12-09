import { Object, Property } from "fabric-contract-api";


@Object()
export class User {

    @Property()
    public user_id: string;

    @Property()
    public username: string;

    @Property()
    public password: string;

    @Property()
    public email: string;
    
   
}