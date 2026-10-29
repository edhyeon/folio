var sectionInfo = []; // 각 섹션 정보 저장

$(document).ready(function(){
	isMobileDeviceAddClass();

	$("[data-section]").each(function(){
		var name = $(this).data("section");
		var top = $(this).offset().top;
		sectionInfo.push({key:name, value:top});
	});

	setInterval(function(){
		$(".profile h1 a").toggleClass("anm_wave");
	}, 1800);
});

$(window).scroll(function(){
	if($(window).scrollTop() >0){
		$(".go_top").addClass("on");
	} else {
		$(".go_top").removeClass("on");
	}
	setTimeout(function(){
		checkSectionPosition2();
	}, 0);
});

// 모바일 데스크탑 구분
function isMobileDeviceAddClass(){
	var ua = navigator.userAgent;
	if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
		$("body").addClass("mobile");
		return true;
	}else if(/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
		$("body").addClass("mobile");
		return true;
	}else{
		//alert("desktop");
		$("body").addClass("desktop");
		return false;
	}
}

function scrollTo(name){
	/* 해당 메뉴로 스크롤 */
	var target = $("[data-section='"+name+"']").offset().top;
	$(".nav a").removeClass("on");
	$(".nav a[data-nav='"+name+"']").addClass("on");
	if(name == 'header'){
		target = 0;
	}
	$("html, body").animate({
		scrollTop : target - 50
	}, 500);
}

function checkSectionPosition(){
	/* data-section 위치에 도달하면 data-nav 에 on 클래스 */
	var scroll = $(window).scrollTop();
	var navIndicator = $(".nav .indicator");
	var navIndicatorPosition = 0;

	if( scroll > sectionInfo[1].value - 100){ // WORK
		$(".nav a").removeClass("on");
		$("[data-nav='"+sectionInfo[1].key+"']").addClass("on");

		 if( scroll > sectionInfo[2].value - 100){ // PLAY
			$(".nav a").removeClass("on");
			$("[data-nav='"+sectionInfo[2].key+"']").addClass("on");

			if( scroll > sectionInfo[3].value - 100){ // STUDY
				$(".nav a").removeClass("on");
				$("[data-nav='"+sectionInfo[3].key+"']").addClass("on");
			}
		} 
	} else {
		$(".nav a").removeClass("on");
		$("[data-nav='"+sectionInfo[0].key+"']").addClass("on");
	}

	navIndicatorPosition = $(".nav a.on").position().left;
	navIndicator.css("left", navIndicatorPosition);
}

function checkSectionPosition2(){
	/* data-section 위치에 도달하면 data-nav 에 on 클래스 */
	var scroll = $(window).scrollTop();
	var navIndicator = $(".nav .indicator");
	var navIndicatorPosition = 0;
	var sectionPosition = $(window).height() * 0.3;

	if( scroll > sectionInfo[1].value - sectionPosition){ // WORK

		navIndicatorPosition = $("[data-nav='"+sectionInfo[1].key+"']").position().left;

		 if( scroll > sectionInfo[2].value - sectionPosition){ // PLAY
			navIndicatorPosition = $("[data-nav='"+sectionInfo[2].key+"']").position().left;

			if( scroll > sectionInfo[3].value - sectionPosition){ // STUDY
				navIndicatorPosition = $("[data-nav='"+sectionInfo[3].key+"']").position().left;
			}
		} 
	} else { // Hello!
		navIndicatorPosition = $("[data-nav='"+sectionInfo[0].key+"']").position().left;
	}

	if(navIndicatorPosition > 0){
		navIndicator.addClass("not_first");
	} else {
		navIndicator.removeClass("not_first");
	}

	console.log(navIndicatorPosition);

	navIndicator.css("left", navIndicatorPosition);

}

function profileToggle(){
	var myProfile = $(".profile");
	if( myProfile.hasClass("on") ){
		$(".profile_detail", myProfile).fadeOut();
		myProfile.removeClass("on");
		$(".profile_more").attr("title", "더 알아보기");
	} else {
		myProfile.addClass("on");
		$(".profile_detail", myProfile).delay(300).fadeIn();
		$(".profile_more").attr("title", "프로필 닫기");
	}
}

function slickSlide(type){
	if(type == 'main'){
		$(".slider_01").slick({
			//dots: true,
			infinite: true,
			slidesToShow:2,
			slidesToScroll: 1,
		});
	}
}

function setCookie( name, value, expiredays ) { 
	var todayDate = new Date(); 
	todayDate.setDate( todayDate.getDate() + expiredays ); 
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";" 
} 

function getCookie( name ) { 
	var nameOfCookie = name + "="; 
	var x = 0; 
	while ( x <= document.cookie.length ) { 
		var y = (x+nameOfCookie.length); 

		if ( document.cookie.substring( x, y ) == nameOfCookie ) { 

			if ((endOfCookie=document.cookie.indexOf( ";", y )) == -1 ) 
				endOfCookie = document.cookie.length; 
			return unescape( document.cookie.substring( y, endOfCookie ) ); 
		} 

		x = document.cookie.indexOf( " ", x ) + 1; 

		if ( x == 0 ) 
			break; 
	} 
	return ""; 
}




/* 미사용 */

function toggleNav(){
	if( $("#header").hasClass("nav_on") ){
		$(".header").removeClass("nav_on");
		//$("html, body").css("overflow", "visible");
	} else {
		$(".header").addClass("nav_on");
		//$("html, body").css("overflow", "hidden");
	}
}
