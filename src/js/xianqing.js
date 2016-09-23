onload = function() {
	var str = getCookie("arr");
	var arr = [];
	if (str != "")
	{
	
		arr=JSON.parse(str);
	}
	//var arr = [];
	// 商品由 名称 和 价格组成
	// 例如：
	// {product: XXX, price: 180}
	var allA = document.getElementById("payment_car");

		allA.onclick = function() {
			// 这个是价格
			var oPrice = document.getElementById("price")

			// 这个商品的信息
			var oProduct =document.getElementById("product")
			var oNum=document.getElementById("numb")
			var oImg=document.getElementById("oimg")
			var oCm=document.getElementById("cm")
			
			
			// 取出商品名字的标签对象
			
			
			// 取出标签对象中的名字，也就是商品的名称

			// 函数库中自定义的函数
			// 添加了一个 cookie,名字是 product, 内容是 商品的信息, 过期时间是 7天后
			//alert(oSpan.innerHTML);
			
			// 转换成一个
			// var str = encodeURI(oSpan.innerHTML);
			
			var obj = {};
			obj.img=oImg.src;
			//console.log(oImg.src);
			obj.num=oNum.value;
			obj.product = oProduct.innerHTML;
			obj.price = oPrice.innerHTML;

			// 将创建好的商品添加到数组中
			arr.push(obj);

			// 将数组的内容设置到 cookie 中呢？
			// cookie 的名字是 arr, 内容是数组中的商品，过期时间是7天以后
			addCookie("arr", JSON.stringify(arr), 7);



			/*
			addCookie("product", oSpan.innerHTML, 7);
			
			// 函数库中自定义的函数
			// 添加了一个 cookie,名字是 price, 内容是 商品的价格, 过期时间是 7天后 
			addCookie("price", oPrice.innerHTML, 7);
			//*/
			

			alert("添加成功");
		
		}

}
