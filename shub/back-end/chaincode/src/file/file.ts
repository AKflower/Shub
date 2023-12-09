import { Object, Property } from "fabric-contract-api";


@Object()
export class File {

    @Property()
    public file_id: string;

    @Property()
    public file_name: string;

    @Property()
    public file_path: string;

    @Property()
    public cid: string;
    
    @Property()
    public user_id: string;

    @Property()
    public created_date: string;

    @Property()
    public updated_date: string;

    @Property()
    public file_size: string;
}