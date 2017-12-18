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

function mergeTitleResearchNeeds(title, research, needs) {
  res = '';
  if (title) {
    res += '<h3>' + title + '</h3>';
  }

  res += '<p><span class="emphasis">Public Humanities Project: </span>' + research + '</p>';

  if (needs) {
    res += '<p><span class="emphasis">Student Researchers: </span>' + needs + '</p>';
  }

  return res;
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
      mergeTitleResearchNeeds(r.Title, r.Project, r['Student Researchers']),
    ]);
  }


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

}
