var Emitter = require('emitter');
var events = require('event');
var classes = require('classes');
var bind = require('bind');
var each = require('each');


/**
 * Tabs Constructor
 */

function Tabs(){
	this.el = document.createElement('ul');
	this.content = document.createElement('div');
	classes(this.content).add('tab-content');
	classes(this.el).add('tabs');
	this.tabs = [];
	this.tabContent = [];
}

module.exports = Tabs;

Emitter(Tabs.prototype);

/**
 * Add a tab
 * @param  {String} name
 * @param  {Element} el   main content dom element
 * @return {Tabs}
 */

Tabs.prototype.add = function(name, el){
	var tab = new Tab(name, this.tabs.length);
	this.tabContent.push(el);
	this.tabs.push(tab);
	tab.on('selected', bind(this, this.show));
	this.el.appendChild(tab.el);
	this.content.appendChild(el);
	return this;
};

/**
 * Show an element
 * @param  {Number} i index of tab to show
 * @return {Tabs}
 */

Tabs.prototype.show = function(i){

	if (this.active) {
		classes(this.active).remove('show');
		this.activeTab.out();
	}

	this.active = this.tabContent[i];
	this.activeTab = this.tabs[i];

	classes(this.active).add('show');
	this.activeTab.in();

	this.emit('showing', i, this.active, this.activeTab);
	return this;
};

Tabs.prototype.unbind = function(){
	each(this.tabs, function(tab){
		tab.unbind();
		tab.off('selected');
	});
};


/**
 * Tab Constructor
 * @param {String} name of tab
 * @param {Number} i    index of tab
 */

function Tab(name, i){
	this.name = name;
	this.i = i;
	this.el = document.createElement('li');
	var a = this.a = document.createElement('a');
	a.href='#';
	a.textContent = name;
	this.el.appendChild(a);
	var self = this;
	this.onclick = function(e){
		e.preventDefault();
		self.emit('selected', i);
	}
	events.bind(this.el, 'click', this.onclick);
}

Emitter(Tab.prototype);

Tab.prototype.in = function(){
	classes(this.a).add('active');
}

Tab.prototype.out = function(){
	classes(this.a).remove('active');
};

Tab.prototype.unbind = function(){
	events.unbind(this.el, 'click', this.onclick);
};


