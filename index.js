// https://www.googleapis.com/books/v1/volumes/XA1evgEACAAJ
// request.open("GET", "https://www.googleapis.com/books/v1/volumes?q=isbn:9781566199094");



function getISBN(){
	var isbn = document.getElementById("isbn").value;
	var correctedISBN = cleanISBN(isbn);
	let request = new XMLHttpRequest();
	request.open("GET", "https://www.googleapis.com/books/v1/volumes?q=isbn:" + correctedISBN);
	request.send();
	request.onload = () => {
		console.log(request);
		try{
			if(request.status == 200){
				const json = JSON.parse(request.response);
				var arr = determineISBNTypes(json.items[0].volumeInfo.industryIdentifiers[0].identifier, json.items[0].volumeInfo.industryIdentifiers[1].identifier);
				var book = {
					title: json.items[0].volumeInfo.title,
					bookImage: json.items[0].volumeInfo.imageLinks.thumbnail,
					description: json.items[0].volumeInfo.description,
					isbn10: arr[0],
					isbn13: arr[1],
					authors: json.items[0].volumeInfo.authors,
					selflink: json.items[0].selfLink
				};
				//displayInfo(book);
				addRow(book);
				console.log(JSON.parse(request.response));
			}
			else{
				console.log(`error ${request.status} ${request.statusText}`);
			}
		}
		catch(err){
			try{
				if(request.status == 200){
				const json = JSON.parse(request.response);
				//var arr = determineISBNTypes(json.items[0]);
				var book = {
					title: json.items[0].volumeInfo.title,
					bookImage: "Images/NoImageAvailable2.jpg",
					description: json.items[0].volumeInfo.description,
					isbn10: json.items[0].volumeInfo.industryIdentifiers[0].identifier,
					isbn13: json.items[0].volumeInfo.industryIdentifiers[1].identifier,
					authors: json.items[0].volumeInfo.authors,
					selflink: json.items[0].selfLink
				};
				console.log(book);
				
				
				//displayInfo(book);
				addRow(book);
				console.log(JSON.parse(request.response));
			}
			}
			catch(err){
				var book = {
					title: "Unknown",
					bookImage: "Images/NoImageAvailable2.jpg",
					description: "Could not find ISBN in Google database.",
					isbn10: correctedISBN,
					isbn13: correctedISBN,
					authors: "Uknown",
					selflink: "https://www.googleapis.com/books/v1/volumes?q=isbn:" + correctedISBN
				};
				console.log(book);
				
				
				//displayInfo(book);
				addBadRow(book);
				//console.log(JSON.parse(request.response));
			}
			//document.getElementById("nothingReturned").innerHTML = "The ISBN number entered has returned nothing...";
		}
	}
}

function cleanISBN(isbn){
	var newISBN = isbn.split('-').join('');
	return newISBN;
}

function displayInfo(book){
	document.getElementById("title").innerHTML = book.title;
	document.getElementById("bookImage").src = book.bookImage;
	document.getElementById("description").innerHTML = book.description;
	document.getElementById("isbn10").innerHTML = "ISBN 10: " + book.isbn10;
	document.getElementById("isbn13").innerHTML = "ISBN 13: " + book.isbn13;
	document.getElementById("selflink").href = book.selflink;
	document.getElementById("selflink").innerHTML = "Click here for JSON";	
}

function addRow(book) {
  var table = document.getElementById("bookTable");
  var row = table.insertRow(1);
  var title = row.insertCell(0);
  var image = row.insertCell(1);
  var description = row.insertCell(2);
  var isbn10 = row.insertCell(3);
  var isbn13 = row.insertCell(4);
  var authors = row.insertCell(5);
  var removeRow = row.insertCell(6);
  var shortDesc = getFirstSentence(book.description);
  title.innerHTML = '<a id="' + book.isbn13 + '" class="link" href="' + book.selflink + '">' + book.title + '</a>';
  image.innerHTML = '<img style="display:block;" src="' + book.bookImage + '" />';
  description.innerHTML = '<p id="myBtn">' + shortDesc + '</p><div id="myModal" class="modal"><div class="modal-content"><span class="close">&times;</span><p>' + book.description + '</p></div></div>';
  description.style.width = '25%';
  isbn10.innerHTML = book.isbn10;
  isbn13.innerHTML = book.isbn13;
  authors.innerHTML = book.authors;
  removeRow.innerHTML = '<input type="button" value="Delete" onclick="deleteRow(this)">';
  var modal = document.getElementById("myModal");
  var btn = document.getElementById("myBtn");
  var span = document.getElementsByClassName("close")[0];



  btn.onclick = function() {
    modal.style.display = "block";
  }

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

//document.getElementById("mytable").getElementsByTagName("td");
function addBadRow(book) {
  var table = document.getElementById("bookTable");
  var row = table.insertRow(1);
  var title = row.insertCell(0);
  var image = row.insertCell(1);
  var description = row.insertCell(2);
  var isbn10 = row.insertCell(3);
  //var isbn13 = row.insertCell(4);
  var authors = row.insertCell(5);
  var removeRow = row.insertCell(6);
  var shortDesc = book.description;
  var modalDescription = "We compared the given ISBN against a Google ISBN database and came up with inconclusive results. We will provide a link under ISBN-10 and ISBN-13 sections. This will take you to another ISBN database that might display desirable results.";
  title.innerHTML = '<a id="' + book.isbn13 + '" class="link" href="' + book.selflink + '">' + book.title + '</a>';
  image.innerHTML = '<img style="display:block;" src="' + book.bookImage + '" />';
  description.innerHTML = '<p id="myBtn">' + shortDesc + '</p><div id="myModal" class="modal"><div class="modal-content"><span class="close">&times;</span><p>' + book.description + '</p></div></div>';
  description.style.width = '25%';
  isbn10.innerHTML = '<a id="' + book.isbn10 + '" class="link" href="https://isbndb.com/book/' + book.isbn10 + '">Try ISBN-10 search</a>';
  isbn13.innerHTML = '<a id="' + book.isbn13 + '" class="link" href="https://isbndb.com/book/' + book.isbn13 + '">Try ISBN-13 search</a>';
  authors.innerHTML = book.authors;
  removeRow.innerHTML = '<input type="button" value="Delete" onclick="deleteRow(this)">';
  var modal = document.getElementById("myModal");
  var btn = document.getElementById("myBtn");
  var span = document.getElementsByClassName("close")[0];



  btn.onclick = function() {
    modal.style.display = "block";
  }

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}




function determineISBNTypes(length0, length1){
	var isbnLengths = new Array(2);
	if(length0.length > length1.length){
		isbnLengths[1] = length0; //Obj at index 1 is ISBN-13
		isbnLengths[0] = length1; //Obj at index 0 is ISBN-10
	}
	else{
		isbnLengths[1] = length1; //Obj at index 1 is ISBN-13
		isbnLengths[0] = length0; //Obj at index 0 is ISBN-10
	}
	return isbnLengths;
}

function getFirstSentence(paragraghDesc){
	const regex = /.*?(\.)(?=\s[A-Z])/;
	const str = paragraghDesc;
	let m;

	if ((m = regex.exec(str)) !== null) {
		//console.log(m[0]);
	}
	return m[0];
}

function deleteRow(r) {
  var i = r.parentNode.parentNode.rowIndex;
  document.getElementById("bookTable").deleteRow(i);
}












