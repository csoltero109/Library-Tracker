// https://www.googleapis.com/books/v1/volumes/XA1evgEACAAJ

// https://www.googleapis.com/books/v1/volumes/XA1evgEACAAJ
/*function cleanISBN(isbn){
	var newISBN = isbn.split('-').join('');
	return newISBN;
}*/

function getISBN(){
	var isbn = document.getElementById("isbn").value;
	//var cleanISBN = cleanISBN(isbn);
	let request = new XMLHttpRequest();
	request.open("GET", "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn);
	// request.open("GET", "https://www.googleapis.com/books/v1/volumes?q=isbn:9781566199094");
	request.send();
	request.onload = () => {
		console.log(request);
		try{
			if(request.status == 200){
				const json = JSON.parse(request.response);
				
				var book = {
					title: json.items[0].volumeInfo.title,
					bookImage: json.items[0].volumeInfo.imageLinks.thumbnail,
					description: json.items[0].volumeInfo.description,
					isbn10: json.items[0].volumeInfo.industryIdentifiers[1].identifier,
					isbn13: json.items[0].volumeInfo.industryIdentifiers[0].identifier,
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
			document.getElementById("nothingReturned").innerHTML = "The ISBN number entered has returned nothing...";
		}
	}
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
  var selfLink = row.insertCell(5);
  title.innerHTML = book.title;
  image.innerHTML = '<img style="display:block;" src="' + book.bookImage + '" />';
  description.innerHTML = book.description;
  description.style.width = '25%';
  isbn10.innerHTML = book.isbn10;
  isbn13.innerHTML = book.isbn13;
  selfLink.innerHTML = '<a id="' + book.title + '" class="link" href="' + book.selflink + '">JSON</a>';
  //selfLink.href = book.selflink
}