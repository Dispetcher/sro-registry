import { Component, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-reestr-print',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

host:string;
compDetails:any;/* For popup window - array with details*/
link:string;
orgName:string;
cId:string;
compNameUrl:string = '../../wp-content/plugins/sro-registry/php/compslist.php';/* Link to get company name */
compInfoUrl:string = '../../wp-content/plugins/sro-registry/php/compinfo.php';/* Link to get company details */

constructor(private element:ElementRef, private http:Http, private cdRef:ChangeDetectorRef){}

ngOnInit(){
	this.getId();

	this.http.post( this.compNameUrl, {"id":this.cId} )
	.subscribe(
		(data)=>{let org = data.json();
			this.orgName = org['MEMBERNAME'];
		}
	);

	this.http.post(this.compInfoUrl, {"id":this.cId})
	.subscribe(
		(data)=>{this.compDetails = data.json();
			this.cdRef.detectChanges();
			this.mergeCells();
		}
	);
}

/**** Get company ID and call function to get info ****/
/*===========================*/
getId(){
	this.link = window.location.href;
	if(this.link.indexOf('#id-')!= -1){
		let indx = this.link.indexOf('id-') + 3;
		this.cId = this.link.slice(indx);
	}
	return this.cId;
}
/*******(End of) Get company ID *******/

/******** Merge cells in details table **********/
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
}
/*******(End of) Merge cells in details table *******/

}
