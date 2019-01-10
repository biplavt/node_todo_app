var {MongoClient,ObjectID}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',function(err,client){
	if(err){
		return console.log(error);
	}
	console.log('Connected To MongoDB server');

	const db=client.db('TodoApp_DB'); //defines database

	db.collection('Todos_collection').find().toArray().then((docs)=>{
		console.log('Todos');
		console.log(JSON.stringify(docs,undefined,2));
	},(err)=>{
		console.log('Unable to fetch todos,',err);
	})
});
