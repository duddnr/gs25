$(document).ready(function(){
	var address = window.location.pathname;
	var parameter = decodeURI(window.location.search);
	console.log(address + parameter);
	
	var entries = performance.getEntriesByType("navigation")[0];
	if(entries.type == "reload")
	{
		window.location.href = address + parameter;
	}
})