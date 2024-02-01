const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const UsersModel = require('./models/Users')
// const bodyParser= require('body-parser')
// const jsonParser = bodyParser.json()

const app = express()
app.use(express.text())
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 

app.use(cors());


const url = "mongodb+srv://chetan1150:Chetan1731@cluster3.8nu9esc.mongodb.net/?retryWrites=true&w=majority";

try {
    mongoose.connect(url);
    console.log("connected to mongodb")
}
catch (error) {
    console.error(error);
}

app.post('/usersinfo', async (req, res) => {
    const { name, email, designation , salary} = req.body;
  
    try {
        const existingUser = await UsersModel.findOne({ email })

        console.log(existingUser)
        if (existingUser) {
            return res.status(400).json("Email already exist");
        }
        const newuser = await UsersModel.create({ name, email,  designation, salary});
        console.log('newuser', newuser)
        res.status(200).json(newuser)
    }


    catch (err) { res.status(500).json(err) }
  
})

app.put('/update/:id' , async(req,res)=>{
	console.log('reqst id'  , req)
     const {id} = req.params;
	 console.log ('idis ',id)
	 const { name, email, designation , salary} = req.body;
	try{
		if(!mongoose.Types.ObjectId.isValid(id)){
			return res.status(404).json('invaluid id')
		 } 
		 const updateUser = await UsersModel.findByIdAndUpdate(id, { name, email, designation , salary },{new :true})
		 if(!updateUser){
			return res.status(404).json('user not updated')
		 }
		 res.json(updateUser)
	} catch (error) { 
		res.status(500).json('Internal server error'); 
	} 
})


app.delete('/deleteUser/:id', async(req,res)=>{
	const {id} = req.params;
	console.log ('id   is ',id)
	
   try{
	console.log ('id   is ',id)
		const deleteUser = await UsersModel.findByIdAndDelete(id)
		
		res.status(200).json({message: 'user deleted successfully', data: deleteUser})
   } catch (error) { 
	   res.status(500).json('Internal server error'); 
   } 
})





app.get('/userData', async (req, res) => { 
    console.log('reqttt' , req.query)

	try { 
		let { page, size ,...flag} = req.query; 

		

		const p = parseInt(page);
		const limit = parseInt(size); 
		const Salary=parseInt(salary)
		console.log('page :' ,p)
		console.log('limitt' ,limit)
		console.log('SALARY' ,Salary)
		
		var n = (p-1)*limit;
		if(page === '1'){
			// const user = await UsersModel.find().limit(limit)	;
         n=0;
		}
		
      
	else {
		 n = (p-1)*limit;
		
	}
      const count = await UsersModel.countDocuments(); 
	  console.log(count)  
	  const count1 = count/limit;
	
	const user = await UsersModel.find().skip(n).limit(limit).sort({flag:1});	
        console.log('usersff: ',  user)
		res.json({ 
			Count:count,
			Info: user, 
		}); 
	} 
	catch (error) { 
		res.status(500).json('Internal server error'); 
	} 
}); 






















app.listen(8080, () => {
    console.log('server at port 8080')
})




