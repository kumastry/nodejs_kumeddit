import {Topic, Board, Comment, sequelize} from "./model.js";



(async() => {
    await sequelize.sync({force:true});
    await Topic.create({name:"ru", boardCount:0});
    await Topic.create({name:"gu", boardCount:0});
})();