var express = require("express");
var app = express();
var port = process.env.port || 3000;
const mongoose = require("mongoose");

app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://127.0.0.1:27017/myprojectDB');

mongoose.connection.on('connected', () => {
console.log('Connected to MongoDB!');

try {
    const sampleProject = new Project({
        FirstName: "Merrick Zivan",
        LastName: "Malong",
        ProjectName: "SIT725 Week 4"
    });

    sampleProject.save();
    console.log("Sample project saved!");
} catch (err) {
    console.log(err);
}
});

const ProjectSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    ProjectName: String,
});
const Project = mongoose.model('Project', ProjectSchema);


/* const cardList = [
    {
        title: "goat",
        image: "images/jr.jpeg",
        link: "lebrawn",
        desciption: "embiid or bron"
    },
    {
        title: "cant believe",
        image: "images/cant.jpeg",
        link: "cant believe",
        desciption: "cant believe this is my life rn"
    }
] */


app.get('/api/projects', async (req, res) => {
const projects = await Project.find({});
res.json({ statusCode: 200, data: projects, message: "Success" });
});


app.listen(port,()=>{
console.log("App listening to: "+port)
});


/*const sampleProject = new Project({
    title: "Kitten 4",
    image: "images/kitten-4.jpg",
    link: "About Kitten 4",
    description: "Demo description about kitten 4"
});

sampleProject.save().then(() => console.log("Sample project saved!"));*/



