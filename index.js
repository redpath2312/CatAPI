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
    const response = await axios.get(API_URL + "/cat?height=650", {responseType: 'arraybuffer'});
    // "/cat" will get a random cat but can specify height of image if adding query param of "/cat?height=" 
    // However to ensure this is consistent it is set for you here at 650. The css .container size and other queries should be set the same too.
    const buffer64 = Buffer.from(response.data, 'binary').toString('base64');
    // The above converts the image from URL into base64.
    res.render("index.ejs", {cat: buffer64});
}
catch(error){
    res.status(500);
  }
}
);

app.get("/gif" , async (req,res) => {
  try {
      const response = await axios.get(API_URL + "/cat/gif?height=650", {responseType: 'arraybuffer'});
      // "/cat" will get a random gif of a cat. 
      const buffer64 = Buffer.from(response.data, 'binary').toString('base64');
      // The above converts the image from URL into base64. This takes a while to display.
      res.render("index.ejs", {cat: buffer64});
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
        const response = await axios.get(API_URL + "/cat/says/" + newText + "?height=650&fontColor=white&fontSize=50", {responseType: 'arraybuffer'});
        // To just perform a basic query through postman you could do https://cataas.com/cat/says/hello and it would retrieve an image with "hello" as the text. 
        // Additional query paramaters added here for consitent height and text colour/font.
        const buffer64 = Buffer.from(response.data, 'binary').toString('base64');
        // The above converts the image from URL into base64.
        res.render("index.ejs", {cat: buffer64});
    }
    catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {error: error.message + ": Image to composite must have same dimensions or smaller",});
      // Note - smaller height requests will result in more errors (this can be seen in postman) but 650 is around the maximum that will fit on standard screen. If setting height to about 500 or below here, it will nearly always error.
    }});


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });