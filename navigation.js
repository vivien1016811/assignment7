/*
      File: /~vchow/assignment7/navigation.js
      Author: Vivien Chow, UMass Lowell Computer Science Student
      Course: 91.461 GUI Programming I
      E-mail: vivien_chow@student.uml.edu
      Assignment 7: Creating a Single-Page Navigation Interface
      Date Created: September 21, 2014
      Description: This is the javascript file for the single-page
                   navigation of the page.
      Updated by Vivien Chow on November 3rd, 2014 at 3:31 PM
*/

/*The code below is from Curran Kelleher's class notes. */

(function () {

  /* 
    Stores the partial cache so that the cache can be reloaded if that
    page is being loaded for the second time. 
  */
  var partialsCache = {}

  function getContent(fragmentId, callback){

    /*
      Pass previously fetched content if the page has been fetched before. 
    */
    if(partialsCache[fragmentId]) {

      callback(partialsCache[fragmentId]);

    } else {
    
    /*
      If the page has not been fetched before, fetch it and store the 
      fetched content in cache now. 
    */
      $.get(fragmentId + ".html", function (content) {
        partialsCache[fragmentId] = content;
        callback(content);
      });
    }
  }

  /* 
    Sets the active class for the links.
  */
  function setActiveLink(fragmentId){
    $("#navbar a").each(function (i, linkElement) {
      var link = $(linkElement),
          pageName = link.attr("href").substr(1);
      if(pageName === fragmentId) {
        link.attr("class", "active");
      } else {
        link.removeAttr("class");
      }
    });
  }

  /*
    Update the dynamic content part according to the fragment identifier.
  */
  function navigate(){

    /* Get rid of the # sign. */
    var fragmentId = location.hash.substr(1);

    /* Get the content according to the fragment identifier. */
    getContent(fragmentId, function (content) {
      $("#content").html(content);
    });

    /* Sets the current active link. */
    setActiveLink(fragmentId);
  }

  /* 
    Sets the default fragment identifier as #home, which is the homepage. 
  */
  if(!location.hash) {
    location.hash = "#home";
  }
  
  /* Navigate to fragment identifier. */
  navigate();

  /* Navigate to specific pages as fragment identifier changes. */
  $(window).bind('hashchange', navigate);
}());