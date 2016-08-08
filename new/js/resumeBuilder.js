// Datas I'm going to have multiple so the helper stuff below
// there's a bio, education, work and projects objects
var aboutme = "Currently reside in San Francisco.  I really enjoy doing things related to maps, bikes and sometimes computers. While in San Francisco I've taken a number of classes at CCSF including Geographic Informations Systems, Network Security, Design and Calculus.  I also like to spend time at <a class='simplink' href='https://noisebridge.net/wiki/Noisebridge'> Noisebridge</a> learning and trying to build and not break things. See some of my online projects below and get in touch if you'd like to discuss them or hire me to work on something."

var bio = {
  name: "Matthew McKenna",
  role: "Digital Cartographer",
  pic:"images/mee.jpg",
  welcome:aboutme,
  skills:["JavaScript", "HTML", "GIS", "Networks", "Cartography"],
  contacts:{
    twitter:"mpmckenna8",
    mobile:"Please contact by e-mail to obtain mobile #",
    email:"mpmckenna8@me.com",
    github:"mpmckenna8",
    location:"San Francisco"
  },
}



// work data basically has a jobs array
var work = {jobs:[],
  init:function(){
    worknow = {};
    worknow.position = "Volunteer Supervisor";
    worknow.employer = "San Francisco Bicycle Coalition";
    worknow.location = "San Francisco";
    worknow.years = '3.5 years';
    worknow.description = "Oversee field operations for the bicycle valet service while overseeing volunteers and coordinating operations at a wide variety of sites.";

    console.table(worknow)

    work.jobs.push(worknow);
    var wornow = {};
    wornow.position = "Barista";
    wornow.employer = "It's a Grind";
    wornow.location = "San Francisco";
    wornow.years = "5 years";
    wornow.description = "Provide customer service in a fast paced San Francisco coffee shop during the launch of a number of innovative coffee products."
    work.jobs.push(wornow);


    var cof = new job();

    cof.position = "Docent";
    cof.employer = "Conservatory of Flowers";
    cof.location = "San Francisco";
    cof.years = "4 years";
    cof.description = "Am a Jungle Guide for 2nd to 5th grade field tripts to the " +
    "Conservatory of Flowers, which is a historical green house in Golden Gate Park.";

    cof.addtowork();

    console.log(cof)
  },
  job: new job(),


}
work.init();


console.log('now work is', work)

function job(){
  this.position;
  this.employer;
  this.location;
  this.years;
  this.description;
  this.addtowork = function(){
    console.log(this);
    work.jobs.push(this)
  }
}




var education = {"schools":[],
            "onlineCourses":[{
              "title":"JavaScript Basics",
              "school":"Udacity",
              "url":"https://www.udacity.com/course/ud804",
              "dates":"April 2015"},
              {
                "title":"Data Visualization and D3.js",
                "school":"Udacity",
                "dates":"Jan - Feb 2015",
                "url":"https://www.udacity.com/course/data-visualization-and-d3js--ud507"
              },
              {
                "title":"How to use Git and GitHub",
                "school":"Udacity",
                "dates":"Jan 2015",
                "url":"https://www.udacity.com/course/how-to-use-git-and-github--ud775"
              }
            ]};

education.schools.push({"location":"San Francisco, CA"})
education.schools[0]["name"] = 'City College of San Francisco';
education.schools[0]["years"] = "2012-2013";
education.schools[0]["degree"] = "GIS (Geographic Information Systems) Certification"
education.schools.push({"name":"University of Wisconsin",
"location":"Madison, WI", "degree":"BA", "major":"International Studies", "years": "2004-2008"})
//console.log(JSON.stringify(edu));

education.schools[0]["major"]  = "Geographic Information Systems"

// online course gets title, school, dates and url
// onlineCourse(title, school, dates, url)
var introcs = new onlineCourse("Intro to Computer Science", "Udacity", "March 2015 - April 2015", "https://www.udacity.com/course/intro-to-computer-science--cs101");
var jsdes = new onlineCourse("JavaScript Design Patterns", "Udacity", "April 2015 - May 2015", "https://www.udacity.com/course/javascript-design-patterns--ud989");


education.onlineCourses.push(introcs);

education.onlineCourses.push(jsdes);

var projects = {projects:[{
  "title":"California State Congresses Maps",
  "dates":"2015",
  "description":"A page where you can check out the districts for the upper and lower houses of the California State Congress.",
  "url":"http://secure-sands-4200.herokuapp.com/#/map",
  "images":[{
    "url":"images/CAmap.jpg"}
    ]
  },
  {
    "title":"Maptimes Spherical Veronoi Map",
    "dates":"2015",
    "description":"Pretty much copied a Joson Davies spherical veronoi inserting Maptimes for the points.",
    "url":"http://mpmckenna8.github.io/d3prac/sphver/index.html",
    "images":[

    ]
  }],
  init:function(){
    var baseball = new Project

    baseball.title = "MLB World Series Column Chart";
    baseball.dates = "October 2014";
    baseball.description = "Major League Baseball World series total wins column chart with map showing current franchise locations.";
    baseball.url = "http://mpmckenna8.github.io/chartMap/index.html";
    baseball.images = [];

    console.log(baseball)

    projects.projects.push(baseball);


  }}

  var badgers = new Project

  badgers.title = "Badgers Twitter Map";
  badgers.dates = "March 2015";
  badgers.description = "A map that utilizes the Twitter Streaming API and Mapbox Tiles to show where people are tweeting about the badgers.";
  badgers.url = "https://polar-ridge-9307.herokuapp.com/";
  badgers.images = [];

  projects.projects.push(badgers);

projects.init();


// data ended not to do a octo

var octo = {
  getbio: function(){
    return bio
  },
  getproj: function(){
    return projects;
  },
  getschools: function(){
    return education.schools;
  },
  getcourses: function(){
    return education.onlineCourses;
  }

}

// now doing the view stuff, i guess I'll try and put all the stuff that interacts with the view in heresies

var view = {
  init:function(){
    this.work.init();
    view.bio.init();
    view.projects.init();
    view.education.init();

  },
  projects:{init:function(){
    var projectos = octo.getproj().projects;

    console.log(projectos)

    var projdiv = $("#projects")

    for(i in projectos){


      projdiv.append(HTMLprojectStart);


      $(".project-entry:last").append(HTMLprojectTitle.replace("%data%", projectos[i].title).replace("#", projectos[i].url)
      + HTMLprojectDates.replace("%data%", projectos[i].dates)
       + HTMLprojectDescription.replace("%data%", projectos[i].description) )

       if(projectos[i].images.length > 0){
         for (image in projectos[i].images){
           var formimage = HTMLprojectImage.replace("%data%", projectos[i].images[image].url);
           $(".project-entry:last").append(formimage)
         }
       }


    }
  }},
  bio:{
    init:function(){

      // make the bio show up

      var formatName = HTMLheaderName.replace("%data%", bio.name);
      console.log(formatName);


      var formatRole = HTMLheaderRole.replace("%data%", bio.role);

      $("#header").prepend(formatRole);
      $("#header").prepend([formatName]);

      //var formatCon = HTMLcontactGeneric.replace("%data%", bio.contacts.mobile).replace("%contact%", "Best to contact by:");

      var forMob = HTMLmobile.replace("%data%", bio.contacts.mobile);

      var formatemail = HTMLemail.replace("%data%", bio.contacts.email).replace("%data%", bio.contacts.email);

      var formtwit = HTMLtwitter.replace("%data%", bio.contacts.twitter);


      var formskills = [];
      for(i in bio.skills){
        console.log(i)
        formskills.push(HTMLskills.replace("%data%", bio.skills[i]))

      }

      var formskillsStart = HTMLskillsStart;

      $("#topContacts")
      .append(formatemail).append(forMob).append(formtwit)  //.append(formatCon)

      if(bio.skills.length > 0 ){

      $("#header").append(formskillsStart)//.append(formskills);
        $("#skills").append(formskills)
      }

      console.log(formskills)

      var formpic = HTMLbioPic.replace("%data%", bio.pic);

      var formwel = HTMLwelcomeMsg.replace("%data%", bio.welcome)

      $("#header").append(formpic).append(formwel)

    }
  },
  work:{
    init:function(){
      for(i in work.jobs){
        displayWork(work, i)

      }
    }
  },
  education:{
    init:function(){
      var schools = octo.getschools();

      var edudiv = $("#education");
      for( ble in schools){
        edudiv.append(HTMLschoolStart);

        var hoo = schools[ble];
        var name = HTMLschoolName.replace("%data%", hoo.name);
        var degree = HTMLschoolDegree.replace("%data%", hoo.degree);
        var dates = HTMLschoolDates.replace("%data%", hoo.years);
        var loca = HTMLschoolLocation.replace("%data%", hoo.location );
        var major = HTMLschoolMajor.replace("%data%", hoo.major);
        var allofit = name + degree + dates + loca + major;
        $(".education-entry:last").append(allofit);
      }

      this.onlineClass();


    },
    onlineClass:function(){
      var classes = octo.getcourses();

      console.log(classes);
      var ediv = $("#education");

      ediv.append(HTMLonlineClasses);

      for (cla in classes){
        console.log(classes[cla]);

        ediv.append(HTMLschoolStart);

        // We have title, school, dates and url in each online class data thing
        var entry = HTMLonlineTitle.replace("%data%", classes[cla].title).replace("#", classes[cla].url)
                  + HTMLonlineSchool.replace("%data%", classes[cla].school)
                  + HTMLonlineDates.replace("%data%", classes[cla].dates)
                  + HTMLonlineURL.replace("%data%", classes[cla].url);
                  console.log(entry);

                 $(".education-entry:last")
                .append(entry);
      }
    }
  }

}

view.init();


// all the below are

//$("#workExperience").append(formWorkLen).append(formWorkEm).append(formworkTit).append(formworkDate).append(formWorkPlace).append(formWorkDesc)



function displayWork(work,i){
  console.log('gonna add some jobs', i)
  soap =   $("#workExperience").append(HTMLworkStart)
  formWorkEm = HTMLworkEmployer.replace("%data%", work.jobs[i].employer);
  formworkDate = HTMLworkDates.replace("%data%", work.jobs[i].years);


  $(".work-entry:last").append(HTMLworkEmployer.replace("%data%", work.jobs[i].employer) + HTMLworkTitle.replace("%data%", work.jobs[i].position)).append(HTMLworkDates.replace("%data%", work.jobs[i].years))
  .append(HTMLworkLocation.replace("%data%", worknow.location)).append(HTMLworkDescription.replace("%data%", work.jobs[i].description))
  $("#workExperience").append(soap)

}

$(document).click(function(loc){
  console.log(loc)
  console.log(loc.clientX, loc.clientY);
  logClicks(loc.clientX,loc.clientY);
  });

$("#main").append(internationalizeButton);

function inName(name){
  var spliced = bio.name.split(" ");
  console.log(spliced[0] + " " + spliced[1].toUpperCase())
  return spliced[0] + " " + spliced[1].toUpperCase()
}

function Project(){
  this.title;
  this.dates;
  this.url;
  this.images = [];

}

$("#mapDiv").append(googleMap)


function onlineCourse(title, school, dates, url){
  this.title = title;
  this.school = school;
  this.dates = dates;
  this.url = url;
}
