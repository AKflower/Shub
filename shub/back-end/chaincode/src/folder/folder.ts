import { Object, Property } from "fabric-contract-api";


@Object()
export class Folder {

    @Property()
    public folder_id: string;

    @Property()
    public folder_name: string;

    @Property()
    public folder_path: string;

    @Property()
    public user_id: string;

    @Property()
    public created_date: string;

    @Property()
    public updated_date: string;

    
   
}