//dependencies
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8090;

app.use(express.static("public"));

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//require external JS route documents.
app.use(require("./routes"))

app.listen(PORT, function(){
    console.log("Server started, http://localhost:"+PORT)
});