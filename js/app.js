// JavaScript Document

// ********************
// Variables
// ********************

var studentsRO = $('.student-list').clone();
var paginationDiv = $('<div class="pagination"><ul></ul></div>');
var activeStudents = studentsRO.clone();
var studentList = activeStudents.find('li');
var studentCount = studentList.length;
var studentsPerPage = 10;

// ********************
// Functions
// ********************

// Setup pagination content
// --------
// Recreates pagination list elements based on studentCount and 
// studentsPerPage. 
// Adds event handler for list elements (page) click processing
var setupPagination = function (studentCount) {
	var pageCount = Math.ceil(studentCount / studentsPerPage);
	var paginationList = paginationDiv.find("ul");
    paginationDiv.find('ul li').remove();
	if (pageCount > 1)
	{
	for (var i = 1; i <= pageCount; i++) {
		var listItem;
		if (i === 1) {
			listItem = $("<li><a class='active' href='#'>" + i + "</a></li>");
		} else {
			listItem = $("<li><a href='#'>" + i + "</a></li>");
		}
		listItem.on("click", {
			pageIdx: i
		}, function (e) {
			e.preventDefault();
			showStudents(e.data.pageIdx);
			$('.pagination li a').removeClass('active');
			$(this).find('a').addClass('active');
		});
		paginationList.append(listItem);
	}}
};

// Show students
var showStudents = function (pageIdx) {
	var currentStudentList = $('.student-list').find('li');
	currentStudentList.hide();
	var startIdx = (pageIdx - 1) * studentsPerPage;
	var endIdx = startIdx + studentsPerPage;
	for (var i = startIdx; i < endIdx && i < studentList.length; i++) {
		currentStudentList.eq(i).show();
	}
};

// Search
var search = function() {
  var replacementContent = studentsRO.clone().find('li');
  var filteredStudentContainer = studentsRO.clone();
  var filteredStudents = filteredStudentContainer.find('li');
  var criteria =  $('.student-search input').val().trim();
  if (criteria.length > 0)
  {
   var names = studentsRO.find('h3');
   var emails = studentsRO.find('span.email');
   studentsRO.find('li').each(function(idx){
	 var name = names.eq(idx).text();
	 var email = emails.eq(idx).text();
	 if (name.indexOf(criteria) === -1 && email.indexOf(criteria) === -1)
	 {
       filteredStudents.eq(idx).addClass('remove');
	 }
   }); 

   filteredStudentContainer.find('li.remove').remove();
   if (filteredStudentContainer.find('li').length === 0)
   {
	   replacementContent = $('<div id="noresults">No students found that match your criteria.</div>');   
   }
   else {
	   replacementContent = filteredStudentContainer.find('li');
   }
  }
	setupPagination(replacementContent.length);
	$('.student-list').empty();
	$('.student-list').append(replacementContent);

  showStudents(1);
};

// Setup Search Area
var setupSearch = function(){
	var searchDiv = $('<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>');
	searchDiv.find("button").on("click", search);
	$('.page-header').append(searchDiv);
};

// Initialize 
var initialize = function () {
	$('.student-list').empty();
	$('.student-list').append(studentList);
	showStudents(1);

	if (studentCount > studentsPerPage) {
		setupPagination(studentList.length);
		$(".page").append(paginationDiv);
	}
	setupSearch();
};


initialize();
