
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

function SetElObjFromEsIdParam() {
    if (getURLParameter('es_id')) {
        var es_id_value = getURLParameter('es_id');
        var jsonCall = "https://gakrakow.cartodb.com/api/v2/sql?q=SELECT es_id, sname ,scomname ,exportdate ,sprot ,usesa ,srank ,grank FROM es_web WHERE es_id = " + es_id_value;
        $.getJSON(jsonCall, function(result){
            el_obj_str = JSON.stringify(result.rows[0]);
            if (typeof el_obj_str != 'undefined') {
                console.log('eo_obj: ' + el_obj_str);
                localStorage.setItem("el_obj", el_obj_str);
            } else {
                console.log('ERROR!!! el_obj is not defined. Probably, the es_id parameter value does match an es_id in the es_web data table');
            };
        });
    } else {
        var noEsIdError = 'ERROR!!! No element subnational ID in URL parameter.';
        console.log(noEsIdError);
    };
};

function setDefaultsInStorage() {
    localStorage.group = 'all_groups';
    localStorage.status = 'all_statuses';
    localStorage.rank = 'all_ranks';
    localStorage.show_rank = 'true';
    localStorage.show_status = 'true';
    localStorage.show_swap = 'true';
    localStorage.show_eo_count = 'true';
    localStorage.show_profile_link = 'true';
    localStorage.show_range_map_link = 'true';
    localStorage.show_ns_explorer_link = 'true';
    localStorage.show_sshabitat = 'true';
    localStorage.show_sql_query = 'false';
    localStorage.defaults_set = 'true';
};

function nonLocationFiltersAreSet() {
    if (localStorage.group != 'all_groups'|| 
    localStorage.rank != 'all_ranks'|| 
    localStorage.show_rank != 'true' || 
    localStorage.status != 'all_statuses' || 
    localStorage.show_swap != 'true' || 
    localStorage.show_eo_count != 'true' || 
    localStorage.show_range_map_link != 'true' || 
    localStorage.show_ns_explorer_link != 'true' || 
    localStorage.show_sshabitat != 'true') {
        //alert('Non location filters are set');
        return true;
    }
}

function locationFiltersAreSet() {
    if (localStorage.area_name == null || localStorage.area_name == '') {
        //alert('area name is null');
        //alert('localStorage.area_name is: ' + localStorage.area_name);
        return false;
    } else {
        //alert('area name is not null');
        //alert('localStorage.area_name is: ' + localStorage.area_name);
        return true;
    }
}

function showWarningDialog() {
    //Remove style='display:none' and show dialog box
    document.getElementById('ac-wrapper').removeAttribute('style');
}

function hideWarningDialog() {
    // Set style to display 'none' and hide dialog.
    document.getElementById('ac-wrapper').style.display = "none";
}

function PopUp(hideOrshow) {
    if (hideOrshow == 'show') {
        //alert('about to show dialog');
        showWarningDialog();
        return
    } else if (hideOrshow == 'keep-filters') {
        //alert('in keep-filters');
        localStorage.showWarning = true;
    } else if (hideOrshow == 'clear-filters') {
        //alert('in clear-filters');
        clearLocationFilter();
        clearNonLocationFilter();
        localStorage.showWarning = true;
        // This is the only choice that requires reloading
        location.reload();
    } else if (hideOrshow == 'do-not-show') {
        //alert('in do-not-show');
        localStorage.showWarning = false;
    } else {
        alert('You should not get here!!!');
    }
    hideWarningDialog();
}

/*
function defaultsSetInStorage() {
    if (localStorage.group == 'all_groups' &&
    localStorage.status == 'all_statuses' &&
    localStorage.rank == 'all_ranks' &&
    localStorage.show_rank == 'true' &&
    localStorage.show_status == 'true' &&
    localStorage.show_swap == 'true' &&
    localStorage.show_eo_count == 'true' &&
    localStorage.show_range_map_link == 'true' &&
    localStorage.show_ns_explorer_link == 'true' &&
    localStorage.show_sshabitat == 'true' &&
    localStorage.show_sql_query == 'false') {
        return 'true';
    } else {
        return 'false';
    }
};
*/

function clearAllFilters() {
    setDefaultsInStorage();
    localStorage.report_type = 'general';
    localStorage.area_type = '';
    localStorage.area_name = '';
}

function clearLocationFilter() {
    localStorage.report_type = 'general';
    localStorage.area_type = '';
    localStorage.area_name = '';
    localStorage.rpt_name = '';
}
function clearNonLocationFilter() {
    setDefaultsInStorage()
}