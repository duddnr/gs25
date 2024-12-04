$(document).ready(function(){
	var address = window.location.pathname.replace("/", "");
	
	if(address == "authError")
	{
		alert("ADMIN만 이용가능합니다.");
	}
	else if(address == "userError")
	{
		alert("로그인 후 이용가능합니다.");
	}
	window.location.href = "/pc_cafe/main";
});