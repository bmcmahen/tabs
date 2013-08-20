
# tabs

  a small helper view for managing tabs

## Installation

  Install with [component(1)](http://component.io):

    $ component install bmcmahen/tabs

## Example

Styles:

```css
h3 {
	display: none;
}

h3.show {
	display: block;
}

a.active {
	background: blue;
}
```

Javascript:

```javascript
var Tabs = require('tabs');

var el = document.createElement('h3');
el.textContent = 'bacon1';

var el2 = document.createElement('h3');
el2.textContent = 'bacon2';

var el3 = document.createElement('h3');
el3.textContent = 'bacon3';

var tabs = new Tabs()
	.add('Tab One', el)
	.add('Tab Two', el2)
	.add('Tab three', el3)
	.show(0);

document.body.appendChild(tabs.el);
document.body.appendChild(tabs.content);

tabs.on('showing', function(i, tab, content){
	console.log('showing!', i);
});

setTimeout(function(){
	tabs.unbind();
}, 10000);
```



## License

  MIT
