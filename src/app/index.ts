import colors from 'colors'

import app from 'src/server.js'

const port = process.env.PORT || 3000

app.listen(3000, () => {
  console.log(colors.white.bold.bgBlack(`Server is running on port ${port}`))
})
