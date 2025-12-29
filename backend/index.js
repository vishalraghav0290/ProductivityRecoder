import express from 'express'

const app = express()

const port = 3000

app.get('/api/status',(req, res)=>{
  res.send({status: 'ok'})
})


app.listen(port, ()=>{
  console.log(`Server is running on port ${port}`)
})