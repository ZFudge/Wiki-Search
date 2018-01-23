const wiki = {
	search: document.getElementById('search'),
	container: document.getElementById('container'),
	focus: function() {
		wiki.search.style.width = '60vw';
	},
	unfocus: function() {
		wiki.search.style.width = '30vw';
	},
	requestSearch: function(searchTerm) {
		console.log('called');
		const xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				wiki.showResults(JSON.parse(xhr.response));
			}
		}
		xhr.open("GET", `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${searchTerm}&limit=10&origin=*&suggest=1`);
		xhr.send();
	},
	showResults: function(arr) {
		const newArr = [];
		for(let i = 0; i < arr[1].length; i++) {
			console.log(arr[1][i],arr[2][i],arr[3][i]);
			newArr.push(`<p><span>${arr[1][i]}</span><a target='_blank' href="${arr[3][i]}">${arr[2][i]}</a>`);
			const p = document.createElement('p');
			p.innerHTML = newArr[i];
			document.getElementById('results').appendChild(p);
		}
	}
};

wiki.search.addEventListener("focusin", wiki.focus);
wiki.search.addEventListener("focusout", wiki.unfocus);
wiki.search.addEventListener("keydown", function(btn) {
	if (btn.keyCode == 13) wiki.requestSearch(wiki.search.value);
});


