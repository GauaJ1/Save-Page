const express = require('express');
const app = express();

app.use(express.json()); // parse JSON bodies

app.post('/api/conversation', (req, res) => {
  const conversationData = req.body; // retrieve JSON data from request body
  console.log(conversationData); // log the data to the console

  // process the data here, e.g., save to database or file
  // ...

  res.status(200).send({ message: 'Conversation data received successfully!' });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});