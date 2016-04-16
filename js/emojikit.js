var allEmojikitElements = document.getElementsByClassName("emojikit");

var transparentBase64 = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"

for(var i=0; i<allEmojikitElements.length; i++) {
    //image neeeds src, otherwise a border and alt text appear
    allEmojikitElements[i].setAttribute("src", transparentBase64);

    //draggable is false to not reveal the dirty transparent src hack
    allEmojikitElements[i].setAttribute("draggable", "false");

    //get parent element font size
    var parentElement = allEmojikitElements[i].parentElement;
    var style = window.getComputedStyle(parentElement, null).getPropertyValue('font-size');
    var fontSize = parseFloat(style); 

    //scale emoji to text font size
    allEmojikitElements[i].style.backgroundSize = fontSize.toString() + "px " + fontSize.toString() + "px";
    allEmojikitElements[i].style.width = fontSize.toString() + "px";
    allEmojikitElements[i].style.height = fontSize.toString() + "px";
}

