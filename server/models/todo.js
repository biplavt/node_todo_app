var mongoose=require('mongoose');

const Todo=mongoose.model('Todo',{
	text:{
		type:String,
		required:true,
		minlength:1,
		trim:true 		//trims any leading or trailing white spaces
	},
	completed:{
		type:Boolean,
		completed:false
	},
	completedAt:{
		type:Number,
		default:null
	}
});

module.exports={
	Todo
}