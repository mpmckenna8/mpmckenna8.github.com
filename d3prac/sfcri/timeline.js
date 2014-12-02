 var url = 'http://data.sfgov.org/resource/gxxq-x39z.json?$order=date DESC&$limit=50000'

var offurl = 'blahr.json'

//'http://data.sfgov.org/resource/tmnf-yvry.json?$order=:date&$limit='+ numbRes

d3.json(url,function(err, data){
  if(err){
    throw err
  }

  console.log('loading finished', data.length);



  var infoG = _.groupBy(data,'descript');

    var keys = Object.keys(infoG);

    console.log('keys count descript', keys.length )






  var sorted = _.sortBy(infoG,function(d){

  //  console.log('sorting',d)

    return -d.length
  })  //.reverse()

  //  console.log(sorted);

  var colnum = 0;

  var color = d3.scale.category20();

  var names = keys;

  d3.select('body')
    .append('div')
    .html('<p>For the past 3 months of reported SFPD incidents there have been '+ data.length+' incidents reported with '+ keys.length+ ' different descriptions. Below is the total crime reports plotted each day.  To plot a specific description scroll down and click on the one you would like and the scale will change for that value. If things are getting too cluttered click on a line to remove it. Check out the data at <a href = "https://data.sfgov.org/Public-Safety/Map-Crime-Incidents-Previous-Three-Months/gxxq-x39z">SFPD data from data.sfgov.org</a></p>')



  console.log('colors', color(0));

  data.map(function(d){
   d.readDate = new Date(d.date*1000)
  })

  var maxDay = d3.max(data,function(d){
  //  console.log(new Date(d.date*1000).toString())
    return d.date
  })

  var maxRDay = d3.max(data,function(d){
  //  console.log(new Date(d.date*1000).toString())
    return d.readDate
  })

  var minDay = d3.min(data,function(d){
    return d.date
  })

  var readMax = new Date(maxDay*1000)
  var readMin = new Date(minDay*1000)


  var perDay = _.groupBy(data,'date');

  var dayKeys = Object.keys(perDay);

  console.log(dayKeys)
  console.log( perDay)

  console.log('maxRDay', maxRDay);
  console.log(readMax)
  console.log(readMax.getMonth()+1+ '/'+ readMax.getDate()+'/'+readMax.getFullYear());
  console.log('minDay', readMin.getMonth()+ '/'+ readMin.getDay())


  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday", "Saturday" ]


  var margin = {top:20, right:45, bottom:80, left:130 }

  var height = 500 - margin.top - margin.bottom;
  var width= 740 - margin.right - margin.left;

  var y = d3.scale.linear().range([height,0]);

  var x = d3.time.scale().range([0,width]);


  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
    //  .ticks([1);

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(10)


  var chart = d3.select('body').append('svg').attr('height', height+ margin.top +margin.bottom)
    .attr('class', 'container')
    .attr('width', width + margin.right + margin.left)
    .attr('position','absolute')
    .attr('margin-left', '100px')
// in css    .attr('padding-top', '199px')
    .style('background', 'black')
    .append('g')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




var line = d3.svg.line()
    .interpolate("cardinal")
    .x(function (d, i) {
      console.log('xis ',i , d)
       return x(dayKeys[d])  })
    .y(function (d) {
     console.log('making y', dayKeys[d]);
      return y(perDay[dayKeys[d]].length); });





var parseDate = function(d){
  return d3.time.format((d*1000).toString()).parse;
}



    x.domain(d3.extent(dayKeys,function(d){
            //  console.log('domain', parseDate(d))
            return new Date(d*1000)
          }))


  y.domain([0,d3.max(dayKeys, function(d){
          //   console.log('y dom', perDay[d]);
          if(perDay[d]){

            return perDay[d].length}
            else{ return 0}
          })])


parseDate('nov 12 1093')

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
      .attr("class", "yaxis")
      .call(yAxis)
      .attr('stroke', 'pink')
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


var line = d3.svg.line()
    .interpolate("cardinal")
    .x(function (d, i) {
    //  console.log('xis ',i , d)
       return x(new Date(d*1000))  })
    .y(function (d) {
  //   console.log('making y', perDay[d]);
      return y(perDay[d].length); });



    chart.append("path")
    .datum(dayKeys)
      .attr("class", "line")
      .attr("d", line)
  //  console.log('lines d', d, perDay[d].length)
  // line
    //line(perDay[d].length)
//; })
  .style("stroke", function (d) { return 'pink'; })
  .style("stroke-width", "4px")
  .style("fill", "none");


var divvy = d3.select('body').append('div').attr('class','accord')

  var sect = divvy.append('section').attr('id', 'tabdesc')
    .html('<h3><a href=\'#tabby\'>Click here to see a big list of clickable descriptions</a></h3>');


var body= sect.append('table').attr('class', 'stuff').attr('id','tabby')
  .html('<th>Descriptions</th>');

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

    var sumers = "The chart above is a line chart of crimes reported each day by the SFPD and registered on the SF open data portal <a href=\'https://data.sfgov.org/Public-Safety/Map-Crime-Incidents-Previous-Three-Months/gxxq-x39z\'>https://data.sfgov.org/</a>. It is set to query up to 50000 of reported crimes. So far I havent seen a return of more than 33000. If the above link is clicked a table of all the descriptions of crimes led by the amount of each will appear. If these are clicked on the graph y axis will rescale and plot the selected description by day.  Then because the graph starts to get quite cluttered quite quickly you can click the line and it will disappear.  Not a terribly scientific analysis but it does allow you to see how crime is distributed over time and compare patterns of specific crimes against each other or with a more general dataset. <p>There are also a number of flaws with how I made this including how I mapped the data.  But it generally works so no worries, just don\'t be looking to it for a good example. Like for the first line off all the crimes it is cardinal interpolated I think and none of the other ones are. But it makes it look soo much smoother. And with the other ones which can get to zero it can look really bad if you interpolate the line.   </p> <p>Also see my stacked column chart of bike thefts: and my <a href='http://bl.ocks.org/mpmckenna8/23751a2094c7db90575a'>map of bike thefts</a></p>";

console.log(sumers)

d3.select('body').append('div').attr('class', 'summy').html(sumers);


var leggy =  d3.select('body').insert('div', ':first-child')
    .attr('class', 'leg')
//    .attr('width',200)
  //  .attr('height', 300)
  //  .attr('x',100)
  //  .attr('y',100)
    .attr('fill','green')
    .attr('float','right')


  leggy.append('p')
    .html('<div class=\'allie\'></div>ALL CRIMES')





    d3.selectAll('.types')

    .on('click', function(d){

    d3.selectAll('.types')
      .style({'background-color': 'white'})
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
        d3.selectAll('.yaxis')
        .transition()
        .duration(2000)
        .styleTween('opacity', function(){
          return d3.interpolate(1,0)
        })

        .remove();


      }


      console.log('daysWeek', _.groupBy(d,'date'))

  function makebars(){


console.log('makebars called')

      var daysWeek = _.groupBy(d,'date');



      var daykey = Object.keys(daysWeek);
  //    console.log(daykey);
      var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday", "Saturday" ]



y.domain([0,d3.max(daykey, function(d){
        //   console.log('y dom', perDay[d]);
        if(daysWeek[d]){

          return daysWeek[d].length}
          else{ return 0}
        })])


  chart.append("g")
    .attr("class", "yaxis")
    .call(yAxis)
    .attr('stroke', color(colnum))
    .attr('fill','none')
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -66)
    .attr('x', -90)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text(function(){
      console.log('new yaxis text', d[0].descript)
    return d[0].descript;
    })
    .attr('stroke', color(colnum))
    .attr('fill','green');



var liner = d3.svg.line()
  //  .interpolate("cardinal")
    .x(function (d, i) {
    //  console.log('xis ',i , d)
return x(new Date(d*1000))  })
    .y(function (d) {
  //   console.log('making y', daysWeek[d]);

     if (daysWeek[d]){return  y(daysWeek[d].length); }
    else{  return y(0)
    }
    });




chart.append("path")
.datum(dayKeys)
  .attr("class", "line")
  .attr("d", liner)
//  console.log('lines d', d, perDay[d].length)
// line
//line(perDay[d].length)
//; })
.style("stroke", function (d) { return color(colnum); })
.style("stroke-width", "4px")
.style("fill", "none");



leggy.insert('p', ':first-child')
  .html('<div class=\'keyer lilbar'+colnum +'\'></div>'+d[0].descript);

  d3.select('.lilbar'+colnum)
    .style({'background-color':color(colnum)})


d3.selectAll('.line')
  .on('click', function(d){
    console.log(d)
    console.log(this)
    this.remove();
  })




colnum += 1;

}})


d3.selectAll('.line')
  .on('click', function(d){
    console.log(d)
    console.log(this)
    this.remove();
  })


}
)
