

var margin = {top:20, right:15, bottom:210, left:110 }

var height = 600 - margin.top - margin.bottom;
var width= 950 - margin.right - margin.left;

var y = d3.scale.linear().range([height,0]);

var x = d3.scale.ordinal().rangeRoundBands([0,width], .1);


var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10)

var svg = d3.select('.boxer').append('svg').attr('height', height+ margin.top +margin.bottom)
  .attr('class', 'container')
  .attr('width', width + margin.right + margin.left)
  .style('background', 'black')
  .append('g')
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      ;




d3.tsv('./serTots.tsv', type, function(err, series){
   console.log(series)


x.domain(series.map(function(d){
  return d.Team
}))

y.domain([0,d3.max(series, function(d){
  console.log(typeof(d.Wins));
  return d.Wins
})])




  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .attr('class', function(d,i){
          console.log('in the class',  series[i])
          return series[i].id + ' ' +d
        })
        .attr('transform', function(d){
          return 'rotate(-45)'
        });


      svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -56)
      .attr("x", -34)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Total World Series Won");

    svg.selectAll('.bar')
    .data(series).enter().append('rect')
    .attr('class', 'bar')
    .attr('x', function(d){
    //  console.log(d)
      return x(d.Team)
    })
    .attr('width', x.rangeBand())
    .attr('y', function(d){  return y(d.Wins);})
    .attr('class', function(d){
     console.log('trying to make it classy ', d)
      return 'bar ' + d.Team + ' ' + d.id
    })
    .attr('height', function(d){
      return height - y(d.Wins);
    })

var projection = d3.geo.albers()
    .rotate([96, 0])
    .center([-7, 36.7])
    .parallels([29.5, 45.5])
    .scale(800)
    .translate([width / 2, height / 2])
    .precision(.1);

var path = d3.geo.path()
    .projection(projection);

var graticule = d3.geo.graticule()
    .extent([[-98 - 45, 38 - 45], [-98 + 45, 38 + 45]])
    .step([5, 5]);

svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

d3.json("./us.json", function(error, us) {
  svg.insert("path", ".graticule")
      .datum(topojson.feature(us, us.objects.land))
      .attr("class", "land")
      .attr("d", path);


  svg.insert("path", ".graticule")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "state-boundary")
      .attr("d", path);

  d3.json('mlbSta.geojson', function(err, dat){
    console.log(dat.features)
    svg.insert('path','.graticule')
      .datum(dat)
      .attr('d', path)
    //  .enter()
      .attr('class', function(d,i){
      //  console.log(d)
        return 'stadiums'
      })

    //  .attr('fill', 'pink')



   svg.selectAll('.stads')
     .data(dat.features)
     .enter()
     .append('path')
     .attr('d', path)
     .attr('class', function(d,i){
       console.log(d);
       return 'stads'
     })
     .attr('fill',function(d){
       console.log(d.properties)

      return 'blue'
     })

     svg.selectAll('.citLabs')
     .data(dat.features)
     .enter()
     .append('text')
     .text(function(d){
       console.log(d.properties.Team)
       return d.properties.Team
     })
         .attr("transform", function(d) {

              console.log(d.properties.Team)

          console.log((projection(d.geometry.coordinates)))
          var endCo = projection(d.geometry.coordinates)[0]

          console.log(endCo)

           return 'translate(' + projection(d.geometry.coordinates) + ')'
           //'translate(' + path(d.geometry[1]) +','path(d.geometry[0]) + ')'

           //"translate(" + path.centroid(d) + ")"; })
    })
    .attr('class', 'citLabs')
    .attr("dy", ".41em")
    .attr('dx', '4em')
    .text(function(d){
      console.log(d.properties.Team)
      return d.properties.Team
    })
    .attr('d',path)
    .attr('text-anchor','end')
    .attr('font-size', 13)


     d3.selectAll('.citLabs')
       .attr('stroke', function(d){
         console.log('color of text is white', d)
         return 'white'
       })
       .attr('class', function (d){
         return d.properties.id

       })
       .attr('fill', 'red')
       .attr('transform', function(d){
        // console.log((this))

         var coords = projection(d.geometry.coordinates)
         console.log(d.properties.Team)
         if(d.properties.Team == "San Francisco Giants"){
           console.log('trans giants')
        //   console.log(coords)
           coords[0] += -30;
           coords[1] += -15
         }
         else if(d.properties.Team == "Los Angeles Dodgers"){
           console.log(coords)
           coords[0] += 10;
           coords[1] += -20
         }
         else if(d.properties.Team == "San Diego Padres"){
           console.log('trans giants')
          // console.log(coords)
           coords[0] += -20;
           coords[1] += 10
         }
         else if(d.properties.Team == "Arizona Diamondbacks"){
           console.log('trans giants')
           console.log(coords)
           coords[0] += 30;
           coords[1] += -5
         }
         else if(d.properties.Team == "Minnesota Twins"){
           console.log('trans giants')
           console.log(coords)
           coords[0] += -5;
           coords[1] += -10
         }

        else if(d.properties.Team == "Toronto Blue Jays"){
          console.log('trans giants')
          console.log(coords)
          coords[0] += -10;
          coords[1] += -15
        }
        else if(d.properties.Team == "Boston Red Sox"){
          console.log('trans bosox')
          console.log(coords)
          coords[0] += 25;
          coords[1] += -15
        }
        else if(d.properties.Team == "New York Yankees"){
          console.log('trans bosox')
          console.log(coords)
          coords[0] += 45;
          coords[1] += -15
        }
        else if(d.properties.Team == "New York Mets"){
          console.log('trans bosox')
          console.log(coords)
          coords[0] += 20;
          coords[1] += 0
        }
        else if(d.properties.Team == "Philadelphia Phillies"){
          console.log('trans bosox')
          console.log(coords)
          coords[0] += 65;
          coords[1] += 0
        }
        else if(d.properties.Team == "Baltimore Orioles"){
          console.log('trans bosox')
          console.log(coords)
          coords[0] += 45;
          coords[1] += 0
        }
        else if(d.properties.Team == "Milwaukee Brewers"){
          console.log('trans bosox')
          console.log(coords)
          coords[0] += -45;
          coords[1] += -10
        }
        else if(d.properties.Team == "Detroit Tigers"){
          console.log('trans bosox')
          console.log(coords)
          coords[0] += -15;
          coords[1] += -10
        }
        else if(d.properties.Team == "Colorado Rockies"){
          console.log('trans bosox')
          console.log(coords)
          coords[0] += -25;
          coords[1] += -6
        }
        else if(d.properties.Team == "Kansas City Royals"){
          console.log('trans bosox')
          console.log(coords)
          coords[0] += -5;
          coords[1] += -9
        }
        else if(d.properties.Team == "Washington Nationals"){
          console.log('trans bosox')
          console.log(coords)
          coords[0] += 70;
          coords[1] += 10
        }
        else if(d.properties.Team == "Chicago White Sox"){
          console.log('trans bosox')
          console.log(coords)
          coords[0] += -54;
          coords[1] += -9
        }
        else if(d.properties.Team == "Chicago Cubs"){
          console.log('trans bosox')
          console.log(coords)
          coords[0] += -54;
          coords[1] += 7
        }
        else if(d.properties.Team == "Pittsburgh Pirates"){
          console.log('trans bosox')
          console.log(coords)
          coords[0] += -34;
          coords[1] += 8
        }
        else if(d.properties.Team == "St. Louis Cardinals"){
          console.log('trans bosox')
          console.log(coords)
          coords[0] += 14;
          coords[1] += 8
        }


return 'translate(' + coords + ')'

       })


  d3.selectAll('.bar')
  .on('mouseover', function(d){
    console.log( this)
    var idStr = '.' + d.id;

    d3.selectAll(idStr)
      .attr('stroke', 'red')
      .attr('fill', 'white')
      .attr('font-size', 15)



      d3.selectAll('.bar')
        .attr('stroke', 'red')
        .attr('fill', 'white')

  })
  .on('mouseout', function(d){
    var idStr = '.' + d.id;

    d3.selectAll(idStr)
      .attr('stroke', 'white')
      .attr('fill', 'red')
      .attr('font-size', 13)


  })

  })

});


   //return series
 })


function type(d){
  d.Wins = +d.Wins;
  return d
}
//console.log(tsDat);
