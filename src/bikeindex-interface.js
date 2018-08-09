import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BikeIndex } from './../src/bikeindex.js'

$(document).ready(function(){
  let page = 1;

  $('#bikeLocation').click(function(){
    // let page = 1;

    let location = $('#location').val();
    let bikeIndex = new BikeIndex();
    let bikeListPromise = bikeIndex.findBikeByLocation(location, page);
    let bikeNumberPromise = bikeIndex.findNumberByLocation(location);

    bikeListPromise.then(function(response){
      let bike = JSON.parse(response);
      let foundCounter = 0;
      for (let i = 0; i < bike.bikes.length; i++) {
        $('.showBike').append("<li>" + bike.bikes[i].title + "<br>" + `<img src="${bike.bikes[i].thumb}"/>`+ "</li>" );
        foundCounter ++;
      }
      $('.showCounter').text(foundCounter + ' showing');
      $('.search').text(bike.proximity);

    }, function(error) {
      $('.showHumidity').text(`there was an error processing your request: ${error.message}`);
    });

    bikeNumberPromise.then(function(response){
      let bike = JSON.parse(response);
      let foundCounter = 0;
      $('.search').text(bike.proximity + ' found');

    }, function(error) {
      $('.showHumidity').text(`there was an error processing your request: ${error.message}`);
    });

  });
  $('#nextPage').click(function(){
    page = page +(1);
    console.log(page)
    $('.showBike').text("");
    $('#bikeLocation').click();

  });
});
