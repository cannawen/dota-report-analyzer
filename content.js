var elements = document.getElementsByTagName('*');

function format(number) {
    if (number < 10) {
        return "0" + number;
    } else {
        return number;
    }
}

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var year = a.getFullYear();
  var month = format(a.getMonth() + 1);
  var date = format(a.getDate());
  var hour = format(a.getHours());
  var min = format(a.getMinutes());
  var sec = format(a.getSeconds());
  var time = year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

function addMatchLinks(element, matchId) {
    var a = document.createElement('a');
    a.setAttribute('href', "https://www.opendota.com/matches/" + matchId);
    a.innerHTML = " [od]";
    element.appendChild(a)


    var a = document.createElement('a');
    a.setAttribute('href', "https://www.dotabuff.com/matches/" + matchId);
    a.innerHTML = "[db]";
    element.appendChild(a)
}

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            var date = text.match(/1\d{9}/g)
            var matchId = text.match(/[2-9]\d{9}/g)

            var replacedText = undefined;

            if (date) {
                var replacedText = text.replace(/1\d{9}/g, timeConverter(parseInt(date)));
                element.replaceChild(document.createTextNode(replacedText), node);
            } else if (matchId) {
                addMatchLinks(element, matchId)               
            }
        }
    }
}