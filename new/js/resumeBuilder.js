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

    twitter:"@mpmckenna8",
    mobile:"Please contact by e-mail to obtain mobile #",
    email:"mpmckenna8@me.com",
    github:"mpmckenna8",
    location:"San Francisco"
  },
}


// work data basically has a jobs array
var work = {
  jobs:[],
  init:function(){

    let contractor = new job("IT Contractor", "Independent", "San Francisco", "5 Years",
    "Perform various tasks for clients including web developement and GIS analysis.")
    contractor.addtowork();
    worknow = new job();
    worknow.position = "Volunteer Supervisor";
    worknow.employer = "San Francisco Bicycle Coalition";
    worknow.location = "San Francisco";
    worknow.years = '3.5 years';
    worknow.description = "Oversee field operations for the bicycle valet service while overseeing volunteers and coordinating operations at a wide variety of sites.";


    work.jobs.push(worknow);
    var wornow = new job();
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
    cof.description = "Volunteered as a Jungle Guide (docent) for 2nd to 5th grade field trips to the " +
    "Conservatory of Flowers, which is a historical green house in Golden Gate Park.";

    cof.addtowork();

    var pwc = new job("Intern", "PricewaterhouseCoopers LLP", "Sydney, Austrailia", "6 months", 
    "Performed work at the consultant level for various teams including Corporate Social" + 
    " Responsibility auditing and writing material for publication.")
//    console.log(pwc)
    pwc.addtowork();
  //  console.log(cof)
  }
}


work.init();





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


var highschool = new school("American School Foundation of Mexico DF", "2002-2004", "High School Diploma", "Learned to speak and read spanish fairly well and partipated in a range of varsity sports as I attended high school in Mexico City for my junior and senior years of high school.", "Mexico DF, Mexico")


education.schools.push(highschool)

education.schools[0]["major"]  = "Geographic Information Systems"

// online course gets title, school, dates and url
// onlineCourse(title, school, dates, url)
var introcs = new onlineCourse("Intro to Computer Science", "Udacity", "March 2015 - April 2015", "https://www.udacity.com/course/intro-to-computer-science--cs101");
var jsdes = new onlineCourse("JavaScript Design Patterns", "Udacity", "April 2015 - May 2015", "https://www.udacity.com/course/javascript-design-patterns--ud989");


education.onlineCourses.push(introcs);

education.onlineCourses.push(jsdes);

var projects = {projects:[],
  init:function(){

// showing the constructor function for projects if i want to use it
// function Project(title, dates, description, url, images){

  var myBlocks = new Project("My bl.ocks",
  "2010-Present",
  "A bunch of simple examples of developing the web.  Be careful to check weather all of them are actually by me, although I try and attribute where appropriate some gists I fork automatically get posted here.",
  "http://bl.ocks.org/mpmckenna8", [])

  projects.projects.push(myBlocks)

  var ccsfMap = new Project("CCSF Campuses/buildings Map", "2015-2016", "A map to show and help people find out where all the City college of San Francisco Campuses and buildings are.",
    "http://mpmckenna8.github.io/ccsfmapapp/site/", [] );

  //   ccsfMap.description = "A map to show and help people find out where all the City college of San Francisco Campuses and buildings are."
    console.log(ccsfMap)
    projects.projects.push(ccsfMap);


    var caCongressMap = {
    "title":"California State Congresses Maps",
    "dates":"2015",
    "description":"A page where you can check out the districts for the upper and lower houses of the California State Congress.",
    "url":"http://secure-sands-4200.herokuapp.com/#/map",
    "images":[{
      "url":"images/CAmap.jpg"}
      ]
    }

    projects.projects.push(caCongressMap);


    var maptimesSphVe =   {
        "title":"Maptimes Spherical Veronoi Map",
        "dates":"2015",
        "description":"Pretty much copied a Joson Davies spherical veronoi inserting Maptimes for the points.",
        "url":"http://mpmckenna8.github.io/d3prac/sphver/index.html",
        "images":[

        ]
      };

    projects.projects.push(maptimesSphVe)



    var baseball = new Project

    baseball.title = "MLB World Series Column Chart";
    baseball.dates = "October 2014";
    baseball.description = "Major League Baseball World series total wins column chart with map showing current franchise locations.";
    baseball.url = "http://mpmckenna8.github.io/chartMap/index.html";
    baseball.images = [];


    projects.projects.push(baseball);


    var badgers = new Project

      badgers.title = "Badgers Twitter Map";
      badgers.dates = "March 2015";
      badgers.description = "A map that utilizes the Twitter Streaming API and Mapbox Tiles to show where people are tweeting about the badgers.";
      badgers.url = "https://polar-ridge-9307.herokuapp.com/";
      badgers.images = [];



    var bikeAccidentsMap = {
      title: "Bike Accidents on Polk St",
      dates: "April 2014",
      description: "Simple first project using Mapbox to make a simple webmap on their platform.",
      url: "http://a.tiles.mapbox.com/v3/mpmckenna8.map-67tcuy92/page.html#16/37.7892/-122.4200",
      images: []
    };

    projects.projects.push(bikeAccidentsMap)

    projects.projects.push(badgers);


  }}




projects.init();


// data ended not to do a octo
var octo = {
  getbio: function(){
    return bio;
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

// now doing the view stuff, i guess I'll try and put all the stuff that interacts with the view in here
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

      $(".project-entry:last").append(HTMLprojectTitle.replace(/%data%/g, projectos[i].title).replace("#", projectos[i].url)
      + HTMLprojectDates.replace(/%data%/g, projectos[i].dates)
       + HTMLprojectDescription.replace(/%data%/g, projectos[i].description) )

       if(projectos[i].images.length > 0){
         for (image in projectos[i].images){
           var formimage = HTMLprojectImage.replace(/%data%/g, projectos[i].images[image].url);
           $(".project-entry:last").append(formimage)
          }
        }
    }
  }},
  bio:{
    init:function(){
      // make the bio show up
      var formatName = HTMLheaderName.replace(/%data%/g, bio.name);
  //    console.log(formatName);
      var formatRole = HTMLheaderRole.replace(/%data%/g, bio.role);

      $("#header").prepend(formatRole);
      $("#header").prepend([formatName]);

      //var formatCon = HTMLcontactGeneric.replace(/%data%/g, bio.contacts.mobile).replace("%contact%", "Best to contact by:");

      var forMob = HTMLmobile.replace(/%data%/g, bio.contacts.mobile);

      var formatemail = HTMLemail.replace(/%data%/g, bio.contacts.email.toString())

      var formtwit = HTMLtwitter.replace(/%data%/g, bio.contacts.twitter);


      var formskills = [];
      for(i in bio.skills){
  //      console.log(i)
        formskills.push(HTMLskills.replace(/%data%/g, bio.skills[i]))

      }

      var formskillsStart = HTMLskillsStart;

      $("#topContacts")
      .append(formatemail).append(forMob).append(formtwit)  //.append(formatCon)

      if(bio.skills.length > 0 ){

      $("#header").append(formskillsStart)//.append(formskills);
        $("#skills").append(formskills)
      }

//      console.log(formskills)

      var formpic = HTMLbioPic.replace(/%data%/g, bio.pic);

      var formwel = HTMLwelcomeMsg.replace(/%data%/g, bio.welcome)

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
        var name = HTMLschoolName.replace(/%data%/g, hoo.name);
        var degree = HTMLschoolDegree.replace(/%data%/g, hoo.degree);
        var dates = HTMLschoolDates.replace(/%data%/g, hoo.years);
        var loca = HTMLschoolLocation.replace(/%data%/g, hoo.location );
        var major = HTMLschoolMajor.replace(/%data%/g, hoo.major);
        var allofit = name + degree + dates + loca + major;
        $(".education-entry:last").append(allofit);
      }

      this.onlineClass();


    },
    onlineClass:function(){
      var classes = octo.getcourses();

      var ediv = $("#education");

      ediv.append(HTMLonlineClasses);

      for (cla in classes){
        ediv.append(HTMLschoolStart);

        // We have title, school, dates and url in each online class data thing
        var entry = HTMLonlineTitle.replace(/%data%/g, classes[cla].title).replace("#", classes[cla].url)
                  + HTMLonlineSchool.replace(/%data%/g, classes[cla].school)
                  + HTMLonlineDates.replace(/%data%/g, classes[cla].dates)
                  + HTMLonlineURL.replace(/%data%/g, classes[cla].url);

                 $(".education-entry:last")
                .append(entry);
      }
    }
  }

}

view.init();


function displayWork(work,i){

  let thisHTMLworkStart = HTMLworkStart.replace(/%data%/g, work.jobs[i].employer)

  soap = $("#workExperience").append(thisHTMLworkStart)

  formWorkEm = HTMLworkEmployer.replace(/%data%/g, work.jobs[i].employer);
  formworkDate = HTMLworkDates.replace(/%data%/g, work.jobs[i].years);


  $(".work-entry:last").append(HTMLworkEmployer.replace(/%data%/g, work.jobs[i].employer) + HTMLworkTitle.replace(/%data%/g, work.jobs[i].position))
  .append(HTMLworkDates.replace(/%data%/g, work.jobs[i].years))
  .append(HTMLworkLocation.replace(/%data%/g,
     work.jobs[i].location))
  .append(HTMLworkDescription.replace(/%data%/g,
     work.jobs[i].description))

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





$("#mapDiv").append(googleMap)
