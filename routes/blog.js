const express = require('express');
const router = express.Router();
const conn = require('../db_config');

router.get('/new', (req, res) =>{
  res.render('new')
})

router.get('/:id', (req, res) =>{
  conn.query(
    'SELECT * FROM blogs WHERE blog_id = ?',
    [req.params.id],
    (error, results) =>{
      if(error) throw error;
      res.render('blog', {blog: results[0]})
    }
  )
})

router.post('/create', (req, res) =>{
  conn.query(
    'INSERT INTO blogs(blog_title, blog_snippet, blog_body) VALUES(?, ?, ?)',
    [req.body.title, req.body.snippet, req.body.body],
    (error, results) =>{
      if(error) throw error;
      res.redirect('/');
    }
  )
})

router.get('/edit/:id', (req, res) =>{
  conn.query(
    'SELECT * FROM blogs WHERE blog_id = ?',
    [req.params.id],
    (error, results) =>{
      if(error) throw error;
      res.render('edit', {blog: results[0]});
    }
  )
})

router.post('/update/:id', (req, res) =>{
  conn.query(
    `UPDATE blogs SET blog_title = ?, blog_snippet = ?, blog_body = ? WHERE blog_id = ?`,
    [req.body.title, req.body.snippet, req.body.body, req.params.id],
    (error, results) =>{
      if(error) throw error;
      res.redirect('/')
    }
  )
})

router.post('/delete/:id', (req, res) =>{
  conn.query(
    'DELETE FROM blogs WHERE blog_id = ?',
    [req.params.id],
    (error, results) =>{
      res.redirect('/');
    }
  )
})

module.exports = router;