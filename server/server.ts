import * as express from 'express';
import * as path from 'path';

const port = 8080;
const app = express();
app.use(express.static(__dirname));
app.get('/', (req, res) => {

  res.sendFile(path.join(__dirname + '/index.html'));
  // res.end();
});

app.all('*', (req, res) => {
  res.write('ooops...something go wrong');
  res.end();
});

app.listen(port, () => {
  console.log(`Running Express on port - ${port}`);
});
