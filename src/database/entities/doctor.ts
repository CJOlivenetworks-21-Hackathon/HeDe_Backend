import { IsString } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

/*

@Entity({name: 'Doctor'}) 
export class Doctor extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    doctorId!: number

    @IsString()
    @Column({nullable: false})
    email!: String

    @IsString()
    @Column({nullable: false})
    password!: String

    @IsString()
    @Column({nullable: false})
    school!: string

    @IsString()
    @Column()
    nationality!: string

    @Column({ nullable : false })
    registeredAt!: string

    @Column({ nullable : false })
    updatedAt!: string
}

*/