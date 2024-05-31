import { Object, Property } from "fabric-contract-api";


@Object()
export class Role {

    @Property()
    public role_id: string;

    @Property()
    public idInt: number;

    @Property()
    public level: number;

    @Property()
    public role_name: string;

    @Property()
    public role_type: number;

    @Property()
    public role_organization: string;
   
    @Property()
    public role_permissionIds: string[]

    @Property()
    public isGlobal: boolean;
}