import {Sequelize, Op, QueryTypes} from "sequelize";

const url = 'postgres://postgres:postgres@localhost:5432/kumadit';
export const sequelize = new Sequelize(url);
const {DataTypes} = Sequelize;

const Topic = sequelize.define('Topic', {
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    boardCount:{
        type:DataTypes.INTEGER
    }
});

const Board = sequelize.define('Board',  {
    title:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    topicId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            mode:Topic
        }
    },
    commentCount:{
        type:DataTypes.INTEGER
    }
});

const Comment = sequelize.define('Comment', {
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
    }
});

/*
const User = sequlize.define('User', {

});
*/

Topic.hasMany(Board);
Board.belongsTo(Topic);
Board.hasMany(Comment);
Comment.belongsTo(Board);

