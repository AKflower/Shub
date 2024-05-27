import { Object, Property } from "fabric-contract-api";


@Object()
export class Permission {

    @Property()
    public permission_id: string;


    @Property()
    public permission_name: string;

   
}