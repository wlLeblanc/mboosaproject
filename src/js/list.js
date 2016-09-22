$(function(){
	var box=$('.list_show');
	var pageNum = 1;
	$.ajaxSetup({
		type:"get",
		url:"../data/list.json",
		data:{pageNo:pageNum},
		async:true,
		success:function(res){
			console.log(res);
			var ul = $('<ul/>');
			$.each(res, function(idx,obj) {    
				var li=$('<li/>');
				var $dl=$('<dl/>');
				var $dt=$('<dt/>');
				var $dd=$('<dd/>')
				var $img=$('<img/>');
				var $img1=$('<img/>');
				$dl.appendTo(li)
				$dt.appendTo($dl)
				$dd.appendTo($dl)
				$img.attr('src',obj.img).addClass('hov')
				$img1.attr('src',obj.imgx)
				$img1.appendTo($dd)
				$('<p/>').html(obj.price).addClass('nav').appendTo($dd)
				$('<p/>').html(obj.title).appendTo($dd)
				
				$img.appendTo($dt)
				li.appendTo(ul);
				li.hover(function(){
					$(this).addClass('wom').siblings().removeClass('wom');
				});

			});
			ul.appendTo(box);
		}
		
	});
	$.ajax();
	$(window).on('scroll',function(){
	var scrollTop = $(window).scrollTop();

	// 懒加载：滚动《快到底部》的时候再加载
	if(scrollTop >= $(document).height() - $(window).height() - 100){
		pageNum++;
		if(pageNum>=4){
			pageNum = 1;
		}

		$.ajax({
			data:{pageNo:pageNum}
		});
	}
	});
	//品牌点击部分
	$('.brand_bg').on('mouseover',function(){
		var idx=$(this).index();
		$('.sub_name').eq(idx).hide().siblings().show();
	})
	$('.brand_bg').on('mouseout',function(){
		var idx=$(this).index();
		$('.sub_name').eq(idx).show();
	})
})