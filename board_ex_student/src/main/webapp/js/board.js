/**
 * 
 */
let tpNum = "";		//total page Number

/* 리스트 출력 - ajax */
listServer = function(page, kwd){
	$.ajax({
		url : '/List',
		type : 'post',
		data : {
			'page' : page,
			'keyword' : kwd
		},
		success : function(res){
			
			tpNum = res.tp;		//페이징 다음(Next)버튼 기능 조건으로 필요 
			
			//w3schools.com 부트스트랩3 collapse-Accordion 게시판 예제 활용
			code = '<div class="panel-group" id="accordion">';
			
			  if(res.datas.length > 0){
				
				$.each(res.datas, function(i,v){
		  	      code += ' <div class="panel panel-default">';
		  	      code += '   <div class="panel-heading">';
			  	  code += '    <h4 class="panel-title">';    
			  	  code += '      <a idx="' + v.num + '" class="list" data-toggle="collapse" data-parent="#accordion" href="#collapse' + v.num + '">';
			  	  code += 		v.subject + '</a>';      
			  	  code += '    </h4>';
			  	  code += '  </div>';

			  	  code += '  <div id="collapse' + v.num + '" class="panel-collapse collapse in">';

//			  	  code += '  <div id="collapse' + v.num + '" class="panel-collapse collapse">';
			  	  code += '    <div class="panel-body pbody">';
			  	  code += '		<div class="p1">작성자 : ' + v.writer + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
			  	  code += '									조회수 : ' + v.hit + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
			  	  code += '									날짜 : ' + v.wdate + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
			  	  code += '		</div>';
			  	  code += '		<div class="p2">';
			  	  code += '  			<input idx="' + v.num + '" type="button" name="modify" value="수정" class="action btn btn-warning btn-sm">';
			  	  code += '			<input idx="' + v.num + '" type="button" name="delete" value="삭제" class="action btn btn-danger btn-sm">';
			  	  code += '		</div>';
			  	  code += '		<div class="p3">' + v.cont + '</div>';
			  	  
			  	  //댓글구간s
			  	  code += '		<hr>';
			  	  code += '		<p class="p4">';
			  	  code += '		  <textarea cols="90"></textarea>';
			  	  code += '		  <input idx="' + v.num + '" type="button" value="등록" name="reply" class="action btn btn-primary">';
			  	  code += '		</p>';
			  	  //댓글구간e
			  	  
			  	  code += '    </div>';		//class=panel-body
		  	  	  code += '  </div>';		//class=panel-collapse
		  	  	  code += '</div>';		//class=panel-default
			  	});
			  }else{
				  code += '  <div class="panel panel-default">';
		  	      code += '    <div class="panel-heading">';
			  	  code += '      <h4 class="panel-title" style="text-align:center;">내역 없음';
			  	  code += '    </div>';
			  	  code += '  </div>';
			  	  code += '</div>';		//class=panel-default
			  }
		    code += '</div>';		//class=panel-group
		    
		    $('#list').html(code);
		    
		    
//페이지 리스트 - 부트스트랩3 Pagination 예제 활용
			
			//이전버튼, 다음버튼 : BS Pager 예제 활용
		    pager = '<div class="container">';
		    //이전버튼
		    if(res.sp >= 1){
		    	pager += '<ul class="pager">';
		    	pager += '<li><a class="prev" href="#">Prev</a></li></ul>';
		    }
		    //페이지 번호 출력
		    pager += '<ul class="pagination pager">';
		    //현재 설정된 페이지갯수:2
		    for(i=res.sp; i<=res.ep; i++){
		    	//현재 페이지와 i값이 같은가
		    	if(currentPage == i){ //currentPage-전역변수
		    		pager += '<li class="active"><a class="paging" href="#">' + i + '</a></li>';
		    	}else{
		    		pager += '<li><a class="paging" href="#">' + i + '</a></li>';
		    	}
		    }
		    pager += '</ul>';
		    //다음버튼
		    if(res.ep <= res.tp){
		    	pager += '<ul class="pager">';
		    	pager += '<li><a class="next" href="#">Next</a></li></ul>';
		    }
		    pager += '</div>';
		    $('#pagelist').html(pager);
		},
		error : function(xhr){
			alert(xhr.status);
		},
		dataType : 'json'
	});
};


/* -------------------------- 기능 이벤트 영역 --------------------------------- */

$(function(){
	
/* 제이쿼리 방식 - 페이지 번호 클릭 이벤트 */
	/*$('#pagelist').on('click', '.paging', function(){
 		//currentPage = $(this).text().trim();
		currentPage = $(this).text();
		listServer(currentPage);
	});*/	
	
/* 제이쿼리 방식 - 이전(Prev) 버튼 클릭 이벤트 */
	/*$('#pagelist').on('click','.prev', function(){
		let vprev = $('.paging').first().text();
		
		if(vprev == 1){
		  currentPage = vprev;
		}else{
		  currentPage = vprev - 1;
		}
		listServer(currentPage);
	});*/
	
/* 제이쿼리 방식 - 다음(Next) 버튼 클릭 이벤트 */
	/*$('#pagelist').on('click','.next', function(){
		let vnext = $('.paging').last().text();

		if(vnext == tpNum){
		  currentPage = vnext;	
		}else{
		  currentPage = parseInt(vnext) + 1;
		}
		listServer(currentPage);
	});*/
	
	
/* 자바스크립트 방식 - 이전/페이지번호/다음 버튼 클릭 이벤트 */

	document.querySelector('#pagelist').addEventListener('click',function(e){
		//event 키워드 사용시 발생된 이벤트를 자동으로 키워드에 할당해줌
		//하지만 이것은 IE용으로서 브라우저 표준이 아님 (=event is deprecated)
		//이벤트 리스너가 감지한 이벤트를 매개변수로 넘겨 받아 처리하는것이 best 
		
		var targetVal = e.target.childNodes[0].nodeValue;
		var prevVal = document.querySelector('.pagination').firstElementChild.textContent;
		var nextVal = document.querySelector('.pagination').lastElementChild.textContent;
		
		if(targetVal != null){
		  if(targetVal == 'Prev'){
		  	if(prevVal == 1){
		  		currentPage = prevVal;
		  	}else{
		  		currentPage = prevVal - 1;
		  	}
		  }else if(targetVal == 'Next'){
		  	if(nextVal == tpNum){
		  		currentPage = nextVal;
		  	}else{
		  		currentPage = parseInt(nextVal) + 1;
		  	}
		  }else if(targetVal == targetVal){
		  	currentPage = targetVal;
		  }
		  listServer(currentPage, searchKwd);
		}
	});
	
	
	
/*글쓰기 버튼 - modal 열기*/
	$('#wrt').on('click', function(){
		//$('#wModal').modal('show')
		//$('#wModal').modal({backdrop : false});
		$('#wModal').modal({backdrop : 'static'});
	});
	
/*모달창 닫기 이벤트*/
	/* $('#wModal').on('hide.bs.modal',function(){
		$('.txt').val("");
	}); */
	
/*글 입력 후 전송*/
	$('#send').on('click', function(e){
		//validation check
		if($('#wrtNm').val() == ""){
			alert("이름을 입력하세요");
		}else if($('#wrtPw').val() == ""){
			alert("비밀번호를 입력하세요");
		}else if($('#wrtSj').val() == "")
			alert("제목을 입력하세요");
		else{
			$('#tta').val(CKEDITOR.instances.tta.getData());
			writeServer();
		}
	});
	
/*버튼 이벤트 - 수정, 삭제, 댓글 등록, 댓글수정, 댓글삭제 -delegate*/
	$('#list').on('click','.action', function(){
		
		let vname = $(this).attr('name');
		vidx = $(this).attr('idx');
		
	//댓글 등록
		if(vname == 'reply'){
			
			//댓글 작성자 이름 임의생성
			 //fromCharCode : 아스키코드번호를 받아 문자열을 구성해주는 함수
			 //ASCII : 미국 표준 정보교환 코드로 컴퓨터 내부에서 문자를 표현하는데 사용
			vname1 = String.fromCharCode( Math.random() * 26 + 65 );	//대문자
			vname2 = String.fromCharCode( Math.random() * 26 + 97 );	//소문자
			vname3 = parseInt( Math.random() * 100 + 1 );	//숫자
			
			vcont = $(this).prev().val();	// (this-btn).prev() 버튼 이전 요소 textarea
			$(this).prev().val("");
			
			//객체 선언-동적으로 메소드나 필드를 추가 가능
			reply={};
			//객체에 필드 추가
			console.log(vidx);
			reply.bonum = vidx;
			reply.name = vname1 + vname2 + vname3;
			reply.cont = vcont;
			//서버로 전송 - ajax
			replyServer(this);	// this- btn : 추후 셀렉터로 접근하여 댓글 리스트 출력 및 제거에 활용
	//게시글 삭제
		}else if(vname == 'delete'){
			let conf = confirm("정말 삭제합니까?");
			if(!conf){
				return false;
			}else{
			  deleteServer();
			}
	//게시글 수정		
		}else if(vname == 'modify'){
			if($('#brdModiForm').css('display') != 'none') modiReset();
		
			//본문 내용 변수에 담기
			brdModiCont = $(this).parents('.pbody').find('.p3').html();
			brdModiCont = brdModiCont.replace(/<br>/g, "\n");
			//수정폼 영역에 내용 붙임
			//$('#brdModiForm textarea').val(brdModiCont);
			CKEDITOR.instances.tta_mdf.setData(brdModiCont);
			//작성(출력)영역에 자식요소만 삭제하고 수정폼 붙임
			$(this).parents('.pbody').find('.p3').empty().append($('#brdModiForm'));
			$('#brdModiForm').show();
	//댓글 수정			
		}else if(vname == 'r_modify'){
			
			//6.댓글수정폼 상태 확인 후 열려있을 경우 replyReset() 호출
 			//if($('#repModiForm').css('display') != "none") replyReset();
			
			//댓글 수정 0.댓글수정 폼 영역 생성 및 display none처리
			//1.댓글 내용 변수에 담기
			repModiCont = $(this).parents('.rep').find('.cont').html();
			repModiCont = repModiCont.replace(/<br>/g, "\n");
			//2.댓글수정폼 영역에 댓글 내용 붙임
			$('#repModiForm textarea').val(repModiCont);
			//3.컨텐츠 작성 영역(.cont p3)의 자식요소(text node)만 삭제하고 그 자리에 댓글수정폼 붙임
			$(this).parents('.rep').find('.cont').empty().append($('#repModiForm'));
			$('#repModiForm').show();
			//★A댓글 수정폼 open상태에서 B댓글 수정 버튼 클릭 시 A댓글 수정창과 내용이 사라지는 현상 수정할 것
			
	//댓글 삭제		
		}else if(vname == 'r_delete'){
			//댓글 삭제
			$(this).parents('.rep').remove();			
			replyDelete();
		}
	});
	
/*★수정창과 내용 사라짐 현상 해결하기 - 수정창이 사라질때 원래의 형태로 돌아가기*/
	modiReset = function(){
		let pbodyp3 = $('#brdModiForm').parent();	//.pbody .p3
		//본문수정폼을 body에 붙이고 숨김
		$('#brdModiForm').appendTo('body');
 		$('#brdModiForm').hide();
		//본문내용을 작성영역에 출력
		brdModiCont = brdModiCont.replace(/\n/g, "<br>");
		$(pbodyp3).html(brdModiCont);
	}
	replyReset = function(){
		let contp3 = $('#repModiForm').parent(); //.cont .p3
		//4.댓글수정폼을 다시 body에 붙여넣고 숨김
		$('#repModiForm').appendTo('body');
		$('#repModiForm').hide();
		//5.댓글 내용을 contp3에 출력
		repModiCont = repModiCont.replace(/\n/g, "<br>");
		$(contp3).html(repModiCont);
	}

/*리스트 제목 클릭시 댓글 리스트 출력*/
	$('#list').on('click', '.list', function(){
		boardNum = $(this).attr('idx');
		replyListServer(this, boardNum);
	});
	
/*본문수정영역 확인 버튼*/
	$('#ok_b').on('click',function(){
		//brdModiCont = $('#brdModiForm textarea').val();
		brdModiCont = CKEDITOR.instances.tta_mdf.getData();
		let pbodyp3 = $('#brdModiForm').parent();
		$('body').append($('#brdModiForm'));
		$('#brdModiForm').hide();
		let modi = brdModiCont.replace(/\r/g, "").replace(/\n/g, "<br>");
		$(pbodyp3).html(modi);
		modf = {};
		modf.bonum = vidx;
		modf.cont = brdModiCont;
		updateServer();
	});
	
/*본문수정영역 취소 버튼*/
	$('#cancel_b').on('click',function(){
		modiReset();
	});
	
/*댓글수정영역 확인 버튼*/
	$('#ok_r').on('click',function(){
		//수정내용 가져오기
		repModiCont = $('#repModiForm textarea').val();
		//.cont p3 영역 변수에 저장		
		let contp3 = $('#repModiForm').parent();
		//댓글 수정창 닫기 - body로 다시 이동하고 감추기
		$('body').append($('#repModiForm'));
		$('#repModiForm').hide();
		//contp3에 수정내용 출력 - <br>로 변환
		let modi = repModiCont.replace(/\r/g, "").replace(/\n/g, "<br>");
		$(contp3).html(modi);
		//reply객체 선언
		reply = {};
		reply.renum = vidx;
		reply.cont = repModiCont;
		
		//서버로 보내기
		replyUpdate();
	});
	
/*댓글수정영역 취소 버튼*/
	$('#cancel_r').on('click',function(){
		replyReset();
	});
	
});

/* -------------------------- 기능 이벤트 영역 --------------------------------- */


/* 게시글 저장 - ajax */
var writeServer = function(){
	
	$.ajax({
		url : '/Write',
		method : 'post',
		data : $('form').serialize(),
		success : function(res){
			if(res.sw == 'ok'){
				alert("게시글이 등록되었습니다");
				$('#wModal').modal('hide');
				$('.txt').val("");
			}else{
				alert("게시글 등록에 실패하였습니다");
				$('#wModal').modal('hide');
			}
			//리스트 출력
			listServer(1);
		},
		error : function(xhr){
			alert(xhr.status);
		},
		dataType : 'json'
	});
};

/* ----------------------------------------------------------- */

/* 게시글 삭제 - ajax */
deleteServer = function(){
	$.ajax({
		url : '/Delete',
		type : 'post',
		data : {"vidx" : vidx},
		success : function(a){
			if(a.data == 1){
				alert("삭제되었습니다");
				listServer($('.active .paging').text());	
			}
		},
		error : function(xhr){
			alert(xhr.status);
		},
		dataType : 'json'
	});
}

/* ----------------------------------------------------------- */

/* 게시글 수정 - ajax */
updateServer = function(){
	$.ajax({
		url : '/Update',
		type : 'post',
		data : modf,
		success : function(){},
		error : function(xhr){
			alert(xhr.status);
		},
		dataType : 'json'
	});
}

/* ----------------------------------------------------------- */

/* 댓글 저장 - ajax */
replyServer = function(btn){	//btn : reply btn
	console.log(reply);
	$.ajax({
		url : '/ReplySave',
		type : 'post',
		data : reply,	//객체 - bonum, name, cont
		success : function(res){
			//댓글 리스트 출력
			/* replyListServer함수호출불가
			if(res.sw == 'no') alert("댓글 등록에 실패했습니다!"); return false;
			replyListServer(btn);
			*/
			
			/* 정상
			 * if(res.sw == 'no'){
				alert("댓실패");
				return false;
			}
			replyListServer(btn); */

			/*삼항연산자*/
			res.sw=='no' ? alert("댓글등록실패") : replyListServer(btn, reply.bonum); //저장 시 댓글 조회
		},
		error : function(xhr){
			alert(xhr.status);
		},
		dataType : 'json'
	});
};

/* ----------------------------------------------------------- */

/* 댓글 리스트 조회 - ajax */
//* class=in 설정시 모든 목록에 표시되어야 할 댓글이 보이지 않는 문제 (=현재는 in미설정으로 글목록 클릭시에만 댓글 리스트를 불러오는 상태) 
replyListServer = function(btn, boardNum){	//btn : (reply) - 댓글 append, remove의 셀렉터로 활용
	
	console.log(boardNum);
	$.ajax({
		url : '/ReplyList',
		data : {'bonum' : boardNum},
		success : function(res){
			
			$(btn).parents('.panel').find('.rep').remove(); //게시글 제목 눌렀을 때 중복 방지
			
			reply = "";	//초기화 후 내용담기(index순)
			$.each(res, function(i,v){
				reply += '<div class="panel-body rep">';
				reply += '	<p class="rp1">작성자 : '	 + v.name + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
				reply += '				  날 짜 : ' + v.redate + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
				reply += '	</p>';
				reply += '	<p class="rp2">';
				reply += '  	<input idx="' + v.renum + '" type="button" name="r_modify" value="댓글수정" class="action btn btn-xs btn-warning">';
				reply += '		<input idx="' + v.renum + '" type="button" name="r_delete" value="댓글삭제" class="action btn btn-xs btn-danger">';
				reply += '	</p>';
				reply += '	<p class="cont rp3">' + v.cont + '</p>';
				reply += '</div>';
			});
			$(btn).parents('.panel').find('.pbody').append(reply);
		},
		error : function(xhr){
			alert(xhr.status);
		},
		dataType : 'json'
	});
};

/* ----------------------------------------------------------- */

/* 댓글 삭제 - ajax */
replyDelete = function(){

	$.ajax({
		url : '/ReplyDelete',
		type : 'get',
		data : {'vidx' : vidx},
		error : function(xhr){
			alert(xhr.status);
		},
		dataType : 'json'
	});
};

/* ----------------------------------------------------------- */

/* 댓글 수정 - ajax */
replyUpdate = function(){
	
	$.ajax({
		url : '/ReplyUpdate',
		type : 'post',
		data : reply,	//renum, cont
		/*success : function(res){
		},
		error : function(xhr){
			alert(xhr.status);
		},*/
		dataType : 'json'
	});
};

/* ----------------------------------------------------------- */