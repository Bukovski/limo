# Scrollto v.1.0.0

jQuery helper plugin, scrolls page to destination container.

**Requirements:**

* jQuery

**How to use:**

``` HTML
<a href="#container" class="js-scrollto">Scroll to</a>
...
<div id="container">Container</div>
```

``` JavaScript
if ($.fn.scrolltoSetup) {
  $('.js-scrollto').scrolltoSetup({
		animationSpeed: 2000,
		additionalHeight: 100
	});
}
```

Copyright 2015 Michał Pacek

Licensed under the Apache License, Version 2.0.
