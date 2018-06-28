/**
 * js-print
 * print specified element.
 * @author Chen Su <ghosind@gmail.com>
 */

let loadingCount = 0;
let iFrame;
let iFrameWindow;

/**
 * print specified element.
 * @param options 
 */
let print = function(options) {
    let iFrame;
    try {
        if (!options || !options.elementName || typeof(options.elementName) !== 'string') {
            throw new Error('parameter is invalid');
        }

        // get element node
        let elements;
        let element;
        let isMultiple = true;

        if (options.elementName[0] === '.') {
            elements = document.getElementsByClassName(options.elementName.substring(1));
        } else if (options.elementName[0] === '#') {
            element = document.getElementById(options.elementName.substring(1));
            isMultiple = false;
        } else {
            elements = document.getElementsByTagName(options.elementName);
        }

        if ((isMultiple && (!elements || elements.length === 0)) || 
            (!isMultiple && !element)) {
            throw new Error("can't find the element");
        }

        element = isMultiple ? elements[0] : element;

        // create new iframe
        iFrame = document.createElement('iframe');

        // add iframe into body
        document.body.appendChild(iFrame);

        // add print contents into iframe
        iFrame.contentDocument.body.appendChild(element.cloneNode(true));

        // get iframe's contentWindow
        iFrameWindow = iFrame.contentWindow;

        if (options.importCss) {
            // clear loading count
            loadingCount = 0;

            // add styles into head
            let head = iFrame.contentDocument.head;
            let styles = document.getElementsByTagName('style');
            let links = document.getElementsByTagName('link');

            // copy styles
            for (let index = 0; index < styles.length; index++) {
                head.appendChild(styles[index].cloneNode(true));
            }

            // load stylesheet
            for (let index = 0; index < links.length; index++) {
                if (links[index].rel !== 'stylesheet') {
                    continue;
                }

                let newLink = document.createElement('link');

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