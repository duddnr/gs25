$(document).ready(function(){
	/*
	var entries = performance.getEntriesByType("navigation")[0];
	if(entries.type == "reload")
	{
		console.log("새로고침");
		location.href = "/productListRedirect";
	}
	*/
});


$(document).on("click", "#order",function() {
	var orderDtoList = new Array();
	
	$("div[name=productId]").each(function(index){
		var orderDto =
		{
			productName : $("span[name=productName]").eq(index).attr("value"),
			orderPrice : $("span[name=orderPrice]").eq(index).attr("value"),
			count : $("span[name=productCount]").eq(index).attr("value")
		};
		orderDtoList.push(orderDto);
	});
	
	if(orderDtoList.length == 0)
	{
		alert("장바구니에 상품이 없습니다.");
	}
	else
	{
			if(!$("input[name=payment]").is(":checked")) // 결제 형태를 선택 안했을 때
			{
				alert("결제 수단을 선택해 주세요");
			}
			else if(!$("input[name=cash]").is(":checked") && !$("div[name=paymentCash]").is(":hidden")) // 현금 결제 금액을 선택 안했을 때
			{
				alert("금액을 선택해 주세요");
			}
			else if($("input[name=cash]:checked").val() == "on" && $("input[name=directInput]").val() == "") // 현금 결제 금액을 직접입력 선택 후 입력을 안했을 때
			{
				alert("금액을 입력해 주세요");
			}
			else
			{
					var paymentType = $("input[name=payment]:checked").val();
					var cash = 0;
					if(!$("input[name=directInput]").val() == "") // 직접 입력 칸에 금액이 적혀있을 경우
					{
						cash = $("input[name=directInput]").val();
					}
					else if(paymentType == "카드") // 카드를 선택한 경우
					{
						cash = 0;
					}
					else if($("input[name=cash]:checked").val() == "spotOnAmount") // 금액에 맞게 선택한 경우
					{
						cash = $("#resultPrice").text().replace("$ ", "");
					}
					else
					{
						cash = $("input[name=cash]:checked").val();
					}
					
					console.log(JSON.stringify(orderDtoList));
					
					$.ajax(
					{
						type: "POST",
						url: "/order/new?paymentType=" + paymentType + "&cash=" + cash,
						data: JSON.stringify(orderDtoList),
						contentType: "application/json; charset=utf-8",
						headers: { Authorization : "Bearer " + accessToken},
					})
					.done(function (result) {
						alert(result);
						$.removeCookie("cart", { path: "/" });
						window.location.reload();
					})
					.fail(function () {
						alert("주문한 금액보다 적습니다.");
					})
			}
	}
});


$(document).on("click", "button[name=add]",function() {
	var index = $("button[name=add]").index(this);
	var productId = $("button[name=add]").eq(index).attr("value");
	
	$.ajax(
	{
		type: "GET",
		url: "/cartProductAmount?productId=" + productId + "&plusAtminus=true",
		headers: { Authorization : "Bearer " + accessToken}
	})
	.done(function() {
		$.ajax({
			type: "GET",
			url: window.location.pathname.replace("/pc_cafe", ""),
			headers: { Authorization : "Bearer " + accessToken},
			dataType: "html"
		})
		.done(function(data){
			var e = $(data).find(".orderDtoList");
			var r = $(data).find("#resultPrice");
			$(".orderDtoList").html(e);
			$("#resultPrice").html(r);
		})
		.fail(function () {
		})
	})
	.fail(function () {
	})
});


$(document).on("click", "input[name=minus]",function() {
	var index = $("input[name=minus]").index(this);
	var productId = $("div[name=productId]").eq(index).attr("value");
	
	$.ajax(
	{
		type: "GET",
		url: "/cartProductAmount?productId=" + productId + "&plusAtminus=false",
		headers: { Authorization : "Bearer " + accessToken}
	})
	.done(function() {
		$.ajax({
			type: "GET",
			url: window.location.pathname.replace("/pc_cafe", ""),
			headers: { Authorization : "Bearer " + accessToken},
			dataType: "html"
		})
		.done(function(data){
			var e = $(data).find(".orderDtoList");
			var r = $(data).find("#resultPrice");
			$(".orderDtoList").html(e);
			$("#resultPrice").html(r);
		})
		.fail(function () {
		})
	})
	.fail(function () {
	})
});



$(document).on("click", "input[name=plus]",function() {
	var index = $("input[name=plus]").index(this);
	var productId = $("div[name=productId]").eq(index).attr("value");
	
	$.ajax(
	{
		type: "GET",
		url: "/cartProductAmount?productId=" + productId + "&plusAtminus=true",
		headers: { Authorization : "Bearer " + accessToken}
	})
	.done(function() {
		$.ajax({
			type: "GET",
			url: window.location.pathname.replace("/pc_cafe", ""),
			headers: { Authorization : "Bearer " + accessToken},
			dataType: "html"
		})
		.done(function(data){
			var e = $(data).find(".orderDtoList");
			var r = $(data).find("#resultPrice");
			$(".orderDtoList").html(e);
			$("#resultPrice").html(r);
		})
		.fail(function () {
		})
	})
	.fail(function () {
	})
});



$(document).on("click", "input[name=delete]",function() {
	var index = $("input[name=delete]").index(this);
	var productId = $("div[name=productId]").eq(index).attr("value");
	
	$.ajax(
	{
		type: "GET",
		url: "/cartProductAmount?productId=" + productId,
		headers: { Authorization : "Bearer " + accessToken}
	})
	.done(function() {
		$.ajax({
			type: "GET",
			url: window.location.pathname.replace("/pc_cafe", ""),
			headers: { Authorization : "Bearer " + accessToken},
			dataType: "html"
		})
		.done(function(data){
			var e = $(data).find(".orderDtoList");
			var r = $(data).find("#resultPrice");
			$(".orderDtoList").html(e);
			$("#resultPrice").html(r);
		})
		.fail(function () {
		})
	})
	.fail(function () {
	})
});

$(document).on("click", "#searchBtn",function() {
	var search = $("#search").val().replace(/\s+$/, "");;
	
	$.ajax({
		type: "GET",
		url: "/productList?search=" + search,
		headers: { Authorization: "Bearer " + accessToken },
		dataType: "html"
	})
	.done(function(data) {
		if($(data).find(".item").length == 0)
		{
			alert("검색하신 상품이 없습니다.");
		}
		else
		{
			var e = $(data).find(".wrapper");
			$(".wrapper").html(e);
		}
	})
	.fail(function() {
		console.log("fail");
	})
});

$("#search").on("input", function() // 실시간으로 검색하는 값의 앞부분 공백 제한
{
	if($(this).val().startsWith(" "))
	{
		$(this).val($(this).val().trimStart());
	}
})

$("input[name=payment]").on("change", function() {
	// 라디오 버튼 변경 클릭 시 이벤트 삽입
    if($(this).val() == "현금") // 현금을 선택했을 시
    {
		$("div[name=paymentCash]").css("display", "block"); // 현금 radio버튼 자리를 보이게함
		$("div[name=paymentCard]").css("display", "none"); // 카드 선택 텍스트 출력자리는 안보이게함
	}
	else if($(this).val() == "카드") // 카드를 선택했을 시
	{
		$("div[name=paymentCash]").css("display", "none"); // 현금 radio버튼의 자리를 안보이게함
		$("div[name=paymentCard]").css("display", "block"); // 카드 선택 텍스트 출력자리를 보이게함
	}
});

$("input[name=cash]").change(function() {
	if($("input[name=cash]:checked").val() == "input") // 직접 입력하는 radio버튼을 클릭한 경우
	{
		$("input[name=directInput]").attr("disabled", false); // disabled를 활성화
	}
	else if(!$("input[name=directInput]").attr("disabled")) // disabled가 활성화 상태인 경우
	{
		$("input[name=directInput]").attr("disabled", true); // disabled를 비활성화
	}
});