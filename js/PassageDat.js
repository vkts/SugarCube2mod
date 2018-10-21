class PassageDat {
    constructor(passageTag){
        this.tag = passageTag;
        this.section  = passageTag.substring(3,5);
        this.chapter   = passageTag.substring(1,3);
    }
}