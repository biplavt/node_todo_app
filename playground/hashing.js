const {SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

var password='123abc!';

// bcrypt.genSalt(10,(err,salt)=>{
// 	bcrypt.hash(password,salt,(err,hash)=>{
// 		console.log(hash);
// 	});
// });

var hashedPassword='$2a$10$emcdbmeDAVPUvFuN4jhLn.uMPe870EIcDgWATATplCTnE6RgQRj.C';

bcrypt.compare(password,hashedPassword,(err,result)=>{
	console.log(result);
});

// var message='I am user number 3';

// var hash=SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash:${hash}`);

// JSON Web token............................
// var data={
// 	id:10
// }

// // var token={
// // 	data:data,
// // 	hash:SHA256(JSON.stringify(data)+'somesecret').toString()
// // }


// // var resulthash=SHA256(JSOn.stringify(token.data)+'somesecret').toString();

// // if(resulthash===token.hash){
// // 	console.log('data is intact');
// // }else{
// // 	 console.log('data is changed! be aware');
// // }




// var token=jwt.sign(data,'123abc');
// console.log(token);


// var decoded=jwt.verify(token,'123abc');
// console.log('decoded',decoded);


