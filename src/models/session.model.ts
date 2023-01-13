import { DataTypes, Sequelize, Optional} from 'sequelize'
import db from '../config/db/database'


export interface SessionAttributes {
    valid: boolean;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date;
}

const Session = db.define('session', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user: {
        type: DataTypes.INTEGER
    },
    valid: {
        type: DataTypes.BOOLEAN
    },
    userAgent:{
        type: DataTypes.STRING
    }
},{
    timestamps:true
})

export default Session;