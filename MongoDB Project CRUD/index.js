const express=require('express');
const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/student-read', (req, res) => {
    res.send(' Student Read API');
});
app.post('/student-insert', (req, res) => {
    res.send(' Student Insert API');
});
 app.listen(3000);