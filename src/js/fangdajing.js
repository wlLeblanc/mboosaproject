$(function(){
	$.fn.magnifying = function(){
		var self = $(this),
		 $imgCon = self.find('.con-fangDaIMg'),//正常图片容器
		 	$Img = $imgCon.find('img'),//正常图片，还有放大图片集合
		   $Drag = self.find('.magnifyingBegin'),//拖动滑动容器
		   $show = self.find('.magnifyingShow'),//放大镜显示区域
		$showIMg = $show.find('img'),//放大镜图片
		$ImgList = self.find('.con-FangDa-ImgList > li >img'),
		multiple = $show.width()/$Drag.width();

		$imgCon.mousemove(function(e){
			$Drag.css('display','block');
			$show.css('display','block');
		    //获取坐标的方法
		   
		   	var iX = e.pageX - $(this).offset().left - $Drag.width()/2,
		   		iY = e.pageY - $(this).offset().top - $Drag.height()/2,	
		   		MaxX = $imgCon.width()-$Drag.width(),
		   		MaxY = $imgCon.height()-$Drag.height();
				
  	   	    //判断最大最小值
		   	iX = iX > 0 ? iX : 0;
		   	iX = iX < MaxX ? iX : MaxX;
		   	iY = iY > 0 ? iY : 0;
		   	iY = iY < MaxY ? iY : MaxY;	
		   	$Drag.css({left:iX+'px',top:iY+'px'});	   		
		   	$showIMg.css({marginLeft:-multiple*iX+'px',marginTop:-multiple*iY+'px'});
		 
		});
		$imgCon.mouseout(function(){
		   	$Drag.css('display','none');
			$show.css('display','none');
		});

		$ImgList.click(function(){
			var NowSrc = $(this).data('bigimg');
			$Img.attr('src',NowSrc);
			$(this).parent().addClass('active').siblings().removeClass('active');
		});	
	}

	$("#fangdajing").magnifying();


	/*tab切换*/

 
    // 筛选eq()
    // 隐藏所有的.content

    // 1)隐藏除第一个以外的所有.content
    $('.content').hide().eq(0).show();

    // 2)高亮显示第一个tab标签
    $('.goodsimp span').eq(0).addClass('active');

    // 3）点击标签，切换相应的内容
    $('.goodsimp span').click(function(){
  
                // 获取当前li所在的索引值
        var idx = $(this).index();
        $('.content').hide().eq(idx).show();

        $('.goodsimp span').removeClass('active').eq(idx).addClass('active');
    });

});


     