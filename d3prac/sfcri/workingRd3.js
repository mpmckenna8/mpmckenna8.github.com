//var d3 = require('d3');

var numbRes = 500;

 var url = 'http://data.sfgov.org/resource/gxxq-x39z.json?$order=date DESC&$limit=10000&$q=BICYCLE'


//'http://data.sfgov.org/resource/tmnf-yvry.json?$order=:date&$limit='+ numbRes

d3.json(url,function(err, data){
  if(err){
    throw err
  }

  console.log('loading finished', data);


  var infoG = _.groupBy(data,'descript');



  var highend = [];

  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday", "Saturday" ]



  var sorted = _.sortBy(infoG,function(d){

    console.log('sorting',d)




    return -d.length
  })  //.reverse()


  d3.select('body').append('div')
  .html('<p>In the past 3 months there have been a total of '+ data.length+' bike theft incidents reported by the SFPD in the following categories:</p>')




  console.log(sorted.length)

  var keys = Object.keys(infoG);


var eachDay=[];

  console.log('infoG', infoG)
  for(i in keys){

    var keyr = keys[i];
    var high = infoG[keyr];

    console.log('key',keyr)

    var perDay = _.groupBy(high,'dayofweek');

  //  console.log('perday', perDay)

  eachDay.push(perDay)




console.log('eachday',eachDay)






    //console.log('high end', high );

  }


  console.log('eachday ending 1',eachDay)

  var newdays= days.map(function(d){

    var name = d;
    var grand;
    var petty;
    var attempt;



   console.log('mapping', d, eachDay[1])

   for(i in eachDay){
     var str = d.valueOf();
     if(i==0){
     console.log('d work',eachDay[i][d].length)


     petty = eachDay[0][d].length
   }
   else if (i==1){
//     console.log('i is 1111111')
     if(eachDay[i][d]){
     grand = eachDay[i][d].length;
   }
   else{grand = 0;}
   }
   else{
     if(eachDay[i][d]){
     attempt = eachDay[i][d].length
     }
     else{attempt=0}
   }
   }

   if(eachDay[0][str])

    return {
      name:d,
      grand: grand,
      petty: petty,
      attempt:attempt,
      total:grand+petty+attempt

    }
  })


  console.log('stackable data', newdays)

      var color = d3.scale.ordinal()
          .range(["green","red",'orange']);

  var names = ['grand','petty','attempt']

  color.domain(names);

  newdays.forEach(function(d){
    var y0 = 0;
    d.mapping=names.map(function(type){

      console.log('type and d', type, d)
      return{
        name:d.name,
        label:type,
        y0:y0,
        y1:y0+= d[type]
      }
    })
  })









  d3.selectAll('.types')
    .on('click', function(d){
      console.log(_.groupBy(d,'dayofweek'))
    })

var margin = {top:20, right:45, bottom:40, left:110 }

var height = 400 - margin.top - margin.bottom;
var width= 750 - margin.right - margin.left;

var y = d3.scale.linear().range([height,0]);

var x = d3.scale.ordinal().rangeRoundBands([0,width], .3);


var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10)


var chart = d3.select('body').append('svg').attr('height', height+ margin.top +margin.bottom)
  .attr('class', 'container')
  .attr('width', width + margin.right + margin.left)
  .style('background', 'black')
  .append('g')
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



          x.domain(days.map(function(d){
              console.log('domain', d)
            return d
          }))


          y.domain([0,d3.max(newdays, function(d){
            console.log(typeof(d));

            return d.total
          })])


      chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .attr('stroke','pink')
      .attr('fill','none')
      .selectAll('text')
        .style('text-anchor', 'middle')
        .attr('dx', '-.0em')
        .attr('dy', '.55em')
        .attr('class', function(d,i){
          console.log('in the class',  d)
          return 'xaxis'
        })
        .attr('transform', function(d){
          return 'rotate(-0)'
        })
        .attr('fill','green')
        .attr('stroke','white');

    chart.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .attr('stroke', 'yellow')
    .attr('fill', 'none')
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -46)
    .attr('x', -40)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("SFPD Bicycle Incidents")
    .attr('stroke', 'white')
    .attr('fill','green')
    ;


var selection = chart.selectAll(".series")
    .data(newdays)
  .enter().append("g")
    .attr("class", "series")
    .attr("transform", function (d) {
      return "translate(" + x(d.name) + ",0)";
    });

selection.selectAll("rect")
  .data(function (d) { return d.mapping; }) //A
.enter().append("rect")
  .attr("width", x.rangeBand())
  .attr("y", function (d) { return y(d.y1); })
  .attr("height", function (d) { return y(d.y0) - y(d.y1); })
  .style("fill", function (d) {
    console.log('filling d', d)
    return color(d.label);
    })
  .style("stroke", "grey");


var body = d3.select('body').append('table').attr('class', 'stuff')
.html('<tr><th>#</th><th>Description of crime</th></tr>');


  body.selectAll('.types')
  .data(sorted)
  .enter()
  .append('tr')
  .attr('class', 'types')
  .html(function(d){


    var desGroups = _.groupBy(d,'descript');

    console.log(Object.keys(desGroups).length);

    var descKeys = Object.keys(desGroups)
  //'<td>' + d[0].category + '</td>
    return '<td>' + d.length +'</td><td>'+(descKeys ).toString()+'</td>'
  })



  d3.selectAll('.types')
    .on('click', function(d){


      d3.selectAll('.series')
      .transition()

      .attr('height',0)
        .remove()
        .call(removeaxis)
        .call(makebars)





function removeaxis(){
        d3.selectAll('.axis')

        .remove();

        d3.selectAll('.bar')
        //.transition()
        .remove()

        makebars();

        d3.selectAll('.legend')
        .transition()
        .remove()

        d3.selectAll('.legback')
        .transition()
        .remove()

      }


      console.log(_.groupBy(d,'dayofweek'))

      function makebars(){

      var daysWeek = _.groupBy(d,'dayofweek');



      var daykey = Object.keys(daysWeek);
      console.log(daykey);
      var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday", "Saturday" ]



    x.domain(days.map(function(d){
        console.log('domain', d)
      return d
    }))


    y.domain([0,d3.max(daykey, function(d){
      console.log(typeof(d));

      return daysWeek[d].length
    })])


      chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .attr('stroke','pink')
      .attr('fill','none')
      .selectAll('text')
.style('text-anchor', 'middle')
.attr('dx', '-.0em')
.attr('dy', '.65em')
        .attr('class', function(d,i){
          console.log('in the class',  d)
          return 'xaxis'
        })
        .attr('transform', function(d){
          return 'rotate(0)'
        })
        .attr('fill','green')
        .attr('stroke','white');


    chart.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .attr('stroke', 'yellow')
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -46)
    .attr('x', -40)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("SFPD Bicycle Incidents")
    .attr('stroke', 'white')
    .attr('fill','green')
    ;



      chart.selectAll('.bar')
        .data(days).enter().append('rect')
        .attr('class', 'bar')
        .attr('x', function(d,i){
        //  console.log(d)
          return x(d)
        })
        .attr('width', function(d){
          return x.rangeBand()
        //  return 10
        })
        .attr('y', function(d){
          console.log(d)
             if(daysWeek[d]){
          console.log('y is', daysWeek[d].length)
           return y(daysWeek[d].length)}
           else {return 0}
          })
        .attr('class', function(d){
         console.log('trying to make it classy ', d)
          return 'bar ' + d
        })
        .attr('height', function(d){
            if(daysWeek[d]){
            return height - y(daysWeek[d].length);
          }
          else{
            return 0
          }
        })
        .attr('fill','red')

}

    })


    chart.append('rect')
    .attr('height', 100)
    .attr('width', 160)
    .attr('fill', 'white')
    .attr('x', 10)
    .attr('class', 'legback box')
    .attr('opacity', .5);


    var legnames = ["Grand Theft","Petty Theft","Attempted Theft"];

    var color = d3.scale.ordinal()
        .range(["orange","red","green"].reverse());

        var revN = legnames.reverse();

    console.log(legnames.length);

    var legend = chart.selectAll(".legend")
          .data(revN)
        .enter()
        .append("g")
          .attr("class", "legend")
          .attr("transform", function (d, i) {
            console.log('trans leg',i, d);
            return "translate(-450,"+(20+i*20) + ")";
          });

  legend.append("rect")
      .attr("x", width-5)
      .attr("width", 15)
      .attr("height", 10)
      .style("fill", color)
      .style("stroke", "grey");

  legend.append("text")
      .attr("x", width-10)
      .attr("y", 6)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function (d) { return d; });



console.log('the inner height of the window', window.innerHeight)

})
