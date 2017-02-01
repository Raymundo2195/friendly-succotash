// ECS 163 Project 1 Main JS File


var body = d3.select("body");
var mainDiv = body.append("div").attr("style", "width: 80%; margin-left: 10%; margin-right: 10%");
mainDiv.append("h2").text("PROJECT_1").style("text-align", "center");
var stationsComingGoing = {}; //Hash, each key is a station id, pointing to a hash of {name:"station_name", arrivals:an integer count of trips arriving here, departures: and integer count of trips departing from here}
var ReadTripData = function(){
  d3.csv('data/201608_trip_data.csv', function(data) {

    maxArrivals = 0;
    maxDepartures = 0;
    data.forEach(function(d){

      if (!(d["Start Terminal"] in stationsComingGoing)) {
        stationsComingGoing[d["Start Terminal"]] = {name: d["Start Station"], arrivals: 0, departures: 0};
      }
      if (!(d["End Terminal"] in stationsComingGoing)) {
        stationsComingGoing[d["End Terminal"]] = {name: d["End Station"], arrivals: 0, departures: 0};
      }

      stationsComingGoing[d["Start Terminal"]].departures += 1;
      if (stationsComingGoing[d["Start Terminal"]].departures > maxDepartures){
        maxDepartures = stationsComingGoing[d["Start Terminal"]].departures
      }
      stationsComingGoing[d["End Terminal"]].arrivals += 1;
      if (stationsComingGoing[d["End Terminal"]].arrivals > maxArrivals){
        maxArrivals = stationsComingGoing[d["End Terminal"]].arrivals
      }
    });

    console.log(stationsComingGoing);
    var graphSvg = mainDiv.append("svg").style("width", "100%").style("height", "1200px");
    var maxMax = maxArrivals > maxDepartures ? maxArrivals : maxDepartures;
    console.log("maxMax is ", maxMax);
    var xScale = d3.scaleLinear().domain([0, maxMax]).range([0, 800]);
    var xAxis = d3.axisBottom(xScale);
    xAxis.ticks(15);
    xAxis.tickFormat(d3.format(",d"));
    graphSvg.append("g").attr("transform", "translate(200, 1020)").call(xAxis);

    var stations = [];
    var stationNames = [];

    for (var key in stationsComingGoing){
      if (stationsComingGoing.hasOwnProperty(key)) {
        stations.push(stationsComingGoing[key]);
        stationNames.push(stationsComingGoing[key].name);
      }
    }
    var yScale = d3.scaleBand().domain(stationNames).range([20,1000]);
    var yAxis = d3.axisLeft(yScale);

    graphSvg.append("g").attr("transform", "translate(200, 20)").call(yAxis);




  });
};

ReadTripData();