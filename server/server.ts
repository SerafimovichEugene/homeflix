import express from 'express';

const port = 8082;
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('./client/index.html');
  res.end();
});
app.all('*', (req, res) => {
  res.write("ooops...something go wrong");
  res.end();
});

app.listen(port, () => {
  console.log(`Running Express on port - ${port}`);
});
