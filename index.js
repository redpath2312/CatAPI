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


    // *************
    // OLD METHOD OF CONVERTING TO BASE 64
    // const response = await axios.get(API_URL + "/cat?height=650", {responseType: 'arraybuffer'}); - old code to get base64 image.
    // const buffer64 = Buffer.from(response.data, 'binary').toString('base64');
    // The above converts the image from URL into base64.
    // res.render("index.ejs", {cat: buffer64});
    // *************

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

    
    //Note couldn't get the text to work without using old method of base64 conversion.
  app.post("/says" , async (req,res) => {
    // newText is the form data user enters on the site for custom text. 
    const newText = req.body.catText;
    console.log(newText);
    try {
        const response = await axios.get(API_URL + "/cat/says/" + newText + "?fontColor=white&fontSize=50", {responseType: 'arraybuffer'});
        console.log("Attempted get")
        // To just perform a basic query through postman you could do https://cataas.com/cat/says/hello and it would retrieve an image with "hello" as the text. 
        // Additional query paramaters added here for text colour/font.
        const buffer64 = Buffer.from(response.data, 'binary').toString('base64');
        // The above converts the image from URL into base64.
        res.render("index.ejs", {cat64: buffer64});
    }
    catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {error: error.message + ": Image to composite must have same dimensions or smaller",});
      // Note - smaller height requests will result in more errors (this can be seen in postman) but 650 is around the maximum that will fit on standard screen. If setting height to about 500 or below here, it will nearly always error. This might not be seen now that the height is set in the ejs view and not initial request.
    }});


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });