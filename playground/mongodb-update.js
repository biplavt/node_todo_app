var {MongoClient,ObjectID}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',function(err,client){
	if(err){
		return console.log(error);
	}
	console.log('Connected To MongoDB server');

	const db=client.db('TodoApp_DB'); //defines database

	db.collection('Users_collection').findOneAndUpdate({
		_id:new ObjectID('5c378410c4c3d03150133e94')
	},{
		$set:{
			name:'Shree',
		},
		$inc:{
			age:1
		}
	},{
		returnOriginal:false
	}).then((result)=>{
		console.log(result);
	});

	
});
