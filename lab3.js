var request = require('request');
var fs = require('fs');
var str = "";

request('https://api.meetup.com/2/open_events?and_text=False&country=us&offset=0&city=Los+Angeles&format=json&limited_events=False&state=ca&photo-host=public&page=20&radius=1&desc=False&status=upcoming&sig_id=216713652&sig=0b9e715a0020fc920ec915af58a530978e7613a8&key=1e247e3d3c54156541f171414741e1e', function (error, res, body) {
    if (error) throw error;
    var events = (JSON.parse(body))["results"];
    var dayTime = 86400000;
    var start = (new Date()).setHours(0, 0, 0, 0) + 43200000;
    for (var j = 0; j < 7; j++) {
        str += "<h3>" + (new Date(start)).toDateString() + "</h3><br>";
        for (var i in events) {
            var eventDate = new Date((events[i])["time"]);
            if (eventDate > start && eventDate < start + dayTime) {
                str += "<b>Name: </b>" + (events[i])["name"] + "<br>";
                if ("venue" in events[i]) {
                    str += "<b>Address: </b>" + ((events[i])["venue"])["address_1"] + "<br>";
                }
                str += "<b>Time: </b>" + (eventDate.toTimeString()).substring(0, 5) + " PM<br>";
                if ("description" in events[i]) {
                    str += "<details><summary><b>Description</b></summary><p>" + (events[i])["description"] + "</p></details>"
                }
                str += "<br>";
            }
        }
        start += dayTime;
    }
    fs.writeFile("page.html", str, function (error) {
        if (error) console.log(error);
    });
});