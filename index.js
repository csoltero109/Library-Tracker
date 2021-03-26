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
					bookImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
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
  title.innerHTML = '<a id="' + book.isbn13 + '" class="link" href="' + book.selflink + '">' + book.title + '</a>';
  image.innerHTML = '<img style="display:block;" src="' + book.bookImage + '" />';
  description.innerHTML = book.description;
  description.style.width = '25%';
  isbn10.innerHTML = book.isbn10;
  isbn13.innerHTML = book.isbn13;
  authors.innerHTML = book.authors;
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















