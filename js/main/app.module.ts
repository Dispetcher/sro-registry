import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FilterByNumPipe } from './filter-by-num.pipe';
import { FilterByStatusPipe } from './filter-by-status.pipe';
import { FilterByNamePipe } from './filter-by-name.pipe';
import { FilterByINNPipe } from './filter-by-inn.pipe';
import { FilterByOGRNPipe } from './filter-by-ogrn.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FilterByNumPipe,
    FilterByStatusPipe,
    FilterByNamePipe,
    FilterByINNPipe,
    FilterByOGRNPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
