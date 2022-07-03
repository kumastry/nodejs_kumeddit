import {Sequelize, Op} from "sequelize";

const url = 'postgres://postgres:postgres@localhost:5432/kumadit';
export const sequelize = new Sequelize(url);
const {DataTypes} = Sequelize;

const Topics = sequelize.define('Topics', {
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    boardCount:{
        type:DataTypes.INTEGER
    }
});

const Boards = sequelize.define('Boards',  {
    title:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    topicId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    commentCount:{
        type:DataTypes.INTEGER
    }
});

const Comments = sequelize.define('Comments', {
    comment:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    topicId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    BoardId:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
});

(async() => {
    await sequelize.sync({force:true});
    await Topics.create({name:"ru", boardCount:0});
    await Topics.create({name:"gu", boardCount:0});
})();