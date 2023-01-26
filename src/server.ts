import express from 'express';

const app = express();

// app.use(express.json);

// Métodos GET

app.get('/', (req, res) => {
  return res.json({ 
    id: 1,
    message: "It's ok!" 
  })
})

app.listen(3333);