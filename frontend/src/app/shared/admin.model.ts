export class Paper {
    name:String;
    year:String;
    branch:String;
    class:String;
    date:Date;
    questions:Number;
    MperQ:Number;
    timelimit:Number;
    Createdby:String;
}
export class CPaper {
    name:String;
    year:String;
    branch:String;
    class:String;
    date:Date;
    questions:Number;
    MperQ:Number;
    Tmarks:Number;
    testname:String;
    timelimit:Number;
    Createdby:String;

}
export class adminReg {
    public fullname: String;
    public email:String;
    public password:String;
    public cnfpass:String;
    
}
export class Question {
    questionID:number;
    question:String;
    option1:String;
    option2:String;
    option3:String;
    option4:String;
    right:Number;
    testname:String;
}
