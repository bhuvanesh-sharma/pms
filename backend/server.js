const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const morgan = require('morgan');
const mongoose = require('mongoose');

// Create Express app
const app = express();

// Middleware
// app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());


const connectToDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
            

        });
        console.log("connected to MongoDb");

    } catch (error) {
        console.log(error);
        process.exit(1);

    }
}
connectToDB();


const contactSchema = new mongoose.Schema({
  no  :Number,
  Date: String,
  Name: String,
  EmailId: String,
   Phno:Number
    // Add other fields as needed
  });
  
  const ContactModel = mongoose.model('Contact', contactSchema,'contacts');
  
  app.get('/api/data', async (req, res) => {
    try {
      const data = await ContactModel.find();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

 

// POST route
app.post('contacts', (req, res) => {
    const newContact = new ContactModel(req.body);
  
    newContact.save()
      .then(() => res.json('Contact added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });


  // db.posts.updateOne( 
  //   { title: "Post Title 5" }, 
  //   {
  //     $set: 
  //       {
  //           no  :Number,
  //           Date: String,
  //           Name: String,
  //           EmailId: String,
  //            Phno:Number
  //       }
  //   }, 
  //   { upsert: true }
  // )     




const port = 5000;
app.listen(port, () => {
    console.log("server is started successfully" );

          /////////////////////////socket code starts here//////////////////////////




});



