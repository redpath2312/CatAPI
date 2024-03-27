import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { buffer } from "stream/consumers";


const app = express();
const port = 3000;
const API_URL = "https://cataas.com";
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/" , async (req,res) => {
try {

    const response = await axios.get(API_URL + "/cat?&json=true");
    // "/cat" will get a random cat but can specify height of image if adding query param of "/cat?height=" 
    // However to ensure this is consistent it is set for you here at 650. The css .container size and other queries should be set the same too.
    const catId = response.data._id;
    console.log(catId);
    const catURL = API_URL + "/cat/" + catId;
    res.render("index.ejs",  {catURL});

}
catch(error){
    res.status(500);
  }
}
);


app.get("/gif" , async (req,res) => {
    try {
        const response = await axios.get(API_URL + "/cat/gif?&json=true");
        // Similar to app.get("/") except to get a gif it adds /gif to /cat
        const catId = response.data._id;
        console.log(catId);
        const catURL = API_URL + "/cat/" + catId;
        res.render("index.ejs",  {catURL});
    }
    catch(error){
        res.status(500);
      }
    }
    );

    
  app.post("/says" , async (req,res) => {
    // newText is the form data user enters on the site for custom text. 
    const newText = req.body.catText;
    console.log(newText);
    try {

        const response = await axios.get(API_URL + "/cat/says/" + newText + "?&json=true");
        const catID = response.data._id;
        console.log(catID);
        const catURL = API_URL + "/cat/" + catID + "/says/" + newText + "?fontColor=white&fontSize=50";
        res.render("index.ejs", {catURL});
        
        // To just perform a basic query through postman you could do https://cataas.com/cat/says/hello and it would retrieve an image with "hello" as the text. 
        // Additional query paramaters added here for text colour/font.
        
    }
    catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {error: "CatAPI failed with error: " + "'" + error.message +"'"});
      // Note - smaller height requests through query params will result in more errors (can be seen in postman) if retrieving smaller sizes directly, but by not specifiying height and setting height afterwards in index.ejs this fixes it. 650 is around the maximum that will fit on standard screen. If setting height to about 500 or below here through query params, it will nearly always error.
    }});


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });