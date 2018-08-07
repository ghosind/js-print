# js-print

js-print is a print plugin that based on pure Javascript.

## Usage

### Prototype Version

```html
<html>
    <head>
        ...
    </head>
    <body>
        ...
        <div id="test-print-area">
            ...
        </div>
        ...
    </body>
    <script async type="text/javascript" src="js-print.js"></script>
</html>
```

```js
var element = document.getElementById('test-print-area');
if (element) {
    element.print();    // unstyled
    element.print({ importCss: true });     // styled
}
```

### Function Version

```html
<html>
    <head>
        ...
    </head>
    <body>
        ...
        <div id="test-print-area">
            ...
        </div>
        ...
    </body>
    <script async type="text/javascript" src="js-print-function.js"></script>
</html>
```

```js
print({
    elementName: '.test-print-area',
    importCss: true
});
```
