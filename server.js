const app = require('./app')
const port = 3000;

app.listen(port, () => {
  console.log(`word-guessr-api listening at http://localhost:${port}`)
})
