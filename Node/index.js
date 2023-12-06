const express = require('express');
const mongoose = require("mongoose");
const chapter = require('./routes/ChapterRoute'); 
const qcm = require('./routes/QcmRoute'); 
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const PORT = 3000;

const uri = "mongodb://localhost:27017";
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(uri);
      console.log(`MongoDB Connected!`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
//http://localhost:3000/api/chapter/extract?course=C
//http://localhost:3000/api/chapter/chapters?course=Java
app.use('/api/chapter', chapter);
//http://localhost:3000/api/qcm/extract?url=https://letsfindcourse.com/technical-questions/java-mcq/basic-of-java&course=JAVA
//http://localhost:3000/api/qcm/GenerateQcm?course=JAVA&chapter=Java%20MCQ%20Questions%20-%20Java%20Basics
app.use('/api/qcm', qcm);

app.get('/', (req, res) => {
  res.json({ message: 'Are You Ready?' });
});
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
  });
