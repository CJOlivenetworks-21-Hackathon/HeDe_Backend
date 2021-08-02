import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne, BaseEntity } from "typeorm"


@Entity({name: 'hospital'}) 
export class Hospital extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    hospitalId!: number

    @Column({ type: "varchar", length: 40, nullable: false })
    hopsitalName!: string

    // Hospital Email Domain
    @Column({ type: "varchar", length: 40, nullable: false })
    hopsitalDomain!: string
}
