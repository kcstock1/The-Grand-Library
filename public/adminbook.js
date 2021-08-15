// JavaScript source code
		//Add New Book Route
	  	 document.getElementById("addsubmit").addEventListener("click", function(){

          var req = new XMLHttpRequest();
		  var addbooktitle = document.getElementById("addbooktitle").value 
		  var addbookauth = document.getElementById("addbookauth").value 	  
		  var genreoptions = document.getElementById( "genreoptions" );
		  var addbookgenre =  genreoptions.options[ genreoptions.selectedIndex ].value 

          req.open("GET", "http://flip3.engr.oregonstate.edu:22225/bookadd?addbooktitle="+addbooktitle+"&addbookauth="+addbookauth+"&addbookgenre="+addbookgenre, true);
		  req.addEventListener("load", function(){
			 console.log("event loaded")
			 window.location.href = "http://flip3.engr.oregonstate.edu:22225/home";
		 })

          req.send(null);

          event.preventDefault();
	 
	    });

		 //Delete Book Route
		  document.getElementById("deletesubmit").addEventListener("click", function(){
		  var deletebooktitle = document.getElementById("deletebooktitle").value 
		  var deletebookauthor = document.getElementById("deletebookauthor").value 

          var req = new XMLHttpRequest();
		  req.open("GET", "http://flip3.engr.oregonstate.edu:22225/bookdelete?deletebooktitle="+deletebooktitle+"&deletebookauthor="+deletebookauthor, true);

		req.addEventListener("load", function(){
			 console.log("event loaded")
			 window.location.href = "http://flip3.engr.oregonstate.edu:22225/home";
		 })

          req.send(null);

          event.preventDefault();
	 
	    });

		//Code for dynamic genre select box
		//https://www.techiedelight.com/dynamically-create-drop-down-list-javascript/#:~:text=To%20add%20a%20drop%2Ddown,appendChild()%20method%20or%20jQuery's%20.
		window.onload = function() {
		   var select = document.getElementById("genreoptions")		  
		  var req = new XMLHttpRequest();
		  req.open("GET", "http://flip3.engr.oregonstate.edu:22225/getgenres", true);		
		  req.addEventListener("load", function(){				
                var resp = JSON.parse(req.responseText) 
				console.log(resp);		
				
				resp.forEach(line);
				function line(item) {	
					var option = document.createElement("option");
					option.value = item.name;
					option.text = item.name;
					select.appendChild(option);	
																		
				}
			 document.getElementById("container").appendChild(select);
							
				});

			req.send(null);			
		 
	};


