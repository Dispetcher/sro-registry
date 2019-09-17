import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CompslistService } from './compslist.service';
import { FilterByNumPipe } from './filter-by-num.pipe';
import { FilterByStatusPipe } from './filter-by-status.pipe';
import { FilterByNamePipe } from './filter-by-name.pipe';
import { FilterByINNPipe } from './filter-by-inn.pipe';
import { FilterByOGRNPipe } from './filter-by-ogrn.pipe';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let service: CompslistService;

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
        HttpClient
        ]
    }).compileComponents();
  });

  beforeEach( ()=>{
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(CompslistService);
  });

  it('should create app', ()=>{
    expect(component).toBeDefined();
  });

  it('should get var cOnPage = 30', ()=>{
    expect(component.cOnPage).toEqual(30);
  });

  it('var orgNums should be 206', ()=>{
  	fixture.whenRenderingDone().then( ()=>{
  		expect(component.orgNums).toEqual('206');
  		console.log(component.orgNums);
  	});  	
  });

  it('should be 20 blocks in pagination bar, 6 service blocks and 14 pages', ()=>{

  	fixture.whenRenderingDone().then( ()=>{
  		fixture.detectChanges();
  		let pageblocks = fixture.nativeElement.querySelectorAll('.btm_cell');
  		console.log(pageblocks.length);
  		expect(pageblocks.length).toEqual(20);
  	});

  });

  it('should get the array.length = 400', async(()=>{
    fixture.detectChanges();
    service.getCompsList().subscribe( data => {
    	expect(Object.keys(data).length).toEqual(400);
    });

  }));

});
