import express from 'express';
import * as data from './sample.js';
import {Topic, User, Board, User} from "db/model.js";
import sequelize from 'sequelize';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/topics', async (req, res) => {
    const topics = Topic.findAll();
    if(!topics) {
        res.status(404).send("not founded");
    }
    res.json(topics);
});

//データベースからPK = :topicIdのBoardを抜き出す
app.get('/topics/:topicId', async( req, res) => {
    const topicId = +req.params.topicId;

    const topic = await Topic.findByPk(topicId);
    if(!topic) {
        res.status("404").send("not founded");
        return;
    }

    res.json(topic);
});

app.get('/topics/:topicId/boards', async (req, res) => {
    const topicId = +req.params.topicId;
    const boards = data.boards;
    console.log(topicId);
    if(!boards) {
        res.status(404).send("not founded");
    }
    res.json(
        boards.filter(element => element.topicId === topicId)
    );
});

//topicIdとboardIdが等しいBoard(掲示板)を抜き出す
app.get('/topics/:topicId/boards/:boardId', async(req, res) => {
    const topicId = +req.params.topicId;
    const boardId = +req.params.boardId;

    const board = await Board.findOne(
    {
        attribute: ['title', 'commentCount']
    },{
        where: {
        [Or.and] : [
            {BoardId : boardId},
            {TopicId : topicId}
        ]
    }});


    if(!board) {
        res.status(404).send("not founded");
        return;
    }
    res.json(board);
});

//topicIdとboardIdが等しいBoard(掲示板)のコメントを抜き出す
app.get('/topics/:topicId/boards/:boardId/comments', async(req, res) => {
    const topicId = +req.params.topicId;
    const boardId = +req.params.boardId;
    const comments = Comment.findAll({
        attribute:['comment', 'like', 'dislike']
    },
    {
        while: {
            [Or.and] : [
                {BoardId : boardId},
                {TopicId : topicId}
            ]
        }
    }
    );
    if(!comments) {
        res.status(404).send("not founded");
    }
    res.json(comments);
});

//topicIdに掲示板を投稿する
//掲示板の作成には掲示板のタイトルとユーザー名が必要
//Boardテーブルに追加
app.post('/topics/:topicId/boards', async (req, res) => {
    const title = req.body.titie;
    const user = req.body.title;

});

//topicIdとboardIdにコメントを投稿する
//コメント投稿にはコメントとユーザー名が必要
app.post('/topics/:topicId/boards/:boardId/comments', async(req, res) => {

});


app.listen(5000, () => console.log("open"));