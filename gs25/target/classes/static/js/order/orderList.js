$(document).ready(function(){
	$("#datepicker1").on("change",function(e){
		$( "#datepicker2" ).datepicker( "option", "minDate", getDate(e.target));
	});
});

function getDate( element ) {
    var date;
    var dateFormat = "yy-mm-dd";
    try {
      date = $.datepicker.parseDate( dateFormat, element.value );
    } catch( error ) {
      date = null;
    }
    return date;
}

$(function datepicker_start() {
	//input을 datepicker로 선언
	$("#datepicker1").datepicker({
		dateFormat: 'yy-mm-dd' //달력 날짜 형태
		, showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
		, showMonthAfterYear: true // 월- 년 순서가아닌 년도 - 월 순서
		, changeYear: true //option값 년 선택 가능
		, changeMonth: true //option값  월 선택 가능                
		, showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
		, buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
		, buttonImageOnly: true //버튼 이미지만 깔끔하게 보이게함
		, buttonText: "선택" //버튼 호버 텍스트              
		, yearSuffix: "년" //달력의 년도 부분 뒤 텍스트
		, monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'] //달력의 월 부분 텍스트
		, monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'] //달력의 월 부분 Tooltip
		, dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'] //달력의 요일 텍스트
		, dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'] //달력의 요일 Tooltip
		, minDate: "-1M" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
		, maxDate: "0D" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후) 
	});

	//초기값을 오늘 날짜로 설정해줘야 합니다.w
	$('#datepicker').datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)            
});

$(function datepicker_end() {
	//input을 datepicker로 선언
	$("#datepicker2").datepicker({
		dateFormat: 'yy-mm-dd' //달력 날짜 형태
		, showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
		, showMonthAfterYear: true // 월- 년 순서가아닌 년도 - 월 순서
		, changeYear: true //option값 년 선택 가능
		, changeMonth: true //option값  월 선택 가능                
		, showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
		, buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
		, buttonImageOnly: true //버튼 이미지만 깔끔하게 보이게함
		, buttonText: "선택" //버튼 호버 텍스트              
		, yearSuffix: "년" //달력의 년도 부분 뒤 텍스트
		, monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'] //달력의 월 부분 텍스트
		, monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'] //달력의 월 부분 Tooltip
		, dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'] //달력의 요일 텍스트
		, dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'] //달력의 요일 Tooltip
		, minDate: "-1M" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
		, maxDate: "0D" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)
	});

	//초기값을 오늘 날짜로 설정해줘야 합니다.w
	$('#datepicker').datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)            
});

$(document).on("click", "#order-tracking",function() {
	//console.log($("#datepicker1").val() + " : " + $("#datepicker2").val());
	if($("#datepicker1").val() == "")
	{
		alert("조회 시작 기간을 선택 하세요.");
	}
	else if($("#datepicker2").val() == "")
	{
		alert("조회 끝 기간을 선택 하세요.");
	}
	else
	{
		var start = $("#datepicker1").val();
		var end = $("#datepicker2").val();
		
		$.ajax(
			{
				type: "GET",
				url: "/order?start=" + start + "&end=" + end,
				headers: { Authorization : "Bearer " + accessToken},
				dataType: "html"
			})
			.done(function(data) {
				var e = $(data).find(".wrapper");
				$(".wrapper").html(e);
			})
			.fail(function() {
			})
	}
});

$(document).on("click", "button[name=paymentStatus]",function() {
	$(this).text("결제완료").attr("disabled", true);
	
	$.ajax(
		{
			type: "PUT",
			url: "/paymentStatusChange?paymentDataDtoid=" + $(this).attr("value"),
			headers: { Authorization: "Bearer " + accessToken }
		})
		.done(function(str) {
			alert(str);
		})
		.fail(function() {
		})
});