	$(function(){
				
				var $nav = $('#nav');
				var $stairs = $('.ms_list');

				// 2）滚动
				$(window).on('scroll',function(){
					// 获取滚动过的距离
					var scrollTop = $(window).scrollTop();

					// 1>滚动距离大于600，显示楼层导航，小于600时隐藏
					if(scrollTop >800){
						$nav.fadeIn();
					}else{
						$nav.fadeOut();
					}

					// 2>滚动到某一楼层时，高亮显示导航对应楼梯
					$stairs.each(function(idx,ele){
						// 当滚动过的距离大于等于当前ele的offsetTop,说明我已经滚动到这个楼层
						/*if(scrollTop >= $(ele).offset().top - $(ele).outerHeight()/3 && scrollTop < $(ele).offset().top + $(ele).outerHeight()/2){
							$nav.find('li').eq(idx).addClass('hover').siblings('li').removeClass('hover');
						}*/
						if($(ele).offset().top - scrollTop < $(window).height()/2){
							$nav.find('li').eq(idx).addClass('hover').siblings('li').removeClass('hover');
							// return false;
						}
						
					})
				});

				// 3）点击楼层导航，跳转到相应楼层
				$nav.on('click','li',function(){
					if($(this).hasClass('last')){
						scrollTop = 0;
					}else{
						var index = $(this).index();
						//保证在正中央:scrollTop = floor.offsetTop - (window.height-floor.height)/2
						var scrollTop = $stairs.eq(index).offset().top - ($(window).height()-$stairs.eq(index).outerHeight())/2;
					}
					$('html,body').animate({scrollTop:scrollTop});
				});
				//头部扫码部分
				$(".wli").on('mouseover',function () {
	                  $('.weix').show();
	                });
	                  $(".wli").on('mouseout',function () {
	                  $('.weix').hide();
	                });
	                  $(".weibo").on('mouseover',function () {
	                  $('.weibo_img').show();
	                });
	                  $(".weibo").on('mouseout',function () {
	                  $('.weibo_img').hide();
	                });
	                  $(".shouji").on('mouseover',function () {
	                  $('.shouji_img').show();
	                });
	                  $(".shouji").on('mouseout',function () {
	                  $('.shouji_img').hide();
                });
                //轮播图部分
                var $li=$('.list li')
				
				var a=0;
				function  imgChange(){
					 
					//
					$('.banner-img img').eq(a).stop(true).show().siblings().hide();
					$li.eq(a).addClass('hov').siblings().removeClass('hov');
					
				}
				$li.on('click',function(e){
					
					a =$(this).index();
					imgChange();
					e.stopPropagation(); 
					clearInterval(timer);
				});
			
				function auto(){
					timer =	setInterval(function(){
						(a<6)?a++:a=0;
						imgChange();	
					},3000)
				};
				auto();
				
				$('.banner-img').on('mouseover',function(){
					clearInterval(timer);
					
				});
			
				$('.banner-img').on('mouseout',function(){
					auto();
				});
				//第二个轮播图
				var $imgli=$('.img2list li')
				
				var i=0;
				function  Change(){
					 
					
					$('.bannerimg2 img').eq(i).stop(true).show().siblings().hide();
					$imgli.eq(i).addClass('hov').siblings().removeClass('hov');
					$('.tab-titile li').eq(i).addClass('tabc').siblings().removeClass('tabc');
					
				}
				$imgli.on('click',function(e){
					
					i =$(this).index();
					 Change();
					e.stopPropagation(); 
					clearInterval(t);
				});
			
				function lun(){
					t =	setInterval(function(){
						(i<5)? i++ : i=0;
						Change();	
					},3000)
				};
				lun();
				
				$('.bannerimg2').on('mouseover',function(){
					clearInterval(t);
					
				});
			
				$('.bannerimg2').on('mouseout',function(){
					lun();
				});
				$('.next').on('click',function(){
					(i<6)?i++:(i=0);
					 Change();
				})
				$('.prev').on('click',function(){
					(i>0)?i--:(i=6);
					 Change();
				})
				//第三部分
				var j=0;
				function  qiehuan(){
					$('.ms_new_img img').eq(j).stop(true).show().siblings().hide();
			
				}
				$('.ms_next').on('click',function(){
					console.log('hhh');
					(j<6)?j++:(j=0);
					 qiehuan();
				})
				$('.ms_prev').on('click',function(){
					(j>0)?j--:(j=6);
					 qiehuan();
				})
				
				//优品切换部分
				$('.c-nav span');
	
	            // 3）点击标签，切换相应的内容
	            $('.c-nav span').on('mouseenter',function(){
	                //获取当前移入的box索引值
	                var idx = $(this).index();
	                //显示相应的图片 
	                $('.content').hide().eq(idx).show();
					//将对应的背景切换
	                $('.c-nav span').eq(idx).css('background','url(img/c-navh0'+idx+'.jpg)');
	                
	            });
					//鼠标移开时背景变为初始的样子
				  $('.c-nav span').on('mouseleave',function(){
	            
	                $('.c_li1').css('background','url(img/c-navy00.jpg)');
	                $('.c_li2').css('background','url(img/c-navy01.jpg)');
	                 $('.c_li3').css('background','url(img/c-navy02.jpg)');
	                $('.c_li4').css('background','url(img/c-navy03.jpg)');
	                
	            });
	               //微信
	             $(".sidebar_collect").on('mouseenter',function(){
	            	$('.shouchang').fadeIn();
	            });
				$(".sidebar_collect").on('mouseleave',function(){
	            	$('.shouchang').hide();
	            });
				$('.shouchang').on('mouseenter',function(){
					$(this).show();
				});
				$('.shouchang').on('mouseleave',function(){
					$(this).hide();
				});
	              //购物车
	              
	             $(".sidebar_car").on('mouseenter',function(){
	            	$('.cart_case').fadeIn();
	            });
				$(".sidebar_car").on('mouseleave',function(){
	            	$('.cart_case').hide();
	            });
				$('.cart_case').on('mouseenter',function(){
					$(this).show();
				});
				$('.cart_case').on('mouseleave',function(){
					$(this).hide();
				});
	             //手机app
	             $(".sidebarph").on('mouseenter',function(){
	            	$('.sahh').fadeIn();
	            	console.log('fff')
	            });
				$(".sidebarph").on('mouseleave',function(){
	            	$('.sahh').hide();
	            });
				$('.sahh').on('mouseenter',function(){
					$(this).show();
				});
				$('.sahh').on('mouseleave',function(){
					$(this).hide();
				});
	            //微信
	             $(".sidebar_w").on('mouseenter',function(){
	            	$('.weixing').fadeIn();
	            });
				$(".sidebar_w").on('mouseleave',function(){
	            	$('.weixing').hide();
	            });
				$('.weixing').on('mouseenter',function(){
					$(this).show();
				});
				$('.weixing').on('mouseleave',function(){
					$(this).hide();
				});
	            //联系客服
	             $(".sidebar_ej").on('mouseenter',function(){
	            	$('.kefu').fadeIn();
	            });
				$(".sidebar_ej").on('mouseleave',function(){
	            	$('.kefu').hide();
	            });
				$('.kefu').on('mouseenter',function(){
					$(this).show();
				});
				$('.kefu').on('mouseleave',function(){
					$(this).hide();
				});
	            //回到顶部
	            $(".sidebar_di").on('click',function(){
	            	$('html,body').animate({scrollTop:'0'});
	            })
	            $(".sidebar_di").on('mouseenter',function(){
	            	$('.htop').fadeIn();
	            });
				$(".sidebar_di").on('mouseleave',function(){
	            	$('.htop').hide();
	            });
				$('.htop').on('mouseenter',function(){
					$('.htop').show();
				});
				$('.htop').on('mouseleave',function(){
					$('.htop').hide();
				});
				
	});