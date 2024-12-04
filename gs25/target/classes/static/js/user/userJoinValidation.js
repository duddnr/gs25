$.fn.rebinding = function()
{
let userJoinData = 
{
	userName : null,
	userId : null,
	password : null,
	email : null,
	userPhoneNumber : null
}

$.fn.checkText = function(id,text, color)
{
	$(id).text(text).css("color", color);
	$(id).show();
};



$("#userJoinId").on("blur", function() {
	var userIdCheck = RegExp(/^(?=.*[a-z])[a-z0-9]{5,20}$/);
	
	if($("#userJoinId").val() == "")
	{
		$("#userJoinIdCheck").show();
	}
	else if(userIdCheck.test($("#userJoinId").val())) // 정규식 표현과 일치한다면
	{
		$("#userJoinIdCheck").checkText("#userJoinIdCheck", "사용 가능한 아이디 입니다.", "green");
		userJoinData.userId = $("#userJoinId").val();
		console.log(userJoinData);
	}
	else
	{
		$("#userJoinIdCheck").checkText("#userJoinIdCheck", "5~20자의 영문, 숫자만 사용 가능합니다.", "red");
	}
});



$("#userJoinPassword").on("propertychange change paste input", function() {
	var userPasswordCheck = RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,12}$/);
	
	if(userPasswordCheck.test($("#userJoinPassword").val())) // 정규식 표현과 일치한다면
	{
		$("#userJoinPasswordMsg").checkText("#userJoinPasswordMsg", "사용 가능한 비밀번호 입니다.", "green");
		$("#userJoinPasswordCheck").attr("disabled", false);
		console.log(userJoinData);
	}
	else
	{
		$("#userJoinPasswordMsg").checkText("#userJoinPasswordMsg", "6~12자의 영문 대/소문자, 숫자를 사용해 주세요.", "red");
		$("#userJoinPasswordCheck").attr("disabled", true);
	}
});

$("#userJoinPasswordCheck").on("propertychange change paste input", function() {
	if($("#userJoinPassword").val() == $("#userJoinPasswordCheck").val())
	{
		$("#userJoinPasswordCheckMsg").checkText("#userJoinPasswordCheckMsg", "비밀번호가 일치합니다.", "green");
		userJoinData.password = $("#userJoinPassword").val();
		console.log(userJoinData);
	}
	else if($("#userJoinPassword").val() != $("#userJoinPasswordCheck").val())
	{
		$("#userJoinPasswordCheckMsg").checkText("#userJoinPasswordCheckMsg", "비밀번호가 일치하지 않습니다.", "red");
	}
});


$("#userJoinName").on("blur", function() {
	var userNameCheck = RegExp(/^[가-힣]*$/);
	
	if($("#userJoinName").val() == "")
	{
		$("#userJoinNameCheck").show();
	}
	else if(userNameCheck.test($("#userJoinName").val())) // 정규식 표현과 일치한다면
	{
		$("#userJoinNameCheck").hide();
		userJoinData.userName = $("#userJoinName").val();
		console.log(userJoinData);
	}
	else
	{
		$("#userJoinNameCheck").checkText("#userJoinNameCheck", "한글만 입력 가능 합니다.", "red");
	}
});



$("#userJoinPhoneNumber").on("blur", function() {
	var userPhoneNumberCheck = RegExp(/^010[0-9]{8}$/);
	
	if($("#userJoinPhoneNumber").val() == "")
	{
		$("#userJoinPhoneNumberCheck").show();
	}
	else if(userPhoneNumberCheck.test($("#userJoinPhoneNumber").val())) // 정규식 표현과 일치한다면
	{
		$("#userJoinPhoneNumberCheck").hide();
		userJoinData.userPhoneNumber = $("#userJoinPhoneNumber").val();
		console.log(userJoinData);
	}
	else
	{
		$("#userJoinPhoneNumberCheck").checkText("#userJoinPhoneNumberCheck", "휴대전화번호가 정확한지 확인해 주세요.", "red");
	}
});


$("#userJoinEmail").on("blur", function() {
	if($("#userJoinEmail").val() == "")
	{
		$("#userJoinEmailCheck").show();
	}
});

$("#userJoinEmail").on("propertychange change paste input", function() {
	var userEmailCheck = RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
	
	if(userEmailCheck.test($("#userJoinEmail").val())) // 정규식 표현과 일치한다면
	{
		$("#userJoinEmailCheck").hide();
		$("#emailCertificationBtn").attr("disabled", false);
		userJoinData.email = $("#userJoinEmail").val();
		console.log(userJoinData);
	}
	else
	{
		if($("#emailCertificationBtn").attr("disabled") != "disabled") // 인증 버튼이 활성화 상태라면
		{
			$("#emailCertificationBtn").attr("disabled", true); // 인증 버튼 비활성화
			$(".emailCode").css("display", "none"); // 이메일 코드 블록 안보이게 하기
			$("#emailCode").val(""); // 이메일 코드 인풋 값 초기화
			$("#emailCodeCheck").hide(); // 이메일 코드 에러문 안보이게 하기
		}
		
		$("#userJoinEmailCheck").checkText("#userJoinEmailCheck", "이메일이 정확한지 확인해 주세요.", "red");
	}
});

$("#FPW_email_input").on("propertychange change paste input", function() {
	var userEmailCheck = RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
	
	if(userEmailCheck.test($("#FPW_email_input").val())) // 정규식 표현과 일치한다면
	{
		$("#FPW_emailCheck").hide();
		$("#FPW_email_CertificationBtn").attr("disabled", false);
	}
	else
	{
		if($("#FPW_email_CertificationBtn").attr("disabled") != "disabled") // 인증 버튼이 활성화 상태라면
		{
			$("#FPW_email_CertificationBtn").attr("disabled", true); // 인증 버튼 비활성화
			$(".findemailCode").css("display", "none"); // 이메일 코드 블록 안보이게 하기
			$("#FPW_emailCode_input").val(""); // 이메일 코드 인풋 값 초기화
			$("#FPW_emailCodeCheck").hide(); // 이메일 코드 에러문 안보이게 하기
		}
		
		$("#FPW_emailCheck").checkText("#FPW_emailCheck", "이메일이 정확한지 확인해 주세요.", "red");
	}
});
};