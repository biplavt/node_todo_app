var express=require('express');
var bodyParser=require('body-parser');  //changes json to object

var {mongoose}=require('./db/mongoose.js');
var {User}=require('./models/user.js');
var {Todo}=require('./models/todo.js');

var {ObjectID}=require('mongodb');


var app=express();

var PORT=process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/',(req,res)=>{
	res.send('Welcome to Notes App!');
})

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

app.get('/todos',(req,res)=>{
	Todo.find().then((todos)=>{
		res.send({todos:todos});
	},(e)=>{
		res.status(400).send(e);
	})
})

app.get('/todos/:id',(req,res)=>{
	var id=req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}
	Todo.find({_id:new ObjectID(`${id}`)}).then((todo)=>{
		if(todo)
			res.send(todo);
		else
			res.status(400).send('No todo with that Id');
	},(err)=>{
		res.send(err);
	})
})

app.delete('/todos/:id',(req,res)=>{
	var id=req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	};

	Todo.findByIdAndRemove({_id:new Object(`${id}`)}).then((todo)=>{
		if(todo){
			console.log('deleted');
			res.send(todo);
		}else
			res.status(400).send('No todo with that Id');
	},(err)=>{
		res.send(err);
	})
});




app.listen(PORT,()=>{
	console.log(`Started on port ${PORT}...`);
})

module.exports={
	app
}