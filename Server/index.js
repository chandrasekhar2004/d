// const express = require('express');
// const mongoose= require('mongoose');
// const cors = require("cors");
// const TodoModel = require("./Models/Todo")

// const app = express()
// app.use(cors())
// app.use(express.json())

// mongoose.connect('mongodb://127.0.0.1:27017/test')
//    .then(() => console.log('Connected to MongoDB'))
//    .catch(err => console.error('Error connecting to MongoDB:', err));

// app.post('/add',(res,req)=>{
    
//     const task = req.body.task; 

    
//     TodoModel.create({
//         task:task
//     }).then(result => res.json(result))
//     .catch(err => res.json(err))
// })

// app.listen(3001,() => {
//     console.log("Server is Running")
// })

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const TodoModel = require("./Models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.get('/get',(req,res)=>{
  TodoModel.find()
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

app.put('/update/:id',(req,res)=>{
  const {id} =req.params;
  // console.log(id);
  TodoModel.findByIdAndUpdate({_id:id},{done:true})
  .then(result => res.json(result))
  .catch(err => res.json(err))
  // console.log(id);
})

app.delete('/delete/:id',(req,res)=>{
  const {id} =req.params;
  // console.log(id);
  TodoModel.findByIdAndDelete({_id:id})
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

app.post('/add', (req, res) => {
  const task = req.body.task; // Access the task property from the request body

  if (!task) { // Check if the task property exists and has a value
    return res.status(400).json({ message: 'Missing task data' }); // Handle missing data with a bad request response
  }

  TodoModel.create({
    task: task
  })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is Running");
});
