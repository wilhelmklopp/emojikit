var allEmojikitElements = document.getElementsByClassName("emojikit");

var transparentBase64 = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"

function getRemoteStyle(elem, name) {
    // J/S Pro Techniques p136
    if (elem.style[name]) {
        return elem.style[name];
    } else if (elem.currentStyle) {
        return elem.currentStyle[name];
    }
    else if (document.defaultView && document.defaultView.getComputedStyle) {
        name = name.replace(/([A-Z])/g, "-$1");
        name = name.toLowerCase();
        s = document.defaultView.getComputedStyle(elem, "");
        return s && s.getPropertyValue(name);
    } else {
        return null;
    }
}

for(var i=0; i<allEmojikitElements.length; i++) {

    //backgroundURL is used and maniupaled throughout this loop
    var fullBackgroundURL = getRemoteStyle(allEmojikitElements[i], "background-image")
    var backgroundURL = fullBackgroundURL.slice(4, -1).replace(/["|']/g, "");


    //image neeeds src, otherwise a border and alt text appear
    allEmojikitElements[i].setAttribute("src", transparentBase64);

    //draggable is false to not reveal the dirty transparent src hack
    allEmojikitElements[i].setAttribute("draggable", "false");

    //get parent element font size
    var parentElement = allEmojikitElements[i].parentElement;
    var style = window.getComputedStyle(parentElement, null).getPropertyValue('font-size');
    var fontSize = parseFloat(style); 


    //require next largest background image (16x16 is used by default)
    if (fontSize <= 16.0) {
        //Do nothing. Correct background image 
    }
    else if (fontSize <= 64.0 && fontSize > 16.0) {
        mediumEmoji = fullBackgroundURL.replace("16x16", "64x64");
        allEmojikitElements[i].style.backgroundImage = mediumEmoji;
    }
    else if (fontSize <= 128.0) {
        largeEmoji = fullBackgroundURL.replace("16x16", "128x128");
        allEmojikitElements[i].style.backgroundImage = largeEmoji;
    }
    else {
        originalEmoji = fullBackgroundURL.replace("16x16", "160x160");
        allEmojikitElements[i].style.backgroundImage = originalEmoji;
    }


    //scale emoji to text font size
    var scaleFactor = 0.7; //is of type float
    var dimension = (fontSize*scaleFactor).toString();
    allEmojikitElements[i].style.backgroundSize = dimension + "px " + dimension + "px";
    allEmojikitElements[i].style.width = dimension + "px";
    allEmojikitElements[i].style.height = dimension + "px";

    //set alt text to actual emoji
    var reverseBackgroundURL = backgroundURL.split("").reverse().join("");
    var emojiLongName = reverseBackgroundURL.slice(4).split("/")[0].split("").reverse().join("");

    var pattern = /([0-9a-fA-F]{5})/g;
    var matches = emojiLongName.match(pattern);
    var emoji="";
    for(var j=0; j<matches.length; j++) {
        emoji += "&#x" + matches[j];
        elem = document.createElement("p");
        elem.innerHTML = emoji;
        emoji = elem.innerHTML;

    }
    allEmojikitElements[i].setAttribute("alt", emoji);
}

