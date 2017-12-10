var facultyURL = 'https://docs.google.com/spreadsheets/d/1FOYpxQQQ9EZUsuBDR_LKwVsQRz7pHF414g_X27h7ajo/pubhtml';

Tabletop.init({
  key: facultyURL,
  callback: processData,
  simpleSheet: true,
});

function mergeOrganizationAndWebsite(org, website) {
  if (!website) { return org; }
  return '<span class="invisible">' + org + '</span>'
    + '<a href="http://' + website + '">' + org + '</a>';
}

function mergeTitleProject(title, project) {
  return '<h3>' + title + '</h3> <p>' + project + '</p>';
}


function emailToLink(name, email) {
  if (!email) { return name; }
  return name + ' <a href="mailto:' + email + '"> <i class="fa fa-envelope"> </a>';
}


function processData(data, tabletop) {
  if (!data[0]) return;

  var processedData = [];

  for (i in data) {
    var r = data[i];
    if (r.Display !== 'y') continue;

    // Add a row to the final dataset
    processedData.push([
      mergeOrganizationAndWebsite(r.Organization, r.Website) + '<br><br>' + emailToLink(r.Name, r.Email),
      mergeTitleProject(r.Title, r.Project),
    ]);
  }

  // Adding custom filtering
  /*
  $.fn.dataTable.ext.search.push(
    function(settings, data, dataIndex) {

      // This is a JavaScript object whose keys will
      // be the checked values (e.g. Arts, "Social Sciences")
      showOnly = {};

      $('input:checkbox:checked').each(function() {
        showOnly[this.value] = 1;
      });

      var divisions = data[2].split(',').map(function(x) {return x.trim()});

      for (i in divisions) {
        if (showOnly[divisions[i]] === 1) {
          return true;
        }
      }
      return false;
    }
  ); */


  $(document).ready(function() {
    var table = $('#results').DataTable({
      paging: false,
      info: false,
      ordering: true,
      data: processedData,
      columns: [
        {title: 'Organization', width: '200px', className: 'td-center'},
        {title: 'Project', orderable: false},
      ]
    });

    $('input[name="filter"]').change(function() {
      table.draw();
    });

  });

  /*
  var filters = [
    ['Arts', 'Art'],
    ['Humanities', 'Hum'],
    ['Sciences', 'Sci'],
    ['Social Sciences', 'Soc'],
    ['Public Humanities Collaborative', 'PHC']
  ] */

  /*
  function renameCheckboxes() {
    var shorten = $(window).width() < 900 ? 1 : 0;
    $('#filters label').each(function(i) {
      $(this).text(filters[i][shorten])
    });
  } */

  /*
  $(window).resize(renameCheckboxes);
  renameCheckboxes(); */

}
