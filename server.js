const app = require('./app')
const port = 3001;

app.listen(port, () => {
  console.log(`word-guessr-api listening at http://localhost:${port}`)
})
