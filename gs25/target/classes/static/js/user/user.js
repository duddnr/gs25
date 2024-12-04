$(document).on("click", "#userLoginBtn",function() {
	var user = {
		userId : $("#userId").val(),
		password : $("#password").val()
	}
	console.log(user);
	
	$.ajax(
	{
		type: "POST",
		url: "/login",
		data: JSON.stringify(user),
		contentType: "application/json; charset=utf-8"
	})
	.done(function() {
		window.location.href = "/pc_cafe/main";
	})
	.fail(function() {
		console.log("fail");
		window.location.href = "/pc_cafe/LoginError?errorMsg=아이디와 비밀번호를 확인해주세요";
	})
});


$(document).on("click", "#userJoinBtn",function() {
	console.log(userJoinData);
	
	$.ajax(
	{
		type: "POST",
		url: "/userApi/userJoin",
		data: JSON.stringify(userJoinData),
		contentType: "application/json; charset=utf-8",
		error: function(xhr, status, error) {
	    console.log("AJAX 실패", status, error);}
	})
	.done(function() {
		alert("회원가입 완료");
		location.reload();
	})
	.fail(function(inputNullCheck) {
		var list = inputNullCheck.responseJSON;
		
		if (list != null) {
			for (var i = 0; i < list.length; i++) 
			{
				if ($(list[i]).val() == "") 
				{
					$(list[i] + "Check").show();
				}
			}
		}
	})
});


$(document).on("click", "#emailCertificationBtn",function() {
	$("#timer").timer("#timer");
	$(".emailCode").css("display", "grid");
	
	var email = $("#userJoinEmail").val();
	
	$.ajax(
	{
		type: "POST",
		url: "/emailCertification",
		data: { email: email }
	})
	.done(function() {
	})
	.fail(function() {
		console.log("fail");
	})
});



$(document).on("click", "#emailCodeBtn",function() {
	var email = $("#userJoinEmail").val();
	var emailCode = $("#emailCode").val().replace(/\s+/g, "");;
	
	if($("#emailCode").val() == "")
	{
		$("#emailCodeCheck").checkText("#emailCodeCheck", "인증코드를 입력하세요.", "red");
	}
	else
	{
		$.ajax(
		{
			type: "GET",
			url: "/emailCodeCheck",
			data: { email: email,
						 emailCode: emailCode }
		})
		.done(function(str) {
			alert(str);
			
			$("#userJoinEmail").attr("disabled", true); // 이메일 인풋 값 입력 막기
			$("#emailCertificationBtn").text("완료").attr("disabled", true); // 인증 버튼 비활성화
			
			$("#emailCode").attr("disabled", true); // 인증 코드 인풋 값 입력 막기
			$("#emailCodeBtn").attr("disabled", true); // 인증 코드 버튼 비활성화
				
			$("#timer").css("display", "none"); // 타이머 없애기
			clearInterval(countdown); // 타이머 초기화
		})
		.fail(function() {
			$("#emailCodeCheck").checkText("#emailCodeCheck", "인증코드가 일치하지 않습니다.", "red");
		})
	}
});

var countdown;
$.fn.timer = function(tagId)
{
	$(tagId).text("3:00");
	var time = 179;
	
	function updateTimer()
	{
		var minutes = Math.floor(time / 60);
		var seconds = time % 60;
		
		//console.log(minutes + ":" + ("0" + seconds).slice(-2));
		$(tagId).text(minutes + ":" + ("0" + seconds).slice(-2));
		
		if(time <= 0)
		{
			clearInterval(countdown);
			$(tagId).text("시간 초과");
		}
		
		time--;
	}
	
	clearInterval(countdown);
	countdown = setInterval(updateTimer, 1000);
};

$(document).on("click", "#findIdBtn",function() {
	var userEmailCheck = RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
	var userNameCheck = RegExp(/^[가-힣]*$/);
	
	if($("#findIdEmailinput").val() == "" || $("#findNameinput").val() == "")
	{
		alert("이메일 또는 이름을 입력해 주세요.");
	}
	else if(userEmailCheck.test($("#findIdEmailinput").val()) && userNameCheck.test($("#findNameinput").val()))
	{
		$("#findEmailCheck").css("display", "none");
		
		$.ajax(
		{
			type: "GET",
			url: "/userApi/userFind?userName=" + $("#findNameinput").val() + "&userEmail=" + $("#findIdEmailinput").val()
		})
		.done(function(userId)
		{
			var id = userId.replace(/(.{4})$/, "****");
			$("#findIdText").text(id);
		})
		.fail(function()
		{
			alert("검색된 회원이 없습니다.")
		})
	}
	else
	{
		$("#findEmailCheck").checkText("#findEmailCheck", "이메일 또는 이름이 정확한지 확인해 주세요.");
	}
});

$(document).on("click", "#FPW_email_CertificationBtn", function() {
	$("#FPW_timer").timer("#FPW_timer");
	$(".findemailCode").css("display", "flex");
	
	var userEmail = $("#FPW_email_input").val();
	
	// 이메일 코드 전송
	$.ajax(
	{
		type: "POST",
		url: "/emailCertification",
		data: { email: userEmail }
	})
	.done(function() {
	})
	.fail(function() {
		console.log("fail");
	})
});

$(document).on("click", "#FPW_emailCodeBtn",function() {
	var email = $("#FPW_email_input").val();
	var emailCode = $("#FPW_emailCode_input").val().replace(/\s+/g, "");
	
	if(emailCode == "")
	{
		$("#FPW_emailCodeCheck").checkText("#FPW_emailCodeCheck", "인증코드를 입력하세요.", "red");
	}
	else
	{
		$.ajax(
		{
			type: "GET",
			url: "/emailCodeCheck",
			data: { email: email,
						 emailCode: emailCode }
		})
		.done(function(str) {
			alert(str);
			
			$("#FPW_email_input").attr("disabled", true); // 이메일 인풋 값 입력 막기
			$("#FPW_email_CertificationBtn").text("완료").attr("disabled", true); // 인증 버튼 비활성화
			
			$("#FPW_emailCode_input").attr("disabled", true); // 인증 코드 인풋 값 입력 막기
			$("#FPW_emailCodeBtn").attr("disabled", true); // 인증 코드 버튼 비활성화
				
			$("#FPW_timer").css("display", "none"); // 타이머 없애기
			clearInterval(countdown); // 타이머 초기화
		})
		.fail(function() {
			$("#FPW_emailCodeCheck").checkText("#FPW_emailCodeCheck", "인증코드가 일치하지 않습니다.", "red");
		})
	}
});

$(document).on("click", "#newPassword",function() {
	userId = $("#FPW_id_input").val();
	userEmail = $("#FPW_email_CertificationBtn").text();
	
	if(userId == "" || userEmail != "완료")
	{
		alert("아이디를 입력 하거나 이메일을 인증해 주세요.");
	}
	else
	{
		console.log("ok");
		$(".FPW_information").css("display", "none");
		$(".FPW_newPassword").css("display", "block");
	}
});

$(".modal").on("show.bs.modal", function () {
	$.ajax({
		type: "GET",
		url: "/main",
		dataType: "html",
	})
	.done(function(data) {
		$(data).find(".modal-body").each(function(index)
		{
			$(".modal-body").eq(index).empty();
			$(".modal-body").eq(index).html($(data).find(".modal-body").eq(index).html());
		})
		$(this).rebinding();
	})
	.fail(function() {
		console.log("fail");
	})
});