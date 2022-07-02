import express from 'express';
import * as data from './sample.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/topics', async (req, res) => {
    const topics = data.topics;
    if(!topics) {
        res.status(404).send("not founded");
    }
    res.json({
        topics:topics,
        count:topics.length
    });

    
});


app.get('/topics/:topicId', async( req, res) => {
    const topicId = +req.params.topicId;
    const topics = data.topics;
    if(!topics) {
        res.status(404).send("not founded");
    }
    res.json(
        topics.find(element => element.id === topicId)
    );
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

app.get('/topics/:topicId/boards/:boardId', async(req, res) => {
    const topicId = +req.params.topicId;
    const boardId = +req.params.boardId;
    const boards = data.boards;
    if(!boards) {
        res.status(404).send("not founded");
    }
    res.json(
        boards.filter(element => element.topicId === topicId && element.id === boardId)
    );
});

app.get('/topics/:topicId/boards/:boardId/comments', async(req, res) => {
    const topicId = +req.params.topicId;
    const boardId = +req.params.boardId;
    const comments = data.comments;
    console.log(comments);
    if(!comments) {
        res.status(404).send("not founded");
    }
    res.json(
        comments.filter(element => element.topicId === topicId && element.boardId === boardId)
    );
});

app.post('/topics/:topicId/boards', async (req, res) => {

});

app.post('/topics/:topicId/boards/:boardId/comments', async(req, res) => {
 
});


app.listen(5000, () => console.log("f"));