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
    public created_at: Date;
    
    @Property()
    public updated_at: Date;

    constructor({ file_id, file_name, file_path, user_id, cid}) {
        this.file_id = file_id;
        this.file_name = file_name;
        this.file_path = file_path;
        this.cid = cid;
        this.user_id = user_id;
        this.created_at= new Date();
        this.updated_at= new Date();
    }
    
}