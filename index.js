// https://www.googleapis.com/books/v1/volumes/XA1evgEACAAJ

function getISBN(){
	var isbn = document.getElementById("isbn").value;
	let request = new XMLHttpRequest();
	request.open("GET", "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn);
	// request.open("GET", "https://www.googleapis.com/books/v1/volumes?q=isbn:9781566199094");
	request.send();
	request.onload = () => {
		console.log(request);
		try{
			if(request.status == 200){
				const json = JSON.parse(request.response);
				document.getElementById("title").innerHTML = json.items[0].volumeInfo.title;
				document.getElementById("bookImage").src = json.items[0].volumeInfo.imageLinks.thumbnail;
				document.getElementById("description").innerHTML = json.items[0].volumeInfo.description;
				document.getElementById("isbn10").innerHTML = "ISBN 10: " + json.items[0].volumeInfo.industryIdentifiers[0].identifier;
				document.getElementById("isbn13").innerHTML = "ISBN 13: " + json.items[0].volumeInfo.industryIdentifiers[1].identifier;
				document.getElementById("selflink").href = json.items[0].selfLink;
				document.getElementById("selflink").innerHTML = "Click here for JSON";
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