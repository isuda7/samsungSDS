/*-------------------------------------------------------------------
	분류순서
	- @Variables	: 전역변수
	- @Settings		: 기본설정
	- @Utility		: 유틸기능
	- @Layout		: 레이아웃
	- @Components	: 컴포넌트
	- @Content		: 컨텐츠
	- @Init			: 초기실행
-------------------------------------------------------------------*/
/*-------------------------------------------------------------------
	@Variables
-------------------------------------------------------------------*/
//Elements
var	$window			= null,
	$document		= null,
	$body			= null,
_;

/*---------------------------------------------------------------
	@Settings
---------------------------------------------------------------*/
/* 엘리먼트 설정 */
function setElementInit(){
	$window		= $(window);
	$document	= $(document);
	$npdu		= $("body");
}

/*---------------------------------------------------------------
	@UI
---------------------------------------------------------------*/
/* Main Menu */
function mainMenuInit(){
	var clsActive = "opened";
	var $items = $(".main-menu .has-sub.root-level").children("a");
	$items.off("click").on("click", function(){
		var $itemParent = $(this).parent();
		if ($itemParent.hasClass(clsActive)){
			$(this).next('ul').slideUp("fast").parent().removeClass(clsActive);
		} else {
			$(this).next('ul').slideDown("fast").parent().addClass(clsActive);
			$itemParent.siblings(".has-sub.root-level").children("ul").slideUp("fast").parent().removeClass(clsActive);
		}
		return false;
	})
}

/* Main Menu Selected */
function setMainMenu(n1, n2){
	var $Node1 = $(".main-menu .root-level").eq(n1);
	var $Node2 = $Node1.find("li").eq(n2);
	if ($Node1.length) {$Node1.addClass('is-selected')}
	if ($Node2.length) {$Node2.addClass('is-selected')}
}

/* Sidebar Collapse */
function sidebarCollapseInit(){
	var $PageContainer = $('.page-container');
	var $ToggleBtn = $('.sidebar-collapse-icon');

	$ToggleBtn.off("click").on("click", function(){
		$PageContainer.toggleClass("sidebar-collapsed");
	})
}

/*---------------------------------------------------------------
	@Mudules
---------------------------------------------------------------*/
/* 파일첨부 - 파일명표시 */
function fileAttachSrc(obj, e){
	var $eleFormText = $(obj).closest('.file').find('input[type=text]');
	if ($eleFormText){
		var fileValue = $(obj).val().split("\\");
		var fileName = fileValue[fileValue.length-1];
		$eleFormText.val(fileName);
	}
}

/* 파일첨부 - 추가 */
function fileAttachAdd(obj, str){
	var $group = $(obj).closest('.form-controls.type-file'),
		idx = $group.find('.file').length,
		id = str+idx,
		html = ''
			+'<div class="row">'
			+'	<span class="file">'
			+'		<input type="text" id="sFileName'+idx+'" class="input demo1" title="첨부된 파일명" />'
			+'		<label for="'+id+'" class="btn demo2 btn_file" role="button">'
			+'			<span><input type="file" name="'+id+'" id="'+id+'" value="찾아보기" tabindex="-1" aria-hidden="true" onchange="fileAttachSrc(this, event)" />첨부</span>'
			+'		</label>'
			+'		<button type="button" class="btn demo2 type-add" onclick="fileAttachAdd(this, \'sFilesAdd2\')"><span>추가</span></button>'
			+'		<button type="button" class="btn demo2 type-remove" onclick="fileAttachRemove(this)"><span>삭제</span></button>'
			+'	</span>'
			+'</div>'
		$group.append(html);
}

/* 파일첨부 - 삭제 */
function fileAttachRemove(obj){
	var $row = $(obj).closest('.row');
	if ($row.siblings().length){
		$(obj).closest('.row').remove();
	}
}

/* 파일첨부 - 이미지미리보기 */
function fileAttachPreview(id, e){
	var sel_files = [];
	var $eleFormImg = $('#'+id);
	if ($eleFormImg.length){
		//이미지 사진보기
		var files = e.target.files;
		var filesArr = Array.prototype.slice.call(files);

		filesArr.forEach(function(f){
			if (!f.type.match("image.*")){
				alert('확장자는 이미지 확장자만 가능합니다.');
				return;
			}
			sel_files.push(f);

			var reader = new FileReader();
			reader.onload = function(e){
				var eleImg = '<img src="'+e.target.result+'" alt="첨부된파일">';
				$eleFormImg.html(eleImg);
			}
			reader.readAsDataURL(f);
		})
	}
}

/*---------------------------------------------------------------
	@Content
---------------------------------------------------------------*/
// 이름
function nameInit(){
}

/*---------------------------------------------------------------
	@Init
---------------------------------------------------------------*/
$(function(){
	/* Setting */
	setElementInit(); // 엘리먼트 설정

	/* UI */
	mainMenuInit();
	sidebarCollapseInit();
});
