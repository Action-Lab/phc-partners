# phc-partners
Display Google Forms application data on Public Humanities Collaborative web page

## Live example
http://commons.trincoll.edu/cli/phc

## Requirements
- Google Form responses must appear in Google Sheets, which must be published. Insert URLs in main.js
- manually insert "Display" column in "Partners" Google Sheet, and manually insert "y" to approve display
- embed iframes for Google Form and also for this GH-published repo in the web pages
- NOTE: do NOT use this for high-security data, since the Google Sheet ID is visible in the code

## Credits
Created by Ilya Ilyankou (@ilyankou) for Liberal Arts Action Lab, Hartford CT

## Dependencies
* Tabletop v1.5.2, https://github.com/jsoma/tabletop
* jQuery v3.2.1, https://jquery.com/
