require('./config/config');

var _=require('lodash');
var express=require('express');
var bodyParser=require('body-parser');  //changes json to object

var {mongoose}=require('./db/mongoose.js');
var {User}=require('./models/user.js');
var {Todo}=require('./models/todo.js');
var {authenticate}=require('./middleware/authenticate');
const bcrypt=require('bcryptjs');


var {ObjectID}=require('mongodb');


var app=express();

var PORT=process.env.PORT ||3000;

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

app.patch('/todos/:id',(req,res)=>{
	var id=req.params.id;
	var body= _.pick(req.body,['text','completed']); //grabs text, completed and assigns it to body
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	};
	
	if(_.isBoolean(body.completed) && body.completed){
		body.completedAt=new Date().getTime(); //create a new property, and assign timestamp
	}else{
		body.completed=false;
		body.completedAt=null;
	}

	Todo.findByIdAndUpdate(id,
		{$set:body},{new:true}).then((todo)=>{
			if(!todo){
				return res.status(404).send();
			}
			res.send({todo});
		}).catch((e)=>{
			res.status(400).send();
		})


})

//POST /users
app.post('/users',(req,res)=>{

	var body= _.pick(req.body,['email','password']); 
	var user=new User(body);

	user.save().then(()=>{
		return user.generateAuthToken();
	}).then((token)=>{
		res.header('x-auth',token).send(user);
	}).catch((err)=>{
		res.status(400).send(err);
	})
})

app.post('/users/login',(req,res)=>{
	var body=_.pick(req.body,['email','password']);
	
	User.findByCredentials(body.email,body.password).then((user)=>{
		user.generateAuthToken().then((token)=>{
			res.header('x-auth',token).send(user);
		});
	}).catch((e)=>{
		res.status(400).send(e);
	})
	

})



app.get('/users/me',authenticate,(req,res)=>{
	res.send(res.user);
})

app.listen(PORT,()=>{
	console.log(`Started on port ${PORT}...`);
})

module.exports={
	app
}