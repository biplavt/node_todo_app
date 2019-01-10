// const MongoClient=require('mongodb').MongoClient;
var {MongoClient}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',function(err,client){
	if(err){
		return console.log(error);
	}
	console.log('Connected To MongoDB server');

	const db=client.db('TodoApp_DB'); //defines database


	// db.collection('Todos_collection').insertOne({
	// 	text:'Something to do',
	// 	completed:false
	// },function(err,result){
	// 	if(err)
	// 		return console.log('Unable to insert Todos',err);

	// 	console.log(JSON.stringify(result.ops,undefined,2));
	// })	

	// db.collection('Users_collection').insertOne({
	// 	name:'Biplav',
	// 	age:26,
	// 	location:'Reno'
	// },function(err,result){
	// 	if(err)
	// 		return console.log('Unable to add data',err);
	// 	console.log(JSON.stringify(result.ops,undefined,2));
	// })

	client.close();
})