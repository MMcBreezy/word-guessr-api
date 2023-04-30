const { app } = require('./app')
const port = 5000;

app.listen(port, () => {
  console.log(`word-guessr-api listening at http://localhost:${port}`)
})
