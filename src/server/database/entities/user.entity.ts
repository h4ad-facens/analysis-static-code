//#region Imports

import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { MetricEntity } from './metric.entity';

//#endregion

/**
 * A classe que representa a entidade que lida com os usuários
 */
@Entity('users')
export class UserEntity {
    
    //#region Construtor

    /**
     * Construtor padrão
     */
    constructor(
        partial?: Partial<UserEntity>,
    ) {
        Object.assign(this, { ...partial });
    }

    //#endregion

    //#region Public Properties

    /**
     * A identificação do usuário
     */
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    /**
     * O endereço de e-mail do usuário
     */
    @Column({ nullable: false, unique: true })
    public email!: string;

    /**
     * A lista de métricas desse usuário
     */
    @OneToMany(() => MetricEntity, u => u.user)
    public metrics?: MetricEntity[];

    //#endregion

}