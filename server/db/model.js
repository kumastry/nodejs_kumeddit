import Sequelize from "sequelize";

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

(async() => {
    await sequelize.sync({force:true});
    const jane = await Topic.create({name:"moko"});
    console.log(jane instanceof Topic);
})();