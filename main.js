var ideasURL = 'https://docs.google.com/spreadsheets/d/10h3PmOuRoY9fJcpFoa1VJ0fSNrjYBFo0bc01FEpG_4s/pubhtml'

Tabletop.init({
  key: ideasURL,
  callback: processData,
  simpleSheet: true,
});

function mergeOrganizationAndWebsite(org, website) {
  if (!website) { return org; }
  return '<span class="invisible">' + org + '</span>'
    + '<a target="_blank" href="http://' + website + '">' + org + '</a>';
}

function mergeTitleResearchNeeds(title, research, needs) {
  res = '';
  if (title) {
    res += '<h3>' + title + '</h3>';
  }

  res += '<p><span class="emphasis">Project Idea: </span>' + research + '</p>';

  if (needs) {
    res += '<p><span class="emphasis">Student Role: </span>' + needs + '</p>';
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
      mergeTitleResearchNeeds(r.Title, r.Project, r['Student Role']),
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
