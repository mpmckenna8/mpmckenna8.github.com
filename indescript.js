$(document).ready(function(){

      $('.tabs li').click(function(){
        if (!$(this).hasClass('selected')){
          $('.tabs li').removeClass('selected');
          $(this).addClass('selected');
                                      }

                        var selectionId = $(this).attr('id');
                        if(selectionId == 'all'){
                          $('.page').css('display', 'block');
                        }
                        else{

                        $('.content').fadeOut('slow', function(){
                            $('div .page').css('display','none');
                            $('.page#'+selectionId).css('display','block');
                            $('.content').fadeIn('slow');
                                                            });
                                          }
                    });

// If window is smaller than a certain size make the nav stuff into a dropdown
                    if( $(window).width() < 640){
                      var navers = $(".tabs").children('li');
                      console.log(navers.children('li'));

                      $(".tabs").css("display", "none");

                      $(".nav").append("<select class='bleep'> <option>Navigate      ╲╱</option> </select>");


                      for(i=0; i < navers.length; i++){

                          console.log($(navers[i]).text())

                          $('.bleep').append("<option value=" + (navers[i]).id  + ">" + $(navers[i]).text() + "</option>")

                        //  var htm = (navers[0].children[i]);
                        //  console.log(htm.id);

                      }

                     $(".bleep").change(function(){
                        console.log($(this).val());
                        var displ = $(this).val();

                        if(displ == 'all'){
                          $(".page").css("display", "block")
                        }
                        else{
                          $('.content').fadeOut('slow', function(){
                              $('div .page').css('display','none');
                              $('.page#'+displ).css('display','block');
                              $('.content').fadeIn('slow');
                            });
                          }
                        });

                      }


                    })

                  ;
