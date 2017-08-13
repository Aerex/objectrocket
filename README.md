# objectrocket


## Docker Installation

### Build the image

Run `docker build -t app:latest`

### Create a container and run the application

`docker run -p 3000:3000 -d app`

Go to `localhost:3000`


## Test

To run unit test `npm test`

## Using Application

Enter the item code in the textbox. An invalid code entry will show a popup
 
Press the *Send* button to add the entry

Press the *Basket* button to show the current contents in the basket

Press the *Clear* button to clear the basket.



