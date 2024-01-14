$(document).ready(function () {
  $('.amenities UL LI INPUT').css('margin-right', '10px');
  const checkboxes = $("input[type='checkbox']");
  const amenityIds = {};

  checkboxes.on('change', function () {
    if (this.checked) {
      const amenityId = $(this).attr('data-id');
      amenityIds[amenityId] = amenityId;
      const amenityname = $(this).attr('data-name');
      if ($('.amenities h4').text() === '\xa0') {
        $('.amenities h4').append(amenityname);
      } else {
        $('.amenities h4').append(`, ${amenityname}`);
      }
    } else {
      const amenityId = $(this).attr('data-id');
      const amenityname = $(this).attr('data-name');
      delete amenityIds[amenityId];
      const h4text = $('.amenities h4').text();
      let newtext = '';
      if (h4text.includes(',')) {
        newtext = h4text.replace(', ', '');
        newtext = newtext.replace(`${amenityname}`, '');
      } else {
        newtext = h4text.replace(`${amenityname}`, '');
      }

      $('.amenities h4').text(newtext);
    }
  });
});
