import {Sequelize, Op, QueryTypes} from "sequelize";

const url = 'postgres://postgres:postgres@localhost:5432/kumadit';
export const sequelize = new Sequelize(url);
const {DataTypes} = Sequelize;

export const Topic = sequelize.define('Topic', {
    TopicId:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    title:{
        type: DataTypes.STRING,
        allowNull:false
    },
    BoardCount:{
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
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
    },
    TopicId:{
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


//UserIdはUUID
export const User = sequelize.define('User', {
    UserId:{
        type:DataTypes.INTEGER,
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
    TopicId:{
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
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
            model:User
        }
    },
    like: {
        type:DataTypes.INTEGER,
    },
    dislike:{
        type:DataTypes.INTEGER
    }
});


Topic.hasMany(Board);
Board.belongsTo(Topic);
Board.hasMany(Comment);
Comment.belongsTo(Board);
User.hasMany(Comment);
Comment.belongsTo(User);
