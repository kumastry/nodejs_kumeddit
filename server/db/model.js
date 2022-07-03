import {Sequelize, Op, QueryTypes} from "sequelize";

const url = 'postgres://postgres:postgres@localhost:5432/kumadit';
export const sequelize = new Sequelize(url);
const {DataTypes} = Sequelize;

export const Topic = sequelize.define('Topic', {
    title:{
        type: DataTypes.STRING,
        allowNull:false
    },
    boardCount:{
        type:DataTypes.INTEGER
    }
});

//BoardIdとtopicIdを複合主キー
export const Board = sequelize.define('Board',  {
    title:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    BoardId:{
        Type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
    },
    topicId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        references:{
            mode:Topic
        }
    },
    commentCount:{
        type:DataTypes.INTEGER
    }
});


export const User = sequelize.define('User', {
    UserId:{
        type:DataTypes.UUID,
        primaryKey:true
    }
    ,
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
});

export const Comment = sequelize.define('Comment', {
    comment:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    topicId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Topic
        }
    },
    BoardId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Board
        }
    },
    UserId:{
        type:DataTypes.UUID,
        allowNull:false,
        references: {
            model:User
        }
    },
    likes: {
        type:DataTypes.INTEGER,
    },
    dislikes:{
        type:DataTypes.INTEGER
    }
});


Topic.hasMany(Board);
Board.belongsTo(Topic);
Board.hasMany(Comment);
Comment.belongsTo(Board);
User.hasMany(Comment);
Comment.belongsTo(User);
