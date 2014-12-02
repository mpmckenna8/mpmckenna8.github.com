 var url = 'http://data.sfgov.org/resource/gxxq-x39z.json?$order=date DESC&$limit=50000'


//'http://data.sfgov.org/resource/tmnf-yvry.json?$order=:date&$limit='+ numbRes

d3.json(url,function(err, data){
  if(err){
    throw err
  }

  console.log('loading finished', data.length);

  d3.select('body')
    .append('div')
    .html('<p>In the past 3 months there have been a total of '+ data.length+' SFPD incidents reported in the following descriptions:</p>')


  var infoG = _.groupBy(data,'descript');

    var keys = Object.keys(infoG);



  var sorted = _.sortBy(infoG,function(d){

  //  console.log('sorting',d)

    return -d.length
  })  //.reverse()

    console.log(sorted);



  var color = d3.scale.ordinal()
    .range(["orange","red",'green','yellow','purple']);

  var names = keys;

  color.domain(names);

  console.log(color)



  var perDay = _.groupBy(data,'dayofweek');

  console.log('perday', perDay);



  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday", "Saturday" ]


  var margin = {top:20, right:45, bottom:60, left:100 }

  var height = 400 - margin.top - margin.bottom;
  var width= 500 - margin.right - margin.left;

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
    .attr('position','absolute')
    .attr('margin-left', '100px')
    .style('background', 'black')
    .append('g')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    x.domain(days.map(function(d){
            //  console.log('domain', d)
            return d
          }))


  y.domain([0,d3.max(days, function(d){
             console.log('y dom', perDay[d]);

            return perDay[d].length
          })])



  chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .attr('stroke','pink')
    .attr('fill','none')
    .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.0em')
      .attr('dy', '.65em')
      .attr('class', function(d,i){
        //  console.log('in the class',  d)
          return 'xaxis'
        })
      .attr('transform', function(d){
          return 'rotate(-48)'
        })
      .attr('fill','green')
      .attr('stroke','white');


    chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .attr('stroke', 'yellow')
      .attr('fill','none')
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -66)
      .attr('x', -90)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("SFPD Reported Incidents")
      .attr('stroke', 'white')
      .attr('fill','green');


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
             if(perDay[d]){
          console.log('y is', perDay[d].length)
           return y(perDay[d].length)}
           else {return 0}
          })
        .attr('class', function(d){
    //     console.log('trying to make it classy ', d)
          return 'bar ' + d
        })
        .attr('height', function(d){

          if(perDay[d]){
          return height - y(perDay[d].length);
        }
        else{
          return 0
        }
        })
        .attr('fill','red')




  var body = d3.select('body').append('table').attr('class', 'stuff');




  body.selectAll('.types')
    .data(sorted)
    .enter()
    .append('tr')
    .attr('class', 'types')
    .html(function(d){

      var desGroups = _.groupBy(d,'descript');

    //  console.log('number of groups', Object.keys(desGroups).length);

      var descKeys = Object.keys(desGroups)
    //'<td>' + d[0].category + '</td>
      return '<td>' + d.length +'</td><td>'+(descKeys ).toString()+'</td>'
    })






    d3.selectAll('.types')

    .on('click', function(d){

d3.selectAll('.types')
  .style({'background-color': 'red'})
console.log('this is', this)

this.style.backgroundColor = '#A5D9F3';


/*
d3.select(this)
  .attr('background', 'red')
  .attr('fill', 'yellow')
  .attr('class','beep')
*/

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
      .style('text-anchor', 'end')
      .attr('dx', '-.0em')
      .attr('dy', '.65em')
        .attr('class', function(d,i){
          console.log('in the class',  d)
          return 'xaxis'
        })
        .attr('transform', function(d){
          return 'rotate(-40)'
        })
        .attr('fill','green')
        .attr('stroke','white');


      chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .attr('stroke', 'yellow')
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -66)
      .attr('x', -90)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("SFPD Reported Incidents")
      .attr('stroke', 'white')
      .attr('fill','green');



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
        //  console.log(d)
             if(daysWeek[d]){
      //    console.log('y is', daysWeek[d].length)
           return y(daysWeek[d].length)}
           else {return 0}
          })
        .attr('class', function(d){
         console.log('trying to make it after click ', d)
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


}})




}
)
