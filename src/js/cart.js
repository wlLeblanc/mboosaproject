
// 将字符串重新执行，那么可以得到原来的数组
//   因为可能存在安全问题
//var arr = eval(str);

// alert(arr.length)

$(function(){
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
		
		var oInput=document.createElement('input');
		//创建移除按钮
		var oA=document.createElement('a');
		//图片
		var oImg=document.createElement('img');
		var oDiv=document.createElement('h6');
		var oCbox=document.createElement('input');
		var btn1=document.createElement('input');
		var oBtn=document.createElement('input');
		oLi.appendChild(oInput);
		btn1.type='button'//减
		oBtn.type='button';//加
		oBtn.name='btn'
		btn1.name='btn1'
		oInput.type="text";
		oCbox.type="checkbox";
		// 取出数组中元素，arr[i] 是一个对象,
		//    再取出这个对象中的产品名 和 价格
		oA.innerHTML="移除"
		oImg.src=arr[i].img
		oInput.value=arr[i].num;
		oSpan.innerHTML=arr[i].price;
		oDiv.innerHTML = arr[i].product;
		oHj.innerHTML=(arr[i].num)*(arr[i].price);
		oBtn.value="+";
		btn1.value="-"
		
		oLi.appendChild(oCbox);
		oLi.appendChild(oImg);
		oLi.appendChild(oDiv);
		oLi.appendChild(oSpan);
		oLi.appendChild(btn1);
		oLi.appendChild(oInput);
		oLi.appendChild(oBtn);
		oLi.appendChild(oHj);
		oLi.appendChild(oA);
		oUl.appendChild(oLi);
		//移除商品	
		
		
			
	}
	//点击减少数量
		$('li input[name=btn1]').on('click',function(){
			var $num=$(this).parent('li').find('input[type=text]')
			var ss=$num.val();
			
		    ss--;
		    if(ss==0){
		    	ss=1;
		    }
		    $num.val(ss)
		    var $zj=$(this).parent('li').find('em');
		    var $jiage=$(this).parent('li').find('span');
		    
		    var zj=$jiage.html()*ss
			$zj.html(zj)
		});
		//点击加数量
		$('li input[name=btn]').on('click',function(){
			var $num=$(this).parent('li').find('input[type=text]')
			var jj=$num.val();
			
			    jj++;
			  
			$num.val(jj)
			var $zj=$(this).parent('li').find('em');
		    var $jiage=$(this).parent('li').find('span');  
		    var zj=$jiage.html()*jj
			    $zj.html(zj)
			    
		})
		//总价计算
		$('li input[type=checkbox]').on('click',function(){
			console.log('ll')
			if ($(this).prop('checked',true)) {
				var $zongji=$(this).parent('li').find('em')
				
				 $('.comjia').html($zongji.html());
				} 
			else{
				
			}
		})
		
		$('a').on('click',function(){
			$(this).parent().remove();
			$.cookie('arr',null)
		})
	
	
})
