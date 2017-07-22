'use strict';


var App = {
	url: 'data.json',
	items: [],
	container : document.getElementById("container"),
	button : document.getElementById("btn-sort"),
	sortBy: 'ASC',


	init: function(){
		getObjects(this.url);
		this.button.onclick = this.buttonClick;
	},
	buttonClick: buttonClick,
	render: render,
	sort: sort
}

console.log(App);

function getObjects(url){

	// take json from url
	$.getJSON(url, function(data) {
		parseObj(data);
		App.render();
	});

	// parse json object to array
	var i = 0;
	function parseObj(data) {	
		for (var key in data) {
			if (typeof data[key] !== 'object') {
				App.items.push({ 'order': key, 'color': data[key], 'parseOrder' : i});console.log(i);
			} else {
				parseObj(data[key]);
				i--;
				}
			i++;
		}
		
	}

}


function render() {
	var self = this; //App
	var borderWidth;
	var item;

	// clear container
	self.container.innerHTML = '';

	for (var i = 0; i < self.items.length; i++) {
		
		item = document.createElement("div");
		item.innerHTML = '<span>' + self.items[i]['order'] + '</span>';
		item.className += 'square';
		self.container.appendChild(item);

		borderWidth = item.style.borderWidth = self.items[i].order + "px";
		item.style.borderStyle = 'solid';

		if (self.items[i].order % 2 == 0) {
			item.style.borderColor = self.items[i].color;
		} else {
			item.style.background = self.items[i].color;
			item.setAttribute('data-color', self.items[i].color);
		}

		if (!(i % 3)) {
			item.style.clear = 'left';
		}
		if (!((i + 1) % 2)) {
			item.style.boxShadow = '3px 3px 7px 2px #333';
		}

		item.onmouseover = item.onmouseout = mouseOverOut;
		item.onclick = mouseClick;
	}
}

function buttonClick() {
	App.sort();
	App.render();
	
}

function mouseOverOut(event) {
	if (event.type == 'mouseover') {
		if (event.target.previousSibling != null) {
			event.target.previousSibling.style.background = 'yellow';
			
		}
		if (event.target.nextSibling != null) {
			event.target.nextSibling.style.opacity = '0.5';
			
		}
	}
	if (event.type == 'mouseout') {
		if (event.target.previousSibling != null) {
			var back = event.target.previousSibling.dataset.color;
			event.target.previousSibling.style.background = '';
			event.target.previousSibling.style.background = back;
		}
		if (event.target.nextSibling != null) {
			event.target.nextSibling.style.opacity = '';
		}
	}
}

function mouseClick(e) {
	var clickBorderStart = e.currentTarget.style.borderWidth;
	var clickBorderEnd = parseInt(clickBorderStart) * 3 + 'px';

	if (e.type == 'click' && !e.currentTarget.classList.contains('second-border')) {
		e.currentTarget.style.borderWidth = clickBorderEnd;
		e.currentTarget.classList.add('second-border');
	} else {
		e.currentTarget.style.borderWidth = parseInt(clickBorderStart) / 3 + 'px';
		e.currentTarget.classList.remove('second-border');
	}
}

function sort() {

	console.log(this.sortBy);
	switch(this.sortBy) {

		case 'ASC' :
			this.items = this.items.sort(function(b, a) {
				return (b.order - a.order);
			});
			this.sortBy = 'DESC';

			break;

		case 'DESC' :
			this.items = this.items.sort(function(b, a) {
					return (a.order - b.order);
				});
			this.sortBy = 'default';

			break;
		default: 
			this.items = this.items.sort(function(b, a) {
				return (b.parseOrder - a.parseOrder);
			});
			this.sortBy = 'ASC';
			break;
	}
}


App.init();

// localStorage.setItem("Ключ", JSON.stringify(App));

// var App = {};
// if (localStorage.getItem("Ключ")) {
//   App = JSON.parse(localStorage.getItem("Ключ"));
// }