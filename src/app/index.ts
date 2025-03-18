import colors from "colors"
import app from "src/server.js"

const port = process.env.PORT || 3000

app.listen(3000, () => {
  console.log(colors.blue.bold(`Server is running on port ${port}`))
})
