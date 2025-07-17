// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

// 替換成你 MongoDB Atlas 的連線字串
mongoose.connect('mongodb+srv://kiriwebsite:YWU5e30XK9hQzDFX@kiri.pxdu7eo.mongodb.net/sample_mflix')
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.error(err));

// 建立 Schema 對應 sample_mflix.comments
const commentSchema = new mongoose.Schema({
    name: String,
    email: String,
    movie_id: mongoose.Schema.Types.ObjectId,
    text: String,
    date: Date
}, { collection: 'comments' });

const Comment = mongoose.model('Comment', commentSchema);

// API 路由
app.get('/api/comments', async (req, res) => {
    const comments = await Comment.find().limit(10);
    // console.log('找到的資料:', comments);
    res.json(comments);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});