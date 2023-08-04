const express=require("express")
const cors=require("cors")
const app=express()
require("dotenv").config()
app.use(express.json())
app.use(cors())

app.get("/user",(req,res)=>{
    res.send({msg:"okok"})
})


const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/", async (req, res) => {
  try {
    const message = req.body.msg
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "system", content: `According to the given data, If the  data is related to the type of book then suggest atleast 12 book names in nice way by saying here are some book details that you may enjoy (something like that)
       
        ` },
      { role: "user", content: `${message}` }],
      max_tokens: 400,
      temperature: 0,
    })
    res.status(200).send(response.data.choices[0].message.content)
  } catch (error) {
    res.status(400).send({message: error.message})
  }
})






app.listen(process.env.port,()=>{
    try{
        console.log(`port is running at ${process.env.port}`)
    }
    catch(err){
        console.log(err)
    }
})