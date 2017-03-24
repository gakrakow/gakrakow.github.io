function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null
    }

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
    
    // Replace whitespace characters, period, comma, colon, right & left parenthesis, and <br>, with dash.
    csv_filename = csv_filename.replace(/\s|\.|,|:|\(|\)|&|(<br>)/g,"-");
    
    // Replace forward slash and back slash with dash * This should only be done before joining with rest of file name.
    //csv_filename = csv_filename.replace(/\//g, '-');
    
    // Replace multiple dashes in a row
    csv_filename = csv_filename.replace(/-+/g,"-");
    
    // Get rid of dashes at beginning or end of line
    csv_filename = csv_filename.replace(/^-|-$/,"");
    
    return csv_filename;
    }




