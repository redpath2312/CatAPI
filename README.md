# CatAPI
Web Page to show random images of Cats using a public API from cataas.com

## Install Instructions

1. Clone repo to local repo.
2. Ensure Node is installed
3. Ensure dependent packages are installed running this command:
    npm i

    (If doing individually from scratch then ensure these 3 packages are installed)
    npm i express
    npm i axios
    npm i body-parser
4. Start the server by running:
    nodemon index.js
5. Check it displays web page by going to localhost:3000 in a browser

## Guidance

My webpage uses a public API from cataas.com that has various GET API's to retrieve images of a cat. My web page however uses AXIOS to directly use some of these specific GET requests to give the user some easy to chose 3 options.
1. - Just Image - this will retrieve a random image of a Cat.
2. - GIF - This will retrieve a random GIF of a cat, and will take a while to load.
3. - Cat with Text - This has a text box for user to specify a Caption to accompany a random cat Image.

For further options see cataas.com as you could tweak the queries further.

## Troubleshooting, Problems, and Attribution

- Getting the Cat With Text to work consistently is difficult when restricting the height but when set to 650 this works most of the time. If looking at tweaking, then double check queries can be run in Postman when hitting the cataas.com API directly. 1920 by 1080 resolution on a 27 Inch Monitor was the basis for design. - Update - This might be fixed by not restricting the request, and then setting the height in ejs afterwards.
- To display the image on my website I had to look up how to convert the image to Base64. There may be better ways of doing this. These pages however gave me the guidance for Base64 and using through Axios.
https://stackoverflow.com/questions/8499633/how-to-display-base64-images-in-html
https://www.fabiofranchino.com/log/get-the-image-buffer-using-axios-and-nodejs/
Update - Through collaboration, for Just Image and GIF, managed to not need a base64 conversion, and instead retrieve the image by getting the id from the json. For "Cat with Text" this still uses a base 64 conversion, as otherwise the text seemd to get lost.
- This website was created under the guidance of the AppBrewery Course "The Complete 2024 Web Development Bootcamp", in particular Captsone Project - Use A Public API. Although this project was created from scratch, previous modules code, example css styling, and the links above were used or referenced in the creation of the code.


