export class File {
    ID?: string;
    Owner?: string;
    NameFile?: string;
    Type?: string;
    Link?: string;

    constructor({ID,Owner,NameFile,Type,Link}) {
        if(ID != null) this.ID=ID;
        if (Link!=null) this.Link=Link;
        if (NameFile!=null) this.NameFile=NameFile;
        if (Owner!=null) this.Owner=Owner;
        if (Type!=null) this.Type=Type;
    }
    
}