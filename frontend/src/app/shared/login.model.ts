export class Alogin {
    public collegeID: String;
    public email:String;
    public password:String;
}

export class Slogin {
    public username:String;
    public password:String;
    
}

export class Adetail{
    public _id: String;
    public collegeID: String;
    public fullname:string;
    public email:String;
    public password:any;
    public cnfpass:any;
}
export class Sregister {
    public username:String;
    public password:String;
    public cnfpass:String;
}