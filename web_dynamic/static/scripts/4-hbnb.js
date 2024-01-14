$(document).ready(function () {
  $('.amenities UL LI INPUT').css('margin-right', '10px');
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data, success) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
  const checkboxes = $("input[type='checkbox']");
  const amenityIds = {};

  checkboxes.on('change', function () {
    if (this.checked) {
      const amenityId = $(this).attr('data-id');
      const amenityname = $(this).attr('data-name');
      amenityIds[amenityId] = amenityname;
    } else {
      const amenityId = $(this).attr('data-id');
      delete amenityIds[amenityId];
    }
    const alist = [];
    for (const k in amenityIds) {
      alist.push(amenityIds[k]);
    }
    $('.amenities h4').text(alist.join(', '));
  });

  $('.filters button').on('click', function () {
    $('.places').text('')
    const amenities = [];
    for (const id in amenityIds) {
      amenities.push(id);
    }
	  console.log(amenities);
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ amenities }),
      success: function (data) {
        $.each(data, function (k, v) {
          $(`<article>
          <div class="title_box">
            <h2>${v.name}</h2>
            <div class="price_by_night">&#36;${v.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${v.max_guest} Guests</div>
            <div class="number_rooms">${v.number_rooms} Bedrooms</div>
            <div class="number_bathrooms">${v.number_bathrooms} Bathroom</div>
          </div>
          <div class="user">
            <strong>Owner: PLACEHOLDER</strong>
          </div>
          <div class="description">
            ${v.description}
          </div>
          </article>`).appendTo('.places');
        });
      }
    });
  });
});
