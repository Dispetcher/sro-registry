import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CompslistService } from './compslist.service';
import { FilterByNumPipe } from './filter-by-num.pipe';
import { FilterByStatusPipe } from './filter-by-status.pipe';
import { FilterByNamePipe } from './filter-by-name.pipe';
import { FilterByINNPipe } from './filter-by-inn.pipe';
import { FilterByOGRNPipe } from './filter-by-ogrn.pipe';
import { map } from 'rxjs/operators';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let service: CompslistService;
  let filter: FilterByNumPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FilterByStatusPipe,
        FilterByINNPipe,
        FilterByOGRNPipe,
        FilterByNamePipe,
        FilterByNumPipe
      ],
      imports: [
        FormsModule,
        HttpClientModule
      ],
      providers: [
        CompslistService,
        FilterByStatusPipe,
        FilterByINNPipe,
        FilterByOGRNPipe,
        FilterByNamePipe,
        FilterByNumPipe,
        HttpClient,
        {provide: ComponentFixtureAutoDetect, useValue: true}
        ]
    }).compileComponents();
  });

  beforeEach( ()=>{
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CompslistService);
    filter = TestBed.get(FilterByNumPipe);
  });

  it('should create app', ()=>{
  //  console.log('1 create app');
    expect(component).toBeDefined();
  });

  it('should get var cOnPage = 30', ()=>{
   // console.log('2 cOnPage');
    expect(component.cOnPage).toEqual(30);
  });

  it('var orgNums should be 206', ()=>{
    
     fixture.whenStable().then( ()=>{
     // console.log('3 orgNums', component.orgNums);
      expect(component.orgNums).toEqual('206');
      });  
  });

  it('should be 20 blocks in pagination bar, 6 service blocks and 14 pages', ()=>{

      fixture.whenStable().then( ()=>{
      let pageblocks = fixture.nativeElement.querySelectorAll('.btm_cell');
     // console.log('4 20 blocks', pageblocks.length);
      expect(pageblocks.length).toEqual(20);
      });
  });

  it('should get the array.length = 400', async(()=>{
    fixture.whenStable().then( ()=>{
      service.getCompsList().subscribe( data => {
     //  console.log('5 async 400 comp', Object.keys(data).length);
    	 expect(Object.keys(data).length).toEqual(400);
      });
    });
  }));

	it('should show companies from 31 till 60 when clicked on 2nd page button and attr of 31st company is table-row', ()=>{
		fixture.whenStable().then( ()=>{
			component.openMore(2);
      fixture.detectChanges();
        let page_elem:HTMLElement = fixture.nativeElement.querySelector('.curr');
        let row:HTMLCollection = fixture.nativeElement.querySelectorAll('.item.body');
       // console.log('6 render comps when click 2 page', page_elem.textContent);
       // console.log(row[30].getAttribute('style'));
        expect(page_elem.textContent).toContain('2');
        expect(row[30].getAttribute('style')).toContain('display: table-row;');		
		});
	});

  it('should return 4 companies when filteringByNum = 00', async(()=>{

      fixture.whenStable(). then( ()=>{
        let companies = filter.transform(component.companies, '00');
      //  console.log('7 async, 4 companies should return '+ companies.length);
        expect(companies.length).toEqual(4);
      }); 
  }));

  it('should run pipe', ()=>{

    fixture.whenStable().then( ()=>{
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

  it('should return whole array of companies when empty input', ()=>{

    fixture.whenStable().then( ()=>{
      let input:HTMLInputElement = fixture.nativeElement.querySelector('.num_r');
      input.value = '';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      let elems:HTMLCollection = fixture.nativeElement.querySelectorAll('.item.body');
      console.log('9 reset to default', elems.length);
      expect(elems.length).toEqual(400);
    });
  });

  it('should go to 4th page and return visible from 91 till 120 elems of array', ()=>{
      fixture.whenStable().then( ()=>{
      let elems = fixture.debugElement.queryAll(By.css('.btm_cell'));
      elems[6].triggerEventHandler('click', null);
      let comp_elems:HTMLCollection = fixture.nativeElement.querySelectorAll('.item.body');
      console.log('10', comp_elems[92].getAttribute('style'));
      expect(comp_elems[92].getAttribute('style')).toContain('table-row');
    });    
  });

});
