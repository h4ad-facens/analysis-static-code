//#region Imports

import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

import { UserEntity } from './user.entity';

//#endregion

/**
 * A classe que guarda as métricas processadas para um usuário
 */
@Entity('metrics')
export class MetricEntity {

    //#region Construtor

    /**
     * Construtor padrão
     */
    constructor(
        partial?: Partial<MetricEntity>,
    ) {
        Object.assign(this, { ...partial });
    }

    //#endregion

    //#region Public Properties

    /**
     * A identificação da métrica
     */
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    /**
     * O nome dessa métrica
     */
    @Column({ nullable: false })
    public name!: string;

    /**
     * O valor dessa métrica
     */
    @Column({ nullable: false })
    public value!: number;

    /**
     * A identificação do repositório que foi obtido essas métricas
     */
    @Column({ nullable: false })
    public repositoryUrl!: string;

    /**
     * A identificação do usuário em que criou essa métrica
     */
    @Column({ nullable: false })
    public userId!: number;

    /**
     * As informações do usuário que criou essas métricas
     */
    @ManyToOne(() => UserEntity, u => u.metrics) 
    public user?: UserEntity;

    /**
     * A data de quando foi criada essa métrica
     */
    @CreateDateColumn()
    public createdAt!: Date;

    //#endregion
    
}