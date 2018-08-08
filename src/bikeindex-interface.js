import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BikeIndex } from './../src/bikeindex.js'

$(document).ready(function(){
    let page = 1;

  $('#bikeLocation').click(function(){


    let zip = $('#location').val();
    let bikeIndex = new BikeIndex();
    let promise = bikeIndex.findBikeByZip(zip, page);


    promise.then(function(response){
      let bike = JSON.parse(response);
      let foundCounter = 0;
      for (let i = 0; i < bike.bikes.length; i++) {
        $('.showBike').append("<li>" + bike.bikes[i].title + "<br>" + `<img src="${bike.bikes[i].thumb}"/>`+ "</li>" );
        foundCounter ++;
      }
      $('.showCounter').text(foundCounter + ' showing')
    }, function(error) {
      $('.showHumidity').text(`there was an error processing your request: ${error.message}`);

  });

  $('#nextPage').click(function(){
    page = page +(1/page);
    console.log(page)
    $('.showBike').text("");
    $('#bikeLocation').click();

    });
  });
});
