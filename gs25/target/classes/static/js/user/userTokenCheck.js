var accessToken = "";
$(document).ready(function(){
	var address = window.location.pathname.replace("/pc_cafe", "");
	console.log("address : " + address);
	
	var parameter = decodeURI(window.location.search);
	console.log("parameter : " + parameter);
	
	var address_parameter = address + parameter;
	console.log("URL : " + address_parameter);
	
	if(address_parameter != "/authError" && address_parameter != "/userError")
	{
		accessTokenIssued(address_parameter);
	}
});

function accessTokenIssued(address)
{
	$.ajax(
	{
		type: "GET",
		url: "/userApi/accessTokenIssued"
	})
	.done(function(response)
	{
		console.log("accessToken : " + response);
		accessToken = response;
		tokenCheck(accessToken, address);
	})
	.fail(function()
	{
		console.log("fail");
	})
}


function tokenCheck(accessToken, address) { // 토큰 권한 체크
		$.ajax({
			type: "GET",
			url: address,
			headers: { Authorization : "Bearer " + accessToken},
			dataType: "html"
		})
		.done(function(result){
			console.log("tokenCheck Ok");
			
			$("#result").html(result);
		})
		.fail(function(data){
			console.log("tokenCheck Fail : " + data.status);
		
			if(data.status == 401) // 로그인을 하지 않았을 경우
			{
				window.location.href = "/userError";
			}
			else if(data.status == 403) // 권한이 안맞는 경우
			{
				window.location.href = "/authError";
			}
		})
}