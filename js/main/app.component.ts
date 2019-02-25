import { Component, ElementRef, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Http, HttpModule } from '@angular/http';

@Component({
  selector: 'app-root',
  host: {'(window:keydown)': 'closeDetWin($event)'},
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {

host:string;
companies:any;
compDet:any;/* For popup window - array with details*/
orgNums:string;
curDate:string;
agentId:string;
numR:string; status:string;
name:string; inn:string;
ogrn:string; memberName:string;
row:Array<string>; /* Array of page numbers */
pNums:number; /* Number of companies pages on the MAIN PAGE*/
orgName:string;/* For popup window - name of the company*/
linkId:string;/* For popup window - link for print ver*/
compShow:any; /* Current number of shown companies */
servVar:number = 0; /* detect a need to run mergecell in opening company details window*/
firstVChanged:number = 0; /* Detect when array renders, when 1 - first rendered, 2 - rendered with filters*/
elmsOnPages:number;
elmPages:number;
cOnPage:number; /* Number of companies on a single page*/
printVer:string = 'Версия для печати'; /* Name of link to print ver.*/
compsListUrl:string = '../wp-content/plugins/sro-registry/php/compslist.php'; /* Link to general companies list*/
compDetailsUrl:string = '../wp-content/plugins/sro-registry/php/compinfo.php';/* Link to company details */
compNameUrl:string = '../wp-content/plugins/sro-registry/php/compslist.php';/* Link to get company name */
processUrl:string = '../wp-content/plugins/sro-registry/php/process.php';/* Link to get setting*/

constructor(private element:ElementRef, private http:Http, private cdRef:ChangeDetectorRef){}

ngOnInit(){
	this.http.post(this.processUrl, 1)
	.subscribe(
		(data)=>{this.cOnPage = Number(data.json())
	});

	this.http.get(this.compsListUrl)
	.subscribe(
		(data)=>{this.companies = data.json(); 
			this.http.post(this.processUrl, 1)
				.subscribe(
				(data)=>{this.cOnPage = Number(data.json());
				this.compLen(this.companies); /* sub func for arrPages to get page numbers */
				this.arrPages(); /* add page numbers to array*/
				this.orgChlenSro(); /* get number of companies which are in SRO */
				this.cdRef.detectChanges(); /* force run rendering a DOM tree */
				this.hideOrg();
				this.paginate(1, 0);
				this.elmsOnPages = this.element.nativeElement.querySelectorAll('.item.body').length;
				this.firstVChanged = 1;
			});
			
		}
	);
	this.searchOpen();
}

ngAfterViewChecked(){

	if(this.servVar == 1){
		this.cdRef.detectChanges();
		this.mergeCells();
	}else if(this.firstVChanged == 1){
		this.detChanges();
	}
	
}
/**** Get number of operating companies ****/
/*===========================*/
orgChlenSro(){
	let orginArr = [];
	let cl = this.companies.length;
	for(let i=0; i<cl; i++){
		var elArr = this.companies[i];
		if(elArr['AGENTSTATUSE'] == 'Член СРО'){
			orginArr.push(elArr);
		}
	}
	this.orgNums = String(orginArr.length);
	
	this.getCurDate();
}
/*******(End of) Get number of operating companies *******/

/**** Get number of pages ****/
/*===========================*/
compLen(c){
	if(!c){
		c = this.companies;
	}
	let cl = c.length;
	if(!this.cOnPage){
		this.cOnPage = 30
	}
	if (cl%this.cOnPage > 0){
		this.pNums = (cl - cl%this.cOnPage) / this.cOnPage + 1;
	}else{
		this.pNums = (cl - cl%this.cOnPage) / this.cOnPage;
	}
	/* In case a filter returns 0 companies*/
	if(cl == 0){
		this.pNums = 1;
	}
}
/*******(End of) Get number of pages *********************/

/**** Open next-prev page with companies ****/
/*===========================*/
openMore(num){
	let el=this.element.nativeElement;
	let pages = el.querySelectorAll('.btm_cell');
	let curr = parseInt(el.querySelector('.curr').innerText);
	let elms = this.element.nativeElement.querySelectorAll('.main tbody tr').length;
	this.compShow = el.querySelectorAll('.item.body');

	/*this.compLen(this.compShow);*/

	if(window.innerWidth > 1023){

		if(num == 'prev'){
			if(curr == 1){
				num = curr;
			}else{
				num = curr-1; 
			}
		}else if(num == 'empty'){
			return 1;
		}else if(num == '...'){
			return 1;
		}else if(num == 'next'){
			if(pages.length == 7 || pages.length == 8){
				if(curr == pages.length-5){
					num = curr;
				}else{
					num = curr+1;
				}
			}else{
				if(curr == pages.length-6){
					num = curr;
				}else{
					num = curr+1;
				}
			}
		}else if(num == 'max'){
			if(pages.length == 7 || pages.length == 8){
				num = pages.length-5;
			}else{
				num = pages.length-6;
			}

		}
	}
		
	let a = 0 + this.cOnPage*(num-1);
	let b = this.cOnPage -1 + this.cOnPage*(num-1);

	this.paginate(num, this.pNums);

	if(num){
		if(b >= elms){
			this.showmore(a, elms-1);
		}else{
			this.showmore(a, b);
		}
	}	
}
/*******(End of) Open next-prev page with companies ******/

/**** Adding array of page numbers and etc symbol (...) ****/
/*===========================*/
arrPages(){
	let arr = [];
	for (let i=1; i<=this.pNums; i++){
		if(this.pNums > 3){
			if(i == this.pNums){
				arr.push('...');
			}
		}		
		arr.push(i); 
	}
	this.row = arr;
}
/*******(End of) Adding array of page numbers and etc symbol ******/

/**** Sub function to show next page -- of openMore func ****/
/*===========================*/
showmore(n_st, n_fin){
	let elm = this.element.nativeElement.querySelectorAll('.main tbody tr');
		
	for(let j=0; j < elm.length; j++){
		elm[j].style.display = 'none';
	}
	for(let j=n_st; j<=n_fin; j++){
		elm[j].style.display = 'table-row';
	}		
}
/*******(End of) Sub function to show next page ******/

/**** Sub function to hide companies -- of openMore func ****/
/*===========================*/
hideOrg(){
	this.elmPages = this.element.nativeElement.querySelectorAll('.btm_cell').length;
	let elms = this.element.nativeElement.querySelectorAll('.main tbody tr').length;

		if(this.elmPages > 5){
			if(elms > this.cOnPage-1){
				this.showmore(0, this.cOnPage-1);
			}else{
				this.showmore(0, elms-1);
			}
		}

}
/*******(End of) Sub function to hide companies ******/

/**** Sub function to hide companies -- of openMore func ****/
/*===========================*/
hideBtmCells(){
	this.compShow = this.element.nativeElement.querySelectorAll(".item.body");
	this.compLen(this.compShow);
	this.paginate(1, this.pNums);
}
/*******(End of) Sub function to hide companies ******/

/************ Creating pagination ***************/
/********===========================*************/
paginate(n, len_c){
	var pgs = this.element.nativeElement.querySelectorAll('.btm_cell');
	var len = pgs.length;

	this.rmvclass(pgs, len);
	if(n == len_c){
		pgs[len-3].classList.add('curr');
	}else{
		pgs[n+2].classList.add('curr');
	}

	if(len_c == 0 || len_c == len-6 || len_c == len-5){
		if(window.innerWidth > 1023){
			if(n == 1){
				this.showAll(pgs);
				this.hideAfter(pgs,n);
				if(len_c == 1){/* if there is 1 page*/
					pgs[len-2].style.display =  'none';
					pgs[len-1].style.display =  'none';
				}else if(len_c == 2){ /* if there are 2 pages*/
					pgs[len-1].style.display =  'none';
				}
				pgs[0].style.display = 'none';
				pgs[1].style.display = 'none';
				pgs[2].style.display = 'none';
			}else if(n == 2){
				this.showAll(pgs);
				this.hideAfter(pgs,n);
				if(len_c == len-5){
					pgs[len-2].style.display =  'none';
					pgs[len-1].style.display =  'none';
				}				
				pgs[0].style.display = 'none';
				pgs[2].style.display = 'none';
			}else if(n == len-8){
				this.showAll(pgs);
				this.hideBefore(pgs,n);
				pgs[len-4].style.display = 'none';
			}else if(n == len-7){
				this.showAll(pgs);
				this.hideBefore(pgs,n);
				pgs[len-4].style.display = 'none';
				pgs[len-1].style.display = 'none';
			}else if(n == len-6){
				this.showAll(pgs);
				this.hideBefore(pgs,n);
				pgs[len-4].style.display =  'none';
				pgs[len-2].style.display =  'none';
				pgs[len-1].style.display =  'none';
			}else if(n == len-5){
				if(len_c == len-5){
					this.showAll(pgs);
					this.hideBefore(pgs,n);
					if(n == 2){
						pgs[len-4].style.display =  'none';
					}					
					pgs[len-2].style.display =  'none';
					pgs[len-1].style.display =  'none';
				}
			}else{
				this.showAll(pgs);
				this.hideBefore(pgs,n);
				this.hideAfter(pgs,n);
			}
		}else{
			this.showAll(pgs);
			pgs[0].style.display = 'none';
			pgs[1].style.display = 'none';
			pgs[2].style.display = 'none';
			pgs[len-4].style.display ='none';
			pgs[len-2].style.display ='none';
			pgs[len-1].style.display ='none';
		}
	}else{
		this.showAll(pgs);
		pgs[0].style.display = 'none';
		pgs[1].style.display = 'none';
		pgs[2].style.display = 'none';
		pgs[len-4].style.display = 'none';
		pgs[len-2].style.display = 'none';
		pgs[len-1].style.display = 'none';
		for(let i=len_c+3; i<len; i++){
			pgs[i].style.display = 'none';
		}
	}
}	
/*******(End of) Creating pagination ******/


/******** Sub functions for pagination **********/
/********===========================*************/

	/************ Remove classNames **************/	
rmvclass(pgs, len){
	for(let i=0; i<len-2; i++){
		pgs[i].classList.remove('curr');
	}
}
	/************ Show All pages **************/

showAll(pgs){
	for (let i=0; i < pgs.length; i++){
		pgs[i].style.display = 'inline-block';
	}
}
	/************ Hide Before necessary page **************/

hideBefore(pgs, n){
	for (let i=3; i < n+1; i++){
		pgs[i].style.display = 'none';
	}
}
	/************ Hide After necessary page **************/

hideAfter(pgs, n){
	for (let i=n+4; i < pgs.length - 4; i++){
		pgs[i].style.display = 'none';
	}
}
/*******(End of) Sub functions for pagination ******/


/******** Open popup window with details **********/
/********===========================*************/
openUp(id, name){

	/**  Получаем имя в заголовок на всплюывающем окне **/
	this.orgName = name;
	
	this.http.post(this.compDetailsUrl, {"id":id}).
	subscribe(
		(data)=>{
			this.compDet = data.json();
			this.servVar = 1;
		}
	);	

	/**** Отслеживание нажатий, установка положения кнопки вверх 
	======================================
	*****/
		
	this.element.nativeElement.querySelector("#popup_table").style.display = "block";	
	/*this.element.nativeElement.querySelector(".to_top").style.right = "60px";	*/

	/**** Установка положения окна в 0,0 
	======================================
	*****/	
	if (window.innerWidth < 420){
		window.scrollTo(0, 395);
	}else{
		window.scrollTo(0, 360);
	}

	/********************Печатная версия карточки
	=====================
	*********************/
	this.linkId = 'https://www.metrotunnel.ru/reestr/printver/#id-' + id;
	this.element.nativeElement.querySelector('#linkprint').setAttribute('link', this.linkId);

	};

/******** Merge cells in details window**********/
/********===========================*************/
mergeCells(){
	/** List of elements for categorizing **/
	let col_ext = this.element.nativeElement.querySelectorAll(".form_col_ext");
	let col_hide = this.element.nativeElement.querySelectorAll(".form_col_hide");
	let arr = [2, 8, 11, 16, 19, 21, 24, 27, 35, 38, 42, 46];

	for(let j = 0; j < col_ext.length; j++){
		if(col_ext[j].innerText == 'Сведения о приостановлении, о возобновлении, об отказе в возобновлении права осуществлять строительство, реконструкцию, капитальный ремонт объектов капитального строительства'){
			arr.push(j);
		}else if(col_ext[j].innerText == 'Сведения о прекращении членства в Ассоциации'){
			arr.push(j);
		}else if(col_ext[j].innerText == 'Ранее выданные свидетельства о допуске/праве'){
			arr.push(j);
		}else if(col_ext[j].innerText == 'Сведения о проведенных проверках'){
			arr.push(j);
		}else if(col_ext[j].innerText == 'Факты применения мер дисциплинарного воздействия'){
			arr.push(j);
		}
	}
		
	arr.forEach(function(i, array){
		if(col_ext[i]){/* Checking- is the element in a DOM tree?*/
			col_ext[i].style.fontWeight ='600';
			col_ext[i].classList.add('popup_header');
			col_ext[i].setAttribute('colspan', '2');
		}

		if(col_hide[i]){/* Checking- is the element in a DOM tree?*/
			col_hide[i].style.display = 'none';
		}
	});	
	this.servVar = 0;
}
/*******(End of) Merge cells in details window ******/


/******** Hide popup window with details **********/
/********===========================*************/
hide(){
	this.element.nativeElement.querySelector('#popup_table').style.display ='none';
}
/*******(End of) Hide popup window with details ******/

/******** Detect changes for re-paginate **********/
/********===========================*************/
detChanges(){
	let elms = this.element.nativeElement.querySelectorAll('.main tbody tr');
	if(elms.length != this.elmsOnPages){

		this.compLen(elms);
		this.row = [];
		this.arrPages();
		this.cdRef.detectChanges();
		this.hideOrg();
		this.paginate(1, this.pNums);

		this.elmsOnPages = elms.length;
	}
}
/*******(End of) Detect changes for re-paginate ******/

/******** Close a popup window by clicking ESC **********/
/********===========================*************/
closeDetWin(e){
	if(e.keyCode == 27){
		this.hide()
	}
}
/*******(End of) Close a popup window by clicking ESC ******/

/******** Get current date **********/
/********===========================*************/
getCurDate(){
	let date = new Date();
	let m = date.getMonth() + 1;
	let month;

	if(m < 10 ){
		month = '0' + m;
	}else{
		month = m;
	}
	this.curDate = date.getDate() + '.' + month + '.' + date.getFullYear();
}
/*******(End of) Get current date ******/

/******** Open print version page in a new tab **********/
/********===========================*************/
openPrintVer(){
	window.open(this.element.nativeElement.querySelector('#linkprint').getAttribute('link'), '_blank');
}
/*******(End of) Open print version page in a new tab ******/

/******** Open popup window from search **********/
/********===========================*************/
searchOpen(){
	let lnk = window.location.href;

	if(lnk.indexOf('#id-')!= -1){
		let indx = lnk.indexOf('id-') + 3;
		var compId = parseInt(lnk.slice(indx));

		this.http.post(this.compNameUrl, compId)
		.subscribe(
			(data)=>{let org = data.json();
			let orgN = org[0];
			let compName = orgN['MEMBERNAME'];
			this.openUp(compId, compName);
			}
		)		
	}
}
/*******(End of) Open popup window from search  ******/
}
