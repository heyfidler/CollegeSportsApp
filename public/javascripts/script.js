$(document).ready(function() {
	$("select").change(function() {
		submitForm();
	});
});

function submitForm() {
	var myData = $("#searchForm").serialize();
	console.log("data: " + myData);
	$.ajax({
		url : "/search",
		data : myData,
		dataType : 'html',
		success : function(data) {
			$("#collegeData").html(data);
			console.log("sucess!!: " + data);
		}
	});
}
