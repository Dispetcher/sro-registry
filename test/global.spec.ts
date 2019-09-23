import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FilterByNumPipe } from './filter-by-num.pipe';
import { FilterByStatusPipe } from './filter-by-status.pipe';
import { FilterByNamePipe } from './filter-by-name.pipe';
import { FilterByINNPipe } from './filter-by-inn.pipe';
import { FilterByOGRNPipe } from './filter-by-ogrn.pipe';

import { CompslistService } from './compslist.service';
import { CompdetailsService } from './compdetails.service';
import { CompnameService } from './compname.service';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture:ComponentFixture<AppComponent>;
  let compslist:CompslistService;
  let compdetails:CompdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FilterByINNPipe,
        FilterByOGRNPipe,
        FilterByNamePipe,
        FilterByNumPipe,
        FilterByStatusPipe
      ],
      imports: [
        HttpClientModule,
        FormsModule
      ],
      providers: [
        FilterByINNPipe,
        FilterByOGRNPipe,
        FilterByNamePipe,
        FilterByNumPipe,
        FilterByStatusPipe,
        CompdetailsService,
        CompslistService,
        HttpClient,
        {provide: ComponentFixtureAutoDetect, useValue: true}
      ]
    }).compileComponents();
  });

  beforeEach( ()=>{
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compslist = TestBed.get(CompslistService);
  })

it('should create app', ()=>{
  //  console.log('1 create app');
    expect(component).toBeDefined();
  });

  it('should get var cOnPage = 30', ()=>{
   // console.log('2 cOnPage');
    expect(component.cOnPage).toEqual(30);
  });

  it('var orgNums should be 206', async ()=>{
    await fixture.whenStable().then( ()=>{
     // console.log('3 orgNums', component.orgNums);
      expect(component.orgNums).toEqual('200');
      });  

  });

  it('should get an array of rows = 400 elems', async()=>{
   await fixture.whenStable().then( ()=>{
      let elems:HTMLCollection = fixture.nativeElement.querySelectorAll('.item.body');
      console.log(elems.length);
      expect(elems.length).toEqual(394);
   });
  });

  it('should get the array.length = 400', async ()=>{
    const companies = await compslist.getCompsList().toPromise();
    console.log('5 async 400 comp', Object.keys(companies).length);
    expect(Object.keys(companies).length).toEqual(394);    
  });

  it('should show companies from 31 till 60 when clicked on 2nd page button and attr of 31st company is table-row', async()=>{
   // await fixture.whenStable();
   await fixture.whenStable().then( ()=>{
      component.openMore(2);
      fixture.detectChanges();
        let page_elem:HTMLElement = fixture.nativeElement.querySelector('.curr');
        let row:HTMLCollection = fixture.nativeElement.querySelectorAll('.item.body');
        console.log('6 render comps when click 2 page', page_elem.textContent);
        console.log(row[30].getAttribute('style'));
        expect(page_elem.textContent).toContain('2');
        expect(row[30].getAttribute('style')).toContain('display: table-row;');    
    });
  });

  it('should run pipe', async()=>{
      await fixture.whenStable().then( ()=>{
      let input:HTMLInputElement = fixture.nativeElement.querySelector('.num_r');
      input.value = '10';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      console.log('8 input value',fixture.nativeElement.querySelector('.num_r').value);
      let elems:HTMLCollection = fixture.nativeElement.querySelectorAll('.item.body');
      //console.log('length of elems array', elems.length);
      expect(elems.length).toEqual(14);
    });
  });

  it('should return whole array of companies when empty input', async()=>{
     await fixture.whenStable().then( ()=>{
      let input:HTMLInputElement = fixture.nativeElement.querySelector('.num_r');
      input.value = '';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      let elems:HTMLCollection = fixture.nativeElement.querySelectorAll('.item.body');
      console.log('9 reset to default', elems.length);
      expect(elems.length).toEqual(394);
   });
  });

  it('should go to 4th page and return visible from 91 till 120 elems of array', async()=>{
      await fixture.whenStable().then( ()=>{
      let elems = fixture.debugElement.queryAll(By.css('.btm_cell'));
      elems[6].triggerEventHandler('click', null);
      let comp_elems:HTMLCollection = fixture.nativeElement.querySelectorAll('.item.body');
      console.log('10', comp_elems[92].getAttribute('style'));
      expect(comp_elems[92].getAttribute('style')).toContain('table-row');
    });    
  }); 
});
