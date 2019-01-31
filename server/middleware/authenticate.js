var {User}=require('./../models/user');

var authenticate=(req,res,next)=>{
	var token=req.header('x-auth');
	console.log('token:',token);

	User.findByToken(token).then((user)=>{
		if(!user){
			return Promise.reject();
		}
		res.user=user;
		res.token=token;
		console.log('res:',res.user);
		next();
	}).catch((e)=>{
		res.status(401).send();
	});
}

module.exports={
	authenticate
}