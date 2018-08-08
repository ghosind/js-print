/**
 * js-print
 * A Javascript print plugin.
 * @author Chen Su <ghosind@gmail.com>
 */

/**
 * print specified element.
 * @param options 
 */
var print = function(options) {
    var iFrame;
    var iFrameWindow;
    var loadingCount = 0;

    try {
        // create new iframe
        iFrame = document.createElement('iframe');

        // hide iframe
        iFrame.style.width = 0;
        iFrame.style.height = 0;
        iFrame.style.border = 0;

        // add iframe into body
        document.body.appendChild(iFrame);

        // add print contents into iframe
        iFrame.contentDocument.body.appendChild(this.cloneNode(true));

        // get iframe's contentWindow
        iFrameWindow = iFrame.contentWindow;

        if (options && options.importCss) {
            // clear loading count
            loadingCount = 0;

            // add styles into head
            var head = iFrame.contentDocument.head;
            var styles = document.getElementsByTagName('style');
            var links = document.getElementsByTagName('link');

            // copy styles
            for (var index = 0; index < styles.length; index++) {
                head.appendChild(styles[index].cloneNode(true));
            }

            // load stylesheet
            for (var index = 0; index < links.length; index++) {
                if (links[index].rel !== 'stylesheet') {
                    continue;
                }

                var newLink = document.createElement('link');

                newLink.setAttribute('rel', links[index].rel);
                newLink.setAttribute('type', links[index].type);
                newLink.setAttribute('href', links[index].href);

                head.appendChild(newLink);
                loadingCount++;

                newLink.onload = function () {
                    loadingCount--;

                    if (loadingCount == 0 && iFrame && iFrameWindow) {
                        // call print
                        iFrameWindow.print();

                        // remove iframe
                        iFrame.remove();
                    }
                }
            }
        } else {
            // call print
            iFrameWindow.print();

            // remove iframe
            iFrame.remove();
        }
    } catch (error) {
        throw error;
    }
}

Element.prototype.print = print;