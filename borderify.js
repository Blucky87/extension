document.body.style.border = "5px solid red";
// var firstHref = $(".quiz-header");

// var $input = $('<input class="btn btn-secondary" type="button" value="+" />');
// $input.appendTo(firstHref);

// console.log(firstHref);
// window.testing = function(){
// 	console.log("asdfasf");
// }
// function theThing() {
// 	console.log("asdfasdf");
// }
function scriptFromFile(file) {
    var script = document.createElement("script");
    script.src = chrome.extension.getURL(file);
    return script;
}

function scriptFromSource(source) {
    var script = document.createElement("script");
    script.textContent = source;
    return script;
}

function inject(scripts) {
    if (scripts.length === 0)
        return;
    var otherScripts = scripts.slice(1);
    var script = scripts[0];
    var onload = function() {
        script.parentNode.removeChild(script);
        inject(otherScripts);
    };
    if (script.src != "") {
        script.onload = onload;
        document.head.appendChild(script);
    } else {
        document.head.appendChild(script);
        onload();
    }
}

inject([
    scriptFromFile("inject.js")
]);