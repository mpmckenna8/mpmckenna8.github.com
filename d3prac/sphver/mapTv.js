var degrees = 180/ Math.PI;
var format = d3.format(",f");

var radius = 960/2;

var texty = "#maptime!"
var bleep = maptimeLogo('title',texty, {width:window.innerWidth *1.5});

console.log(bleep);


var projection = d3.geo.orthographic()
  .clipAngle(90)
  .precision(0.1)
  .translate([radius,radius])
  .scale(radius-1)
  .rotate([85,-15]);

var path = d3.geo.path()
  .projection(projection)
  .pointRadius(4);

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

    var hovmt


    svg.selectAll(".mpv")
      .data(voron)
      .enter()
      .append("path")
      .attr("class",function(d){
        console.log('for the class',d)
        return "mpv"
      })
      .attr("opacity",.8)
      .style("fill",function(d){
        return d ? fill(d.color = d3.max(d.neighbors,function(n){
          return voron[n].color;
        }) +1 | 0
      ) : null
      })
      .on("click",function(d,i,e){
        console.log(d,names[i])

        d3.selectAll(".mpv")

        console.log(e)


      })
      .on("mouseover",function(d,i){
        console.log("hovering", d)
        var maphov = names[i];
        hovmt = "."+names[i];


        d3.selectAll('#title').remove();



        d3.select('#tops').append("canvas")

        d3.selectAll("canvas")
        .attr("id", "title");
        //  .attr("id", "title")




        var mapt = d3.select(hovmt)
          .attr('fill', "yellow")
        //  .attr("d", path.pointRadius(10))


      //  .text(maphov)

          console.log('to trans', hovmt, mapt)

          texty = maphov;
          var bleep = maptimeLogo('title',texty, {width:window.innerWidth *1.5});



          var transcoords = [100,900];

          for(b in mapT.features){
            console.log('the bs' , b)
            if(mapT.features[b].properties.title = names[i]){
              transcoords = mapT.features[b].geometry.coordinates;
            }
          };

        var mapLa =  d3.select(".labmt")

          .attr("height", 20)
          .attr("width", 10)

        //  .text(maphov)


         mapLa.attr("transform", function(k){
           console.log(projection(transcoords), names[i], path.centroid(d))
           mapSV.each(redraw);

           return "translate(" + projection(transcoords)// projection(transcoords) path.centroid(d)//
            +")";

         })



      })



      .on("mouseout", function(d,i){
        hovot = "."+names[i];

        console.log("to fis", d3.select("#title"));
        var canvas = document.getElementById("title");

        console.log("can is ", canvas)


        d3.select(hovot)
          .attr('fill', "black")

          .attr("d", path.pointRadius(5))


//        d3.select('#title').remove();

      }).append("title")
        .text(function(d,i){
          return names[i]
        });





svg.selectAll(".maptimes")
  .data(mapT.features)
  .enter()
  .append("path")
  .attr("d", function(d){
  console.log('in the maptimes',d);
  path.pointRadius(5)}
  )
  .attr("class", function(d){
    return "maptimes " + d.properties.title })



var maptim = d3.selectAll(".maptimes");

console.log(maptim)

svg.append("text")
.attr("class", "labmt")

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
