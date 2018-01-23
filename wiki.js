const wiki = {
	search: document.getElementById('search'),
	container: document.getElementById('container'),
	results: document.getElementById('results'),
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
		while (wiki.results.lastChild) {
		    wiki.results.removeChild(wiki.results.lastChild);
		}
		const newArr = [];
		for(let i = 0; i < arr[1].length; i++) {
			arr[2][i] = arr[2][i] || "No preview content available for this article.";
			newArr.push(`<h4>${arr[1][i]}</h4>
						<div>${arr[2][i]}</div>`);
			const p = document.createElement('p');
			const a = document.createElement('a');
			a.setAttribute("target", "_blank");
			a.setAttribute("href", `${arr[3][i]}`);
			a.innerHTML = newArr[i];
			p.appendChild(a);
			wiki.results.appendChild(p);
		}
	}
};

wiki.search.addEventListener("focusin", wiki.focus);
wiki.search.addEventListener("focusout", wiki.unfocus);
wiki.search.addEventListener("keydown", function(btn) {
	if (btn.keyCode == 13) wiki.requestSearch(wiki.search.value);
});


