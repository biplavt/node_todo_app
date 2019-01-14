const {ObjectID}=require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo}= require('./../server/models/todo');
const {User}=require('./../server/models/user');

// //remove everything
// Todo.remove({}).then((result)=>{
// 	console.log(result.result);
// })

// //find one(the first match) and remove, it returns the removed documents
// Todo.findOneAndRemove()



//find by Id and remove, and return the doc
Todo.findByIdAndRemove({_id:new Object('5c37d627b7003e20a4aa9be1')}).then((doc)=>{
	console.log(doc);
})