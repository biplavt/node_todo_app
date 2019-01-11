var express=require('express');
var bodyParser=require('body-parser');  //changes json to object

var {mongoose}=require('./db/mongoose.js');
var {User}=require('./models/user.js');
var {Todo}=require('./models/todo.js');


var app=express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
	console.log(req.body);
	var todo=new Todo({
		text:req.body.text
	})

	todo.save().then((doc)=>{
		console.log(doc);
		res.send(doc);
	},(err)=>{
		res.status(400).send(err);
	})
})


app.listen(3000,()=>{
	console.log('Started on port 3000...');
})