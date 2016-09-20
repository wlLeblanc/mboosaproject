
(function(d){
	d.fn.change2=function(e){
		function n(h,c){f.eq(h).stop(!0,!0).animate({left:a.left,top:-a.top,opacity:"hide"},a.time1,function(){f.eq(b).css("left",-a.left).css("top",-a.top).stop(!0,!0).animate({left:0,top:0,opacity:"show"},a.time2)});a.nav&&k(b)}function p(h,c){f.eq(h).stop(!0,!0).animate({left:-a.left,top:-a.top,opacity:"hide"},a.time1,function(){f.eq(b).css("left",a.left).css("top",-a.top).stop(!0,!0).animate({left:0,top:0,opacity:"show"},a.time2)});a.nav&&k(b)}function k(b){c.find(".c-nav div span").removeClass("on");c.find(".c-nav div span").eq(b).addClass("on")}function q(){var a=b;b--;b=0>b?g-1:b;n(a,b)}function l(){var a=b;b++;b=b>=g?0:b;p(a,b)}if(!(1>this.length)){var a={left:20,top:0,autoPlay:!1,time:3E3,time1:200,time2:300,nav:!1,triggle:"mouseover"};e&&d.extend(a,e);var c=d(this),f=c.find(".c-li li"),g=f.length,b=0;if(!(1>=g)){if(a.nav){c.append('\x3cdiv class\x3d"c-nav"\x3e\x3cdiv\x3e\x3c/div\x3e\x3c/div\x3e');for(e=0;e<g;e++)c.find(".c-nav div").append("\x3cspan\x3e\x3c/span\x3e");k(b);c.find(".c-nav div span").on(a.triggle,function(){if(!d(this).hasClass("on")){var a=b;b=d(this).index();a>b?n(a,b):p(a,b)}})}c.find(".next").click(l);c.find(".prev").click(q);if(a.autoPlay){var m=setInterval(l,a.time);c.hover(function(){clearInterval(m)},function(){clearInterval(m);m=setInterval(l,a.time)})}}}}})(jQuery);

$(function(){
	$('.ms_new_con2').change2({autoPlay:true,nav:true,time:3000,time1:0,time2:100});
})
