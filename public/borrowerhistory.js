
		//Add new borrowing history
	  	 document.getElementById("borrowsubmit").addEventListener("click", function(){
          var req = new XMLHttpRequest();
		  var duedate = document.getElementById("borrowduedate").value 
		  var returneddate = document.getElementById("borrowreturndate").value 

		   var bookoptions = document.getElementById( "bookoptions" );
		   var title = bookoptions.options[ bookoptions.selectedIndex ].value 

		   var borroweroptions = document.getElementById( "borroweroptions" );
		   var name = borroweroptions.options[ borroweroptions.selectedIndex ].value 

           req.open("GET", "http://flip3.engr.oregonstate.edu:22225/borrowerhistoryadd?duedate="+duedate+"&returneddate="+returneddate+"&name="+name+"&title="+title, true);
	       req.addEventListener("load", function(){		
		   window.location.href = "http://flip3.engr.oregonstate.edu:22225/borrowerhistory";
		    })
          req.send(null);
		 		  
          event.preventDefault();
	 
	    });

    //Delete a borrower entry based on user selection of delete button
	document.querySelector('body').addEventListener('click', function(event){		
		 if (event.target.getAttribute('name') == "delete")
		{		
			console.log("Deletion")
			var deleteid = event.target.id
			var req = new XMLHttpRequest();
			req.open("GET", "http://flip3.engr.oregonstate.edu:22225/borrowerhistorydelete?deleteid="+deleteid, true);
			console.log(deleteid)

	     req.addEventListener("load", function(){
		 console.log("event loaded")
		 window.location.href = "http://flip3.engr.oregonstate.edu:22225/borrowerhistory";
		 })
			req.send()
			event.preventDefault();		 
		 }

	});

		//Dynamically populate the drop down for available borrowers
		//https://www.techiedelight.com/dynamically-create-drop-down-list-javascript/#:~:text=To%20add%20a%20drop%2Ddown,appendChild()%20method%20or%20jQuery's%20.
		window.onload = function() {
				 function loadborrowers()
				 {
					      var select = document.getElementById("borroweroptions")		  
						  var req = new XMLHttpRequest();
						  req.open("GET", "http://flip3.engr.oregonstate.edu:22225/getborrowers", true);		
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
						 document.getElementById("container2").appendChild(select);
										
							});
		
						req.send(null);			
				 }

				 loadborrowers();

		//Dynamically populate the drop down for available books
		  var select = document.getElementById("bookoptions")		  
		  var req = new XMLHttpRequest();
		  req.open("GET", "http://flip3.engr.oregonstate.edu:22225/getbooks", true);		
		  req.addEventListener("load", function(){				
                var resp = JSON.parse(req.responseText) 
				
				  resp.forEach(line);
				function line(item) {					
					var option = document.createElement("option");
					option.value = item.title;
					option.text = item.title;
					select.appendChild(option);	
																		
				}
			 document.getElementById("container").appendChild(select);
							
				});

			req.send(null);			
		 
	};