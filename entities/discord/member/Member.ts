import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import MemberActivity from "./MemberActivity";

@Entity()
export default class Member extends BaseEntity {

    @PrimaryColumn({length: 35})
    userId: string;

    @Column({length: 50})
    username: string;

    @Column()
    profilPictureLink: string;

    @Column({default: true})
    alwaysInTheServer: boolean;

    @OneToOne(() => MemberActivity, {cascade: true, eager: true})
    @JoinColumn()
    activity: MemberActivity;


    constructor(userId: string){
        super();

        if(userId){
            this.userId = userId;
            this.activity = new MemberActivity(userId);
        }
    }

    
    public static async getMember(userId: string) : Promise<Member> {
        let member: Member|undefined = await Member.findOne({userId: userId});

        if(!member) member = new Member(userId);

        return member;
    }
}