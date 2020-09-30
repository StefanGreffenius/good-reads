function getSelector() {
    $el = $($0)

    var selector = $el
        .parents()
        .map(function() { return this.tagName === undefined ? '' : this.tagName.toLowerCase(); })
        .get()
        .reverse()
        .concat([this.nodeName === undefined ? '' : this.nodeName.toLowerCase()])
        .join(' ');

    var id = $el.attr("id");
    if (id) { selector += "#"+ id; }

    var classNames = $el.attr("class");
    if (classNames) { selector += "." + $.trim(classNames).replace(/\s/gi, "."); }

    console.log("$('" + selector + "')");
};
