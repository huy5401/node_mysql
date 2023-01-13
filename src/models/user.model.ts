import { type } from 'os';
import { DataTypes, Sequelize, Optional, Model } from 'sequelize'
import db from '../config/db/database'


export interface UserAttributes {
    id: number;
    username: string;
    password: string;
    refeshToken: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface UserInput extends Optional<UserAttributes, "id" | "refeshToken" |"createdAt" | "updatedAt"> { };

const User = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    refeshToken: {
        type: DataTypes.STRING
    }
},{
    timestamps:true
})


export default User