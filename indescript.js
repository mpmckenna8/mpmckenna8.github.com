$(document).ready(function(){
                  $('.tabs li').click(function(){
                    if (!$(this).hasClass('selected')){
                        $('.tabs li').removeClass('selected');
                        $(this).addClass('selected');
                                      }
                        var selectionId = $(this).attr('id');
                        $('.content').fadeOut('slow', function(){
                            $('div .page').css('display','none');
                            $('.page#'+selectionId).css('display','block');
                            $('.content').fadeIn('slow');
                                                            });
                                      });
                  
                  });
