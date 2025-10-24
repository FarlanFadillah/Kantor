const marked = require('marked');
const LTOptions = {
    timeZone : "Asia/Jakarta",
}

function makePreviewContent(string, length){
    const lastWord = string.lastIndexOf(' ', length);
    return marked.parse(string.slice(0, lastWord) + "...");
}

function makeDateString(date){
    const utcDate = new Date(date + "Z");
    return new Date(utcDate).toLocaleDateString('en-GB', LTOptions) +" "+ new Date(utcDate).toLocaleTimeString('en-GB', LTOptions);
}

function formatedString(format, string, key){
    let i = 0;
    let result = format.replace(key, () => string[i++] || '');
    return result;
}

module.exports = {
    makeDateString, makePreviewContent, formatedString
}