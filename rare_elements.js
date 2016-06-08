function filenameDate(dateval) {
    var dateval = new Date(dateval);
    var year = dateval.getFullYear();
    var month = ("0" + (dateval.getMonth() + 1)).slice(-2);
    var date = ("0" + dateval.getDate()).slice(-2);
    var filenameDate = year + month + date;
    return filenameDate;
    }

function makeCsvFilename(header_vals) {
    // Some day you are gonna have to figure out how to do this with much fewer regular expression.
    csv_filename = header_vals.rank + ' ' + header_vals.group + ' ' + header_vals.status;
    csv_filename = csv_filename.replace(/,/g,"").replace(/\(/g,"").replace(/\)/g,"");
    csv_filename = csv_filename.replace(/ /g,"-").replace(/\&/,"-").replace('<br>',"-");
    csv_filename = csv_filename.replace(/--/g,"-").replace(/--/g,"-").replace(/--/g,"-").toLowerCase();
    return csv_filename
    }
