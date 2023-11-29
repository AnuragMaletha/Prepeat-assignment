# Prepeat-assignment

Things to do first:
1. Create a mongodb cluster
2. Get the cluster url
3. paste the url in index.js inside the server folder at the following line:
  
mongoose
  .connect("url", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>console.log("DB connected")).catch((err)=>console.log(err)); 



To run:

1. run command: npm i for both the server and client
2. npm run dev to start the react app(client)
3. Nodemon to start the Server
