const express = require('express');

const app = express();

app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

app.get('/api/posts', (req, res) => {
  const posts = [
    {id: 1, body: 'Johe'},
    {id: 2, body: 'adasd'},
    {id: 3, body: 'aaas'},
  ];

  res.json(posts);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);