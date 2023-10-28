import { Object, Property } from "fabric-contract-api";


@Object()
export class File {

    @Property()
    public ID: string;

    @Property()
    public Owner: string;

    @Property()
    public NameFile: string;

    @Property()
    public Type: string;
    
    @Property()
    public Link: string;
}