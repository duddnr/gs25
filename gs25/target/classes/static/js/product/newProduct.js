$(document).on("click", "#product-save",function() {
	let data = {
		productType : $(".form-select option:selected").text(),
		productName : $("#productName").val(),
		productPrice : $("#productPrice").val()
	};
	var formData = new FormData(); // (key, value)
	
	formData.append("product", new Blob([JSON.stringify(data)], {type: "application/json"})); // 데이터 타입을 JSON으로 변경
	formData.append("productImage",$("#productImage")[0].files[0]); // 등록한 파일을 가져옴
/*	
	for (let key of formData.keys()) {
		console.log(key);
	}
	
	for (let value of formData.values()) {
  		console.log(value);
	}
*/

	$.ajax(
	{
		type: "POST",
		url: "/product/new",
		data: formData,
		contentType: false,
		processData: false,
		headers: { Authorization : "Bearer " + accessToken}
	})
	.done(function (str) {
		alert(str);
		location.reload();
	})
	.fail(function () {
	})
});

$("#productPrice").keyup(function()
{
	$(this).val($(this).val().replace(/[^0-9]/g, ""));
});