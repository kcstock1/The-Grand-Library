	//Implement book search logic based on search bar
      document.getElementById("searchsubmit").addEventListener("click", function(){
		  var title = document.getElementById("searchboxtitle").value 
          var author = document.getElementById("searchboxauth").value 
          var genre = document.getElementById("searchboxgenre").value 

          var req = new XMLHttpRequest();
          req.open("GET", "http://flip3.engr.oregonstate.edu:22225/book?title="+title+"&author="+author+"&genre="+genre, true);
		  console.log(req);
		  console.log("TEST HERE")
          req.send(null);

          event.preventDefault();
        });


