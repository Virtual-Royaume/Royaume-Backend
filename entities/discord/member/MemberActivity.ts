import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class MemberActivity extends BaseEntity {

    @PrimaryColumn({length: 35})
    userId: string;

    @Column()
    voiceMinute: number = 0;

    @Column()
    totalMessageCount: number = 0;

    @Column()
    monthMessageCount: number = 0;

    @Column()
    generalMessageCount: number = 0;
    @Column()
    gamesMessageCount: number = 0;
    @Column()
    musiqueMessageCount: number = 0;
    @Column()
    dropShippingMessageCount: number = 0;
    @Column()
    developpementMessageCount: number = 0;
    @Column()
    tradingMessageCount: number = 0;
    @Column()
    graphismeMessageCount: number = 0;
    @Column()
    sneakersMessageCount: number = 0;


    constructor(userId: string){
        super();

        if(userId) this.userId = userId;
    }
}