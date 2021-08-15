// JavaScript source code

//https://medium.com/@waelyasmina/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65

var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main',layoutsDir: __dirname + '/views/layouts'});
var bodyParser = require("body-parser");
var mysql = require("./dbcon.js");
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);


//Route for adding books
app.get('/bookadd',function(req,res,next){
  var context = {};

//help from https://stackoverflow.com/questions/6752714/if-input-value-is-blank-assign-a-value-of-empty-with-javascript
  mysql.pool.query("INSERT INTO book (`title`,`author`,`genre_id`) VALUES (?,?,(select genre_id from genre where genre.name = ?))", [req.query.addbooktitle,req.query.addbookauth,req.query.addbookgenre], function(err, result){
    if(err){
        //next(err);
		console.log(err);
        return;
    }
	res.send(null)

  });

});

//Route for displaying genre
app.get('/genre',function(req,res,next){
  var context = {};
  console.log("Genre Request Recieved")

  mysql.pool.query('SELECT * FROM genre', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }

    context.results = JSON.stringify(rows);

	res.render('genre',{items:rows})

});
});


//Route for displaying genre admin page
app.get('/admingenre',function(req,res,next){
  var context = {};

	res.render('admingenre',context)

});

//Route for displaying book admin page
app.get('/adminbook',function(req,res,next){
  var context = {};

	res.render('adminbook',context)

});

//Route for deleting books
app.get('/bookdelete',function(req,res,next){
  var context = {};
  mysql.pool.query('DELETE FROM book WHERE title = ? and author = ?',[req.query.deletebooktitle,req.query.deletebookauthor], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
	res.send(null)
	

});
});

//Route for updating books
app.get('/bookupdate',function(req,res,next){
  var context = {};
  console.log("Book Update Request Received")
  //console.log(req)
  mysql.pool.query("UPDATE book SET title = ?, author = ?, genre_id = (select genre.genre_id from genre where genre.name = ?) WHERE book.title = ? AND book.author = ? AND book.genre_id = (select genre.genre_id from genre where genre.name = ?)",[req.query.updatebooktitle,req.query.updatebookauthor,req.updatebookgenre,req.existingbooktitle,req.existingbookauthor,req.existingbookgenre], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }


});
});

//Route for adding genres
app.get('/genreadd',function(req,res,next){
  var context = {};
  console.log("Genre Request Recieved")

  mysql.pool.query('INSERT INTO `genre`(name,is_restricted) VALUES ((?),"0")',[req.query.newgenre], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }

	res.send(null);

});
});

//Route for deleting genres
app.get('/genredelete',function(req,res,next){
  var context = {};
  console.log("Genre Request Recieved")

  mysql.pool.query('DELETE FROM `genre` WHERE name = (?)',[req.query.genre], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }

	 res.send(null);


});
});

//Route for updating genres
app.get('/genreupdate',function(req,res,next){
  var context = {};
  console.log("Genre Request Recieved")

  mysql.pool.query("UPDATE `genre` SET name = ? WHERE genre.name = ?",[req.query.genrenew,req.query.genreold], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }

	res.send(null)

});
});


//Route for displaying the admin page with options to go to specific admin pages for book, genre or borrower
app.get('/admin',function(req,res,next){
  var context = {};
	res.render('admin',context)

});

//Home page route. This should display all available books in the libray
app.get('/home',function(req,res,next){
  var context = {};
  console.log("Request Recieved")

  mysql.pool.query('SELECT book_id,title,author,(select name from genre where genre.genre_id = book.genre_id) as genre FROM book', function(err, rows, fields){

    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);

	res.render('home',{items:rows})

  });
});



//Advanced search. Display all books that are related to atleast one of the criteria passed in. 
app.get('/book',function(req,res,next){
  var context = {};
  console.log("Request Recieved")

  mysql.pool.query('SELECT book_id,title,author,(select name from genre where genre.genre_id = book.genre_id) as genre FROM book where title = (?) or author = (?) or (select name from genre where genre.genre_id = book.genre_id) = (?)',[req.query.searchboxtitle,req.query.searchboxauth,req.query.searchboxgenre], function(err, rows, fields){

    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    //res.render('home', context);
	console.log("TEST HERE")
	res.render('book',{items:rows})

  });
});




//Display all available borrower history. Make sure to pass over the record id so that handlebars is able to add a delete button with the correct id.
app.get('/borrowerhistory',function(req,res,next){
  var context = {};
  console.log("Request Recieved")

  mysql.pool.query('SELECT (select borrower.name from borrower where borrower.borrower_id = Borrower_Borrowing_History.borrower_id) as Borrower,(select book.title from book where book.book_id = (select book_borrowing_history.book_id from book_borrowing_history where book_borrowing_history.borrowing_history_id = Borrower_Borrowing_History.borrowing_history_id LIMIT 1)) as title,(select borrowing_history.due_date from borrowing_history where borrowing_history.borrowing_history_id = Borrower_Borrowing_History.borrowing_history_id) as DueDate, (select borrowing_history.returned_date from borrowing_history where  borrowing_history.borrowing_history_id = Borrower_Borrowing_History.borrowing_history_id) as returnDate,borrowing_history_id as id FROM Borrower_Borrowing_History', function(err, rows, fields){

    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);

	res.render('borrowerhistory',{items:rows})

  });
});


//Route to add new borrower histories. This is the M:M relationship.
//help from https://stackoverflow.com/questions/6752714/if-input-value-is-blank-assign-a-value-of-empty-with-javascript  
app.get('/borrowerhistoryadd',function(req,res,next){
  var context = {};
	 mysql.pool.query("INSERT INTO borrowing_history(due_date,returned_date) values (?,?);INSERT INTO Borrower_Borrowing_History(borrower_id,borrowing_history_id) VALUES((select borrower_id from borrower where borrower.name = ?),(select borrowing_history_id from borrowing_history where borrowing_history.due_date = ? LIMIT 1)); INSERT INTO book_borrowing_history(borrowing_history_id,book_id) VALUES((select borrowing_history_id from borrowing_history where borrowing_history.due_date =? LIMIT 1),(select book.book_id from book where book.title = ?));SELECT (select borrower.name from borrower where borrower.borrower_id = Borrower_Borrowing_History.borrower_id) as Borrower,(select book.title from book where book.book_id = (select book_borrowing_history.book_id from book_borrowing_history where book_borrowing_history.borrowing_history_id = Borrower_Borrowing_History.borrowing_history_id LIMIT 1)) as title,(select borrowing_history.due_date from borrowing_history where borrowing_history.borrowing_history_id = Borrower_Borrowing_History.borrowing_history_id) as DueDate, (select borrowing_history.returned_date from borrowing_history where  borrowing_history.borrowing_history_id = Borrower_Borrowing_History.borrowing_history_id) as returnDate FROM Borrower_Borrowing_History", [req.query.duedate,req.query.returneddate,req.query.name,req.query.duedate,req.query.duedate,req.query.title], function(err,rows,result){ 
    if(err){
        //next(err);
		console.log(err);
        return;
    }
	 context.results = JSON.stringify(rows);
	 res.send(context.results)
  });

});

//Route to delete borrower history. This will be called on the front end by a user clicking the 'delete' button with the id equal to the record id of the borrowing_history_id.
app.get('/borrowerhistorydelete',function(req,res,next){
  var context = {};
  mysql.pool.query("DELETE FROM Borrower_Borrowing_History where borrowing_history_id = ?; DELETE FROM book_borrowing_history where borrowing_history_id =?; DELETE FROM borrowing_history where borrowing_history_id = ?;",[req.query.deleteid,req.query.deleteid,req.query.deleteid],function(err,rows,result){
      if(err){
        //next(err);
		console.log(err);
        return;
    }

	res.send(null)
	 });
  })


//Route to get genres and populate the dynamic dropdown.
  app.get('/getgenres',function(req,res,next){
  var context = {};
  mysql.pool.query("select name from genre",function(err,rows,result){
      if(err){
        //next(err);
		console.log(err);
        return;
    }
    context.results = JSON.stringify(rows);
	console.log(context.results)
	 res.send(context.results)


	 });
  })

  //Route to get books and populate the dynamic dropdown.
  app.get('/getbooks',function(req,res,next){
  var context = {};
  mysql.pool.query("select title from book",function(err,rows,result){
      if(err){
        //next(err);
		console.log(err);
        return;
    }
    context.results = JSON.stringify(rows);
	console.log(context.results)
	 res.send(context.results)


	 });
  })

  //Route to get borrowers and populate the dynamic dropdown.
  app.get('/getborrowers',function(req,res,next){
  var context = {};
  mysql.pool.query("select name from borrower",function(err,rows,result){
      if(err){
        //next(err);
		console.log(err);
        return;
    }
    context.results = JSON.stringify(rows);
	console.log(context.results)
	 res.send(context.results)

	 });
  })

  //Route to get borrowers and display back to user.
  app.get('/borrower',function(req,res,next){
  var context = {};
  console.log("Borrower Request Recieved 1")

  mysql.pool.query('SELECT * FROM borrower', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }

    context.results = JSON.stringify(rows);	
	res.render('borrower',{items:rows})

});
});


  //Route to get admin borrower page and display back to the user
app.get('/adminborrower',function(req,res,next){
  var context = {};
	res.render('adminborrower',context)

});

  //Route add new borrower
app.get('/borroweradd',function(req,res,next){
  var context = {};
  console.log("Borrower Request Recieved 2")

  mysql.pool.query('INSERT INTO `borrower`(name,is_restricted) VALUES ((?),"0")',[req.query.newborrower], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }

	res.send(null)

});
});

//Route delete borrower
app.get('/borrowerdelete',function(req,res,next){
  var context = {};
  console.log("Borrower Request Recieved 3")

  mysql.pool.query("DELETE FROM borrower WHERE name = ?",[req.query.delborrower], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }

	res.send(null)

});
});


app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

