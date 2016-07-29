function filenameDate(dateval) {
    var dateval = new Date(dateval);
    var year = dateval.getFullYear();
    var month = ("0" + (dateval.getMonth() + 1)).slice(-2);
    var date = ("0" + dateval.getDate()).slice(-2);
    var filenameDate = '-' + year + '-' + month + '-' + date;
    return filenameDate;
    }

function makeCsvFilename(header_vals) {
    // This cleans up and formats CSV file names. 
    // The regex cleanup part of this should probably be put into a different function. Similar code is used in another place in the element_lists.html page.
    var csv_filename = header_vals.rank + ' ' + header_vals.group + ' ' + header_vals.status;
    csv_filename = csv_filename.replace(/\s|\.|,|:|\(|\)|&|(<br>)/g,"-");
    csv_filename = csv_filename.replace(/-+/g,"-");
    csv_filename = csv_filename.replace(/^-|-$/,"");
    return csv_filename;
    }




