module.exports =  function (text, shift) {
    var result = "";
    for (var i = 0; i < text.length; i++) {
        var c = text.charCodeAt(i);

        if (65 <= c && c <= 90)
            result += String.fromCharCode(((c - 65 + shift) % 26) + 65);
        else if (97 <= c && c <= 122)
            result += String.fromCharCode(((c - 97 + shift) % 26) + 97);
        else result += text.charAt(i);
    }
    return result;
}
