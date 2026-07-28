var express = require("express");
var app = express();

app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cardList = [
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
]


app.get('/api/projects',(req,res) => {
res.json({statusCode: 200, data: cardList, message:"Success"})
})

var port = process.env.port || 3000;

app.listen(port,()=>{
console.log("App listening to: "+port)
});


