function loadAll() {
  var button = document.getElementById('load_more_button')
  if (button.style.display != "none") {
    button.click();
    setTimeout(function() {
      loadAll();
    }, 1000);
  } else if (document.getElementById('inventory_history_loading').style.display != "none") {
    setTimeout(function() {
      loadAll();
    }, 500);
  } else {
    convert()
  }
}

loadAll();

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

function updateNode(row, columnIndex, text) {
  var currentNode = row.children[columnIndex];
  var newNode = document.createElement('td');
  newNode.innerHTML = text;
  row.replaceChild(newNode, currentNode)
}

function updateYesNoNode(row, columnIndex, text) {
  var node = row.children[columnIndex];

  if (node.textContent == "Yes") {
    updateNode(row, columnIndex, text);
  } else {
    updateNode(row, columnIndex, "-");
  }
}

function convert() {
  var table = document.getElementsByClassName("generic_kv_table");
  var rows = Array.from(table[0].children[0].children);

  var headerTitles = Array.from(rows.shift().children).map((th) => th.textContent);

  var matchIdIndex = headerTitles.indexOf("MatchID");
  var dateIndex = headerTitles.indexOf("Date");

  var yesNoColumns = [
    headerTitles.indexOf("Communication Abuse"),
    headerTitles.indexOf("Ability Abuse"),
    headerTitles.indexOf("Feeding"),
    headerTitles.indexOf("Leadership"),
    headerTitles.indexOf("Teaching"),
    headerTitles.indexOf("Friendly"),
    headerTitles.indexOf("Forgiving")
  ];
  
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i].children;

    var matchIdNode = row[matchIdIndex];
    addMatchLinks(matchIdNode, matchIdNode.textContent);

    var dateNode = row[dateIndex];
    updateNode(rows[i], dateIndex, timeConverter(dateNode.textContent))

    yesNoColumns.map((index) => updateYesNoNode(rows[i], index, headerTitles[index]))
  }
}
