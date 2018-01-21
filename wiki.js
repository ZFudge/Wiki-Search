const wiki = {
	search: document.getElementById('search'),
	container: document.getElementById('container'),
	focus: function() {
		wiki.search.style.width = '60vw';
		wiki.container.style.marginLeft = '-30vw';
	},
	unfocus: function() {
		wiki.search.style.width = '30vw';
		wiki.container.style.marginLeft = '-15vw';
	}
};
wiki.search.addEventListener("focusin", wiki.focus);
wiki.search.addEventListener("focusout", wiki.unfocus);

