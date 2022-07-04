import {Topic, Board, Comment, User, sequelize} from "./model.js";
import * as data from './db-sample-data.js';


(async() => {
  
    try {
        await sequelize.sync({force:true});
        for(const {TopicId, title, BoardCount} of data.topics) {
            console.log(title);
            await Topic.create({TopicId, title, BoardCount});
    }
    /*
    for(const {title,BoardId,TopicId,commentCount} of data.boards) {
        await Board.create({title, BoardId, TopicId, commentCount});
    }

    for(const {comment,TopicId,BoardId,UserId,like,dislike} of data.comments) {
        await Comment.create({comment,TopicId,BoardId,UserId,like,dislike});
    }

    for(const {UserId, name} of data.users) {
        await User.create({UserId, name});
    }*/
} catch(e) {
    console.log("error log...");
    console.error(e);
}
})();