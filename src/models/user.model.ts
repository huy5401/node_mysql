import { DataTypes, Sequelize, Optional} from 'sequelize'
import db from '../config/db/database'


export interface UserAttributes {
    id : number;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface UserInput extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt"> {};

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
    }
},{
    timestamps:true
})

export default User;