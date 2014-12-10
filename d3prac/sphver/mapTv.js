var degrees = 180/ Math.PI;
var format = d3.format(",f");

var radius = 960/2;


var projection = d3.geo.orthographic()
  .clipAngle(90)
  .precision(0.1)
  .translate([radius,radius])
  .scale(radius-1)
  .rotate([85,-15]);

var path = d3.geo.path()
  .projection(projection)
  .pointRadius(1);

var mapSV = d3.selectAll("#map").append("svg")
    .attr("width", radius*2)
    .attr("height", radius*2);


var svg = d3.select("svg")
  .data([path,null, null]);

var fill = d3.scale.category20();


//maptimes data from https://raw.githubusercontent.com/maptime/maptime.github.io/master/_data/chapters.json
queue()
  .defer(d3.json, "world-110m.json")
  .defer(d3.json, "mtchapters.json")
  .await(ready);


function ready(err, world, mapT){
  console.log(mapT);
  svg.append("path")
    .datum(topojson.feature(world, world.objects.land))
    .attr("class", "land")
    .attr("stroke","black");

  svg.append("path")
    .datum(d3.geo.graticule())
    .attr("class", "graticule")
    .attr("fill","none");


  svg.append("path")
    .datum(mapT)
    .attr("class", "maptimes")


    var names = mapT.features.map(function(d){
      return d.properties.title;
    })

    var mtcoo = mapT.features.map(function(d){
      return d.geometry.coordinates;
    })

    console.log(names[28])

    var delaunay = d3.geo.delaunay(mtcoo);
    var voron = d3.geo.voronoi(mtcoo,delaunay).geometries;

    console.log(delaunay);


    svg.selectAll(".mpv")
      .data(voron)
      .enter()
      .append("path")
      .attr("class",function(d){
        console.log(d)
        return "mpv"
      })
      .attr("opacity",.8)
      .on("click",function(d,i){
        console.log(d,names[i])
      })
      .append("title")
        .text(function(d,i){
          return names[i]
        })





    svg.each(redraw);

mapSV.call(d3.geo.zoom()
  .projection(projection)
  .scaleExtent([projection.scale(),projection.scale()*8])
  .on("zoom.redraw", function(){
    d3.event.sourceEvent.preventDefault();
    mapSV.each(redraw);
  }))




}


function redraw(path){
  if(path) d3.select(this).selectAll("path").attr("d",path);
}
