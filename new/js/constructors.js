// Each online course has a {tittle, school, dates, and url 
function onlineCourse(title, school, dates, url){
  this.title = title;
  this.school = school;
  this.dates = dates;
  this.url = url;
}


function Project(title, dates, description, url, images){

  this.title = title;
  this.dates = dates;
  this.description = description;
  this.url = url;
  this.images = images;

}



function job(position, employer, location, years, description){
  this.position = position;
  this.employer = employer;
  this.location = location;
  this.years = years;
  this.description = description;
  this.addtowork = function(){
    work.jobs.push(this)
  }
}

function school(name, years, degree, major, location ){

    this.name = name,
    this.years = years,
    this.degree = degree,
    this.major = major,
    this.location = location

}
