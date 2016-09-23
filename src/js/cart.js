
// 将字符串重新执行，那么可以得到原来的数组
//   因为可能存在安全问题
//var arr = eval(str);

// alert(arr.length)

onload = function() {
	var oUl = document.getElementById("plist");

	var str = getCookie("arr");
	var arr = eval(str);

	for (var i = 0; i < arr.length; i++)
	{
		// 创建一个商品
		var oLi = document.createElement("li");
		//详细信息
		var oSpan=document.createElement('span');
		//合计金额
		var oHj=document.createElement('em');
		//数量
		var oi=document.createElement('i');
		//创建移除按钮
		var oA=document.createElement('a');
		//图片
		var oImg=document.createElement('img');
		var oDiv=document.createElement('h6');

		// 取出数组中元素，arr[i] 是一个对象,
		//    再取出这个对象中的产品名 和 价格
		oA.innerHTML="移除"
		oImg.src=arr[i].img
		oi.innerHTML=arr[i].num;
		oSpan.innerHTML=arr[i].price;
		oDiv.innerHTML = arr[i].product;
		oHj.innerHTML="￥"+(arr[i].num)*(arr[i].price)
		//oLi.className("hov");
		oLi.appendChild(oImg);
		oLi.appendChild(oDiv);
		oLi.appendChild(oSpan);
		oLi.appendChild(oi);
		oLi.appendChild(oHj);
		oLi.appendChild(oA);
		
		oUl.appendChild(oLi);
		
	}
	
	$('a').on('click',function(){
		$(this).parent().remove();
	})
	$('li').each(function(idx ,item){
		
		var $i=parseInt($(this).find('i').html())
		    $i += $i;
		$('.pics').html($i)
		
	})
}