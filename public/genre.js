		//Add new genre
	  	 document.getElementById("submitadd").addEventListener("click", function(){
		  var genreselected = document.getElementById("submitadd").value 

          var genre = document.getElementById("addgenreName").value 
          var req = new XMLHttpRequest();
          req.open("GET", "http://flip3.engr.oregonstate.edu:22225/genreadd?newgenre="+genre, true);

		 req.addEventListener("load", function(){
		 console.log("event loaded")
		 window.location.href = "http://flip3.engr.oregonstate.edu:22225/genre";
		 })

          req.send(null);

          event.preventDefault();
	 
	    });

		//Delete genre
		  document.getElementById("submitdelete").addEventListener("click", function(){

          var genre = document.getElementById("deletegenreName").value 
          var req = new XMLHttpRequest();
          req.open("GET", "http://flip3.engr.oregonstate.edu:22225/genredelete?genre="+genre, true);
		  console.log(req);
		  console.log("TEST HERE")

		 req.addEventListener("load", function(){
		 console.log("event loaded")
		 window.location.href = "http://flip3.engr.oregonstate.edu:22225/genre";
		 })

          req.send(null);
          event.preventDefault();
	 
	    });


		//Update genre		
		  document.getElementById("updategenresubmit").addEventListener("click", function(){

          var genreold = document.getElementById("oldgenre").value 
          var genrenew = document.getElementById("newgenre").value 

          var req = new XMLHttpRequest();
          req.open("GET", "http://flip3.engr.oregonstate.edu:22225/genreupdate?genrenew="+genrenew+"&genreold="+genreold, true);
		 req.addEventListener("load", function(){
		 window.location.href = "http://flip3.engr.oregonstate.edu:22225/genre";
		 })




          req.send(null);

          event.preventDefault();
	 
	    });