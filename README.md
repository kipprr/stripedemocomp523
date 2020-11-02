# stripedemocomp523
## A demo to show how Stripe Checkout works with Firebase in a React app.

## How to Run Locally
After cloning the repository if you want to run locally, navigate to the directory in terminal and run the following commands.

```
npm install
npm start
```

Navigate to localhost:3000 to see your app as you make changes in the code.

## How To Deploy

After cloning the reposittory and making changes to the code, install and login with Firebase CLI tools. Follow the instructions here: https://firebase.google.com/docs/cli 

Then navigate in terminal to the project directory. If you haven't already run ```npm install```, do that now. Then run ```npm run build```. Then run the following commands.

```
cd functions
npm install
cd ..
```

Now you're ready to deploy. Run this command:

```
firebase deploy
```

If you have an error, you may have to install some dependencies such as eslint. Follow the suggestions of the error message(s).

