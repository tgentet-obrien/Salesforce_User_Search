var sessionID = document.cookie.match('sid=([^;]*)')[1];

sforce.connection.sessionId = sessionID;

var whatUser = /* chrome.i18n.getMessage("whatCase"); */ "Please enter a users name, email address or Id.\r\nIf you would like help please type \"--HELP\"";
var promptMessage = /* chrome.i18n.getMessage("errorMsg"); */ " was not a valid user's Name, Email Address or Id or it could not be found.\r\nPlease try again.";
var wrongId = " was recognised as an Id, but could not be found, please try again.";

userQuery();

/* Created indexOf() method but one that we can use a RegEx with */
String.prototype.regexIndexOf = function(regex, startpos) {
    var indexOf = this.substring(startpos || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
}

var emailRegex = /(?:(?:\r\n)?[ \t])*(?:(?:(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\"(?:[^\\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*\"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\"(?:[^\\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*\"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\"(?:[^\\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*\"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\"(?:[^\\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*\"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\"(?:[^\\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*\"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*)|(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\"(?:[^\\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*\"(?:(?:\r\n)?[ \t])*)*:(?:(?:\r\n)?[ \t])*(?:(?:(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\"(?:[^\\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*\"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\"(?:[^\\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*\"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\"(?:[^\\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*\"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\"(?:[^\\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*\"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\"(?:[^\\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*\"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*)(?:,\s*(?:(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\"(?:[^\\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*\"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\"(?:[^\\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*\"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\"(?:[^\\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*\"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\"(?:[^\\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*\"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\"(?:[^\\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*\"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[\"()<>@,;:\\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*))*)?;\s*)/g;

/* Start search function */
function userQuery() {
    /* Create variable and set to false, used later to throw error if need be */
    var blockSearch = "";

    /* Check SF session cookie in try catch, change to true if session cookie is matched */
    try {
        this.__sfdcSessionId = document.cookie.match(/(^|;\s*)sid=(.+?);/)[2];
    } catch (e) {
        blockSearch = true;
    }
    var resultTrim = prompt(whatUser.trim());
    var result = resultTrim.replace(/\'+/g, "\\'");
    if (blockSearch == true) {
        alert("You must log into Salesforce prior to running the User search.");
    } else if (blockSearch == false) {
        if (result == null) {
            return false;
        } else if (result.toUpperCase() == "--HELP") {
            loadHelp();
        } else if (result.indexOf("--") != -1) {
            if (result.indexOf(" --") != -1) {
                result = result.split(" --");
            } else if (result.indexOf("--")) {
                result = result.split("--");
            }
            if (result[1].toUpperCase() == "LOGIN") {
                if (result[0].match(emailRegex)) {
                    emailSearch("LOGIN", result[0]);
                } else if (result.indexOf("005") != -1) {
                    idSearch("LOGIN", result[0]);
                } else if (result != "") {
                    nameSearch("LOGIN", result[0]);
                } else {
                    alert("'" + result + "'" + promptMessage);
                }
            } else if (result[1].toUpperCase() == "DEACTIVATE") {
                if (result[0].match(emailRegex)) {
                    emailSearch("DEACTIVATE", result[0]);
                } else if (result.indexOf("005") != -1) {
                    idSearch("DEACTIVATE", result[0]);
                } else if (result != "") {
                    nameSearch("DEACTIVATE", result[0]);
                } else {
                    alert("'" + result + "'" + promptMessage);
                }
            } else if (result[1].toUpperCase() == "ACTIVATE") {
                if (result[0].match(emailRegex)) {
                    emailSearch("ACTIVATE", result[0]);
                } else if (result.indexOf("005") != -1) {
                    idSearch("ACTIVATE", result[0]);
                } else if (result != "") {
                    nameSearch("ACTIVATE", result[0]);
                } else {
                    alert("'" + result + "'" + promptMessage);
                }
            } else if (result[1].toUpperCase() == "EDIT") {
                if (result[0].match(emailRegex)) {
                    emailSearch("EDIT", result[0]);
                } else if (result.indexOf("005") != -1) {
                    idSearch("EDIT", result[0]);
                } else if (result != "") {
                    nameSearch("EDIT", result[0]);
                } else {
                    alert("'" + result + "'" + promptMessage);
                }
            } else if (result[1].toUpperCase() == "RESET") {
                if (result[0].match(emailRegex)) {
                    emailSearch("RESET", result[0]);
                } else if (result.indexOf("005") != -1) {
                    idSearch("RESET", result[0]);
                } else if (result != "") {
                    nameSearch("RESET", result[0]);
                } else {
                    alert("'" + result + "'" + promptMessage);
                }
            } else alert("Your command was not understood, please try again.");
        } else if (result[0].match(emailRegex)) {
            emailSearch(undefined, result);
        } else if (result.indexOf("005") == 1) {
            idSearch(undefined, result)
        } else if (result != "") {
            nameSearch(undefined, result);
        } else {
            alert("'" + result + "'" + promptMessage);
        }
    }
}

function emailSearch(type, result) {
    var userQuery = sforce.connection.query("SELECT Id, Name, Email FROM User WHERE (Email LIKE '%" + result + "%' OR Username LIKE '%" + result + "%') ORDER BY isActive DESC LIMIT 10");
    /* Converts the query to an Array so it can be read easier by the JS */
    var userId = userQuery.getArray("records");
    /* If the query only returns one user, then automatically login as the user */
    if (userQuery.size == 1) {
        var id = userId[0].Id.substring(0, 15);
        var name = userId[0].Name;
        var email = userId[0].Email;
        if (type == undefined) {
            window.location = "https://" + window.location.host + "/" + id + "?noredirect=1";
        } else if (type == "LOGIN") {
            window.location = "https://" + window.location.host + "/servlet/servlet.su?oid=00D80000000Khmy&suorgadminid=" + id + "&retURL=%2F" + id + "%3Fnoredirect%3D1&targetURL=%2Fhome%2Fhome.jsp";
        } else if (type == "DEACTIVATE") {
            deactivate(id, name, email);
        } else if (type == "ACTIVATE") {
            activate(id, name, email);
        } else if (type == "RESET") {
            resetPassword(id, name, email);
        }  else if (type == "EDIT") {
            window.location = "https://na8.salesforce.com/" + id + "/e?retURL=%2F" + id + "%3Fnoredirect%3D1";
        }
    } else if (userQuery.size > 1) {
        /* Create blank variable called num, in the case of the query returning multiple users */
        var num = "";
        /* Run through all of the users in a for loop and append a number to the beginning of the user */
        for (var i = 0; i < userQuery.size; i++) {
            num += (i + 1) + ") " + userId[i].Name + " " + userId[i].Email + "\r\n";
        };
        /* Prompt the user to select the corresponding number to the the relevant name on the search list, then login as the user */
        var idSelect = prompt("Please enter the User number from the list below, if they have not been found then please try again:\r\n" + num);
        var idFinal = idSelect - 1;
        var id = userId[idFinal].Id.substring(0, 15);
        var name = userId[idFinal].Name;
        var email = userId[idFinal].Email;
        if (type == undefined) {
            window.location = "https://" + window.location.host + "/" + id + "?noredirect=1";
        } else if (type == "LOGIN") {
            window.location = "https://" + window.location.host + "/servlet/servlet.su?oid=00D80000000Khmy&suorgadminid=" + id + "&retURL=%2F" + id + "%3Fnoredirect%3D1&targetURL=%2Fhome%2Fhome.jsp";
        } else if (type == "DEACTIVATE") {
            deactivate(id, name, email);
        } else if (type == "ACTIVATE") {
            activate(id, name, email);
        } else if (type == "RESET") {
            resetPassword(id, name, email);
        } else if (type == "EDIT") {
            window.location = "https://na8.salesforce.com/" + id + "/e?retURL=%2F" + id + "%3Fnoredirect%3D1";
        }
    } else {
        /* If there is an error and no one if found, throw error alert message */
        alert("'" + result + "'" + promptMessage);
    }
}

function nameSearch(type, result) {
    var userQuery = sforce.connection.query("SELECT Id, Name, Email FROM User WHERE Name LIKE '%" + result + "%' ORDER BY isActive DESC LIMIT 10");
    var userId = userQuery.getArray("records");
    /* If only one user is found, instantly go to the users profile */
    if (userQuery.size == 1) {
        var id = userId[0].Id.substring(0, 15);
        var name = userId[0].Name;
        var email = userId[0].Email;
        if (type == undefined) {
            window.location = "https://" + window.location.host + "/" + id + "?noredirect=1";
        } else if (type == "LOGIN") {
            window.location = "https://" + window.location.host + "/servlet/servlet.su?oid=00D80000000Khmy&suorgadminid=" + id + "&retURL=%2F" + id + "%3Fnoredirect%3D1&targetURL=%2Fhome%2Fhome.jsp";
        } else if (type == "DEACTIVATE") {
            deactivate(id, name, email);
        } else if (type == "ACTIVATE") {
            activate(id, name, email);
        } else if (type == "RESET") {
            resetPassword(id, name, email);
        } else if (type == "EDIT") {
            window.location = "https://na8.salesforce.com/" + id + "/e?retURL=%2F" + id + "%3Fnoredirect%3D1";
        }
    } else if (userQuery.size > 1) {
        /* Create blank variable called num, in the case of the query returning multiple users */
        var num = "";
        /* Run through all of the users in a for loop and append a number to the beginning of the user */
        for (var i = 0; i < userQuery.size; i++) {
            num += (i + 1) + ") " + userId[i].Name + " " + userId[i].Email + "\r\n";
        };
        /* Prompt the user to select the corresponding number to the the relevant name on the search list, then open the users profile */
        var idSelect = prompt("Please enter the User number from the list below, if they have not been found then please try again:\r\n" + num);
        var idFinal = idSelect - 1;
        var id = userId[idFinal].Id.substring(0, 15);
        var name = userId[idFinal].Name;
        var email = userId[idFinal].Email;
        if (type == undefined) {
            window.location = "https://" + window.location.host + "/" + id + "?noredirect=1";
        } else if (type == "LOGIN") {
            window.location = "https://" + window.location.host + "/servlet/servlet.su?oid=00D80000000Khmy&suorgadminid=" + id + "&retURL=%2F" + id + "%3Fnoredirect%3D1&targetURL=%2Fhome%2Fhome.jsp";
        } else if (type == "DEACTIVATE") {
            deactivate(id, name, email);
        } else if (type == "ACTIVATE") {
            activate(id, name, email);
        } else if (type == "RESET") {
            resetPassword(id, name, email);
        } else if (type == "EDIT") {
            window.location = "https://na8.salesforce.com/" + id + "/e?retURL=%2F" + id + "%3Fnoredirect%3D1";
        }
    } else {
        alert("'" + result + "'" + promptMessage);
    }
}

function idSearch(type, result) {
    var userQuery = sforce.connection.query("SELECT Id, Name, Email FROM User WHERE Id = '" + result + "'");
    /* Converts the query to an Array so it can be read easier by the JS */
    var userId = userQuery.getArray("records");
    /* If the query only eturns one user, then automatically login as the user */
    if (result.length == 15 || result.length == 18) {
        var id = userId[0].Id.substring(0, 15);
        var name = userId[0].Name;
        var email = userId[0].Email;
        if (type == undefined) {
            window.location = "https://" + window.location.host + "/" + id + "?noredirect=1";
        } else if (type == "LOGIN") {
            window.location = "https://" + window.location.host + "/servlet/servlet.su?oid=00D80000000Khmy&suorgadminid=" + id + "&retURL=%2F" + id + "%3Fnoredirect%3D1&targetURL=%2Fhome%2Fhome.jsp";
        } else if (type == "DEACTIVATE") {
            deactivate(id, name, email);
        } else if (type == "ACTIVATE") {
            activate(id, name, email);
        } else if (type == "RESET") {
            resetPassword(id, name, email);
        } else if (type == "EDIT") {
            window.location = "https://na8.salesforce.com/" + id + "/e?retURL=%2F" + id + "%3Fnoredirect%3D1";
        }
    } else {
        alert("'" + result + "'" + wrongId);
    }
}

function deactivate(id, name, email) {
    if (userConfirm("Deactivation", name, email)) {
        /* Checks the user and marks them as deactivated */
        var user = new sforce.SObject("user");
        user.Id = id;
        user.isActive = false;
        sforce.connection.update([user]);
        window.location = "https://" + window.location.host + "/setup/user/userdeactivate.jsp?retURL=%2F" + id + "%3Fnoredirect%3D1&id=" + id;
    } else alert("Deactivation Cancelled!");
}

function activate(id, name, email) {
    if (userConfirm("Activation", name, email)) {
        /* Checks the user and marks them as deactivated */
        var user = new sforce.SObject("user");
        user.Id = id;
        user.isActive = true;
        sforce.connection.update([user]);
        window.location = "https://" + window.location.host + "/" + id + "?noredirect=1";
    } else alert("Deactivation Cancelled!");
}

function resetPassword(id, name, email) {
    if (userConfirm("Password Reset", name, email)) {
    /* Checks the user and marks them as deactivated */
    var password = sforce.connection.resetPassword(id);
    window.location = "https://" + window.location.host + "/" + id + "?noredirect=1";
    } else alert("Password Reset Cancelled!");
}

function userConfirm(type, name, email){
    return confirm("Please confirm the " + type + " of '" + name + "' (" + email + ")");
}

function loadHelp(){
    var html = "";
        html += "<html>";
        html += "<head>";
        html += "   <title>User Search Page</title>";
        html += "   <style type=\"text/css\">";
        html += "       .tg  {border-collapse:collapse;border-spacing:0;border-color:#999;}";
        html += "       .tg td{font-family:Arial, sans-serif;font-size:14px;padding:8px 6px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#999;color:#444;background-color:#F7FDFA;}";
        html += "       .tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:8px 6px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-color:#999;color:#fff;background-color:#26ADE4;}";
        html += "       .tg .tg-s6z2{text-align:center}";
        html += "       .tg .tg-58iv{font-size:18px;font-family:Arial, Helvetica, sans-serif !important;;text-align:center}";
        html += "   </style>";
        html += "</head>";
        html += "<body>";
        html += "<table class=\"tg\" style=\"undefined;table-layout: fixed; width: 696px\">";
        html += "<colgroup>";
        html += "<col style=\"width: 115px\">";
        html += "<col style=\"width: 215px\">";
        html += "<col style=\"width: 377px\">";
        html += "</colgroup>";
        html += "  <tr>";
        html += "    <th class=\"tg-58iv\">Command</th>";
        html += "    <th class=\"tg-58iv\">Example</th>";
        html += "    <th class=\"tg-58iv\">What does it do?</th>";
        html += "  </tr>";
        html += "  <tr>";
        html += "    <td class=\"tg-s6z2\">--LOGIN</td>";
        html += "    <td class=\"tg-s6z2\">Timothy Gentet --LOGIN</td>";
        html += "    <td class=\"tg-s6z2\">The login command will search for a user then instantly log you in as the user searched for.</td>";
        html += "  </tr>";
        html += "  <tr>";
        html += "    <td class=\"tg-s6z2\">--DEACTIVATE</td>";
        html += "    <td class=\"tg-s6z2\">Timothy Gentet --DEACTIVATE</td>";
        html += "    <td class=\"tg-s6z2\">The deactivate command will search for a user then deactivate the user on confirmation.</td>";
        html += "  </tr>";
        html += "  <tr>";
        html += "    <td class=\"tg-s6z2\">--ACTIVATE</td>";
        html += "    <td class=\"tg-s6z2\">Timothy Gentet --ACTIVATE</td>";
        html += "    <td class=\"tg-s6z2\">The activate command will search for a user then activate the user on confirmation.</td>";
        html += "  </tr>";
        html += "  <tr>";
        html += "    <td class=\"tg-s6z2\">--EDIT</td>";
        html += "    <td class=\"tg-s6z2\">Timothy Gentet --EDIT</td>";
        html += "    <td class=\"tg-s6z2\">The edit command will search for a user then take you direct to the edit view of the user.</td>";
        html += "  </tr>";
        html += "  <tr>";
        html += "    <td class=\"tg-s6z2\">--RESET</td>";
        html += "    <td class=\"tg-s6z2\">Timothy Gentet --RESET</td>";
        html += "    <td class=\"tg-s6z2\">The reset command will search for a user then automatically reset the password of that user.</td>";
        html += "  </tr>";
        html += "</table>";
        html += "</body>";
        html += "</html>";

    var myWindow = window.open("","User Search Help","width=724,height=300");
        myWindow.document.write(html);
        myWindow.document.close(); //missing code
        myWindow.focus();
}