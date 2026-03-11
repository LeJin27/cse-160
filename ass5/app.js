const express = require('express')
const app = express()
const port = 3000



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log("")
  console.log(`API Testing UI: http://localhost:${port}/asgn5/asgn5.html`)
})
