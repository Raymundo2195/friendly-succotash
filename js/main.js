// ECS 163 Project 1 Main JS File


var body = d3.select("body");
body.append("h2").text("Aww yiss motherfucker");
var StationsComingGoing = {}; //Hash, each key is a station id, pointing to a hash of {name:"station_name", arrivals:an integer count of trips arriving here, departures: and integer count of trips departing from here}
var ReadTripData = function(){
  d3.csv('data/201608_trip_data.csv', function(data) {
    data.forEach(function(d){
      if StationsComingGoing[d["Start Terminal"]] {
        console.log("xd");
      }
      if StationsComingGoing[d["Start Terminal"]].departures {
        StationsComingGoing[d["Start Terminal"]].departures += 1;
      }
      else {
        StationsComingGoing[d["Start Terminal"]]["departures"] = 1;
      }
      if StationsComingGoing[d["End Terminal"]].arrivals {
        StationsComingGoing[d["End Terminal"]].arrivals += 1;
      }
      else {
        StationsComingGoing[d["End Terminal"]]["arrivals"] = 1;
      }
    });
  });
};

ReadTripData();