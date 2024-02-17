import { Object, Property } from "fabric-contract-api";


@Object()
export class User {

    @Property()
    public user_id: string;


    @Property()
    public email: string;

    @Property()
    public firstName: string;

    @Property()
    public lastName: string;

    @Property()
    public password: string;

    
    
   
}