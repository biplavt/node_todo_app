var mongoose=require('mongoose');
var validator=require('validator');
var jwt=require('jsonwebtoken');
const _= require('lodash');


var UserSchema= new mongoose.Schema({

	email:{
		type:String,
		required:true,
		trim:true,
		minlength:1,
		unique:true,
		validate:{
			validator:(value)=>{
				return validator.isEmail(value);
			},
			message:'{VALUE} isn ot a valid email'
		}
	},
	password:{
		type:String,
		required:true,
		minlength:6
	},
	tokens:[{
		access:{
			type:String,
			required:true
		},
		token:{
			type:String,
			required:true
		}
	}]
});

UserSchema.methods.toJSON=function(){
	var user=this;
	var userObject =user.toObject();

	return _.pick(userObject,['_id','email']);
}

UserSchema.methods.generateAuthToken=function(){
	// console.log('here');
	var user=this;
	var access='auth';
	var token=jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
	console.log('token:',token);

	// user.tokens=user.tokens.concat([{access,token}]);
	user.tokens.push({access,token});
	// console.log('users:',user);

	return user.save().then(()=>{
		return token;
	})
};

UserSchema.statics.findByToken=function(token){		//model methods
	var User=this;
	console.log('User:',User);
	var decoded;

	try{
		decoded=jwt.verify(token,'abc123');
	}catch(e){
		return Promise.reject();
	}

	return User.findOne({
		'_id':decoded._id,
		'tokens.token':token,
		'tokens.access':'auth'
	});
}


const User=mongoose.model('User',UserSchema);



module.exports={
	User
}