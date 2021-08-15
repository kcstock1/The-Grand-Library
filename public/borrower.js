// JavaScript source code

document.getElementById("submitadd").addEventListener("click", function(){
      var borrower = document.getElementById("addborrowerName").value 
      var req = new XMLHttpRequest();
      req.open("GET", "/borroweradd?newborrower="+borrower, true);
  	  req.addEventListener("load", function(){
			 console.log("event loaded")
			 window.location.href = "http://flip3.engr.oregonstate.edu:22225/borrower";
		 })



      req.send(null);

      event.preventDefault();

  });


  document.getElementById("submitdelete").addEventListener("click", function(){

      var borrower = document.getElementById("deleteborrowerName").value 
      var req = new XMLHttpRequest();
      req.open("GET", "/borrowerdelete?delborrower="+borrower, true);

	  req.addEventListener("load", function(){
			 console.log("event loaded")
			 window.location.href = "http://flip3.engr.oregonstate.edu:22225/borrower";
		 })



      req.send(null);

      event.preventDefault();

  });



  
