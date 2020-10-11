const express = require('express');
const app = express();
const conn = require('./db_config');
const port = 3000;
const newBlogRouter = require('./routes/blog');

app.use(express.static('public'));

app.listen(port, (req, res) =>{
  console.log(`Listening on port ${3000}`);
})

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}))
app.use('/blogs', newBlogRouter);

app.get('/', (req, res) =>{
  conn.query(
    'SELECT * FROM blogs',
    (err, results) =>{
      if(err) throw err;
      res.render('index', {blogs: results});
    }
  )
})

// app.get('/blogs/:id', (req, res) =>{
//   console.log('blog view');
//   conn.query(
//     'SELECT * FROM blogs WHERE blog_id = ?',
//     [req.params.id],
//     (err, results) =>{
//       if(err) throw err;
//       res.render('blog', {blog: results[0]})
//     }
//   )
// })

// app.get('/blogs/new', (req, res) =>{
//   console.log('new');
//   res.render('new');
// })

// app.post('/blogs/create', (req, res) =>{
//   console.log('create');
//   conn.query(
//     'INSERT INTO blogs(blog_title, blog_snippet, blog_body) VALUES(?, ?, ?)',
//     [req.body.blog-title, req.body.blog-snippet, req.body.blog-body],
//     (err, results) =>{
//       if(err) throw err;
//       console.log(results);
//     }
//   )
// })