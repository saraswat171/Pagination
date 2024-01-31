const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const UsersModel = require('./models/Users')

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



app.get('/userData', async (req, res) => { 
    console.log('reqttt' , req.query)

	try { 
		let { page, size } = req.query; 

		

		const p = parseInt(page);
		const limit = parseInt(size); 
		console.log('page :' ,p)
		console.log('limitt' ,limit)
		var n = (p-1)*limit;
		if(page === '1'){
			// const user = await UsersModel.find().limit(limit)	;
         n=0;
		}
		
      
	else {
		 n = (p-1)*limit;
		
	}
         
	const user = await UsersModel.find().skip(n).limit(limit);	
        console.log('usersff: ',  user)
		res.json({ 
			
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




/*var express = require('express'), 
	Mongoose = require('mongoose'), 
	Bcrypt = require('bcryptjs'), 
	bodyParser = require('body-parser'), 
	jsonParser = bodyParser.json(), 
	User = require('./user') 

const app = express(); 

const db = `mongodb+srv://pallavi:pallavi123@ 
cluster0.k0sop.mongodb.net/user?retryWrites= 
true&w=majority` 

Mongoose.connect(db, { 
	useNewUrlParser: true, 
	useUnifiedTopology: true, 
	useCreateIndex: true
}).then(() => console.log('MongoDB Connected....')) 

// Handling GET /send Request 
app.get("/send", async (req, res, next) => { 

	try { 
		let { page, size, sort } = req.query; 

		// If the page is not applied in query. 
		if (!page) { 

			// Make the Default value one. 
			page = 1; 
		} 

		if (!size) { 
			size = 10; 
		} 

		// We have to make it integer because 
		// query parameter passed is string 
		const limit = parseInt(size); 

		// We pass 1 for sorting data in 
		// ascending order using ids 
		const user = await User.find().sort( 
			{ votes: 1, _id: 1 }).limit(limit) 
		res.send({ 
			page, 
			size, 
			Info: user, 
		}); 
	} 
	catch (error) { 
		res.sendStatus(500); 
	} 
}); 

// Handling POST /send Request 
app.post('/send', jsonParser, (req, res) => { 

	req.body.password = 
		Bcrypt.hashSync(req.body.password, 10); 
	var newUser = new User({ 
		username: req.body.username, 
		password: req.body.password, 

	}) 

	newUser.save() 
		.then(result => { 
			console.log(result); 
		}); 
}) 

// Server setup 
app.listen(3000, function () { 
	console.log("Express Started on Port 3000"); 
});*/