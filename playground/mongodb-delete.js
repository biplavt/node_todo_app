var {MongoClient,ObjectID}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',function(err,client){
	if(err){
		return console.log(error);
	}
	console.log('Connected To MongoDB server');

	const db=client.db('TodoApp_DB'); //defines database

	//deleteMany
	db.collection('Todos_collection').deleteMany({text:'eat lunch'}).then((result)=>{
		console.log(result);
	},(error)=>{
		console.log(error);
	})

	//deleteOne
	db.collection('Todos_collection').deleteOne({text:'eat lunch'}).then((result)=>{
		console.log(result);
	});

	//findOneAndDelete
	db.collection('Todos_collection').findOneAndDelete({completed:'false'}).then((result)=>{
		console.log(result);
	})

	//db.close();
});
