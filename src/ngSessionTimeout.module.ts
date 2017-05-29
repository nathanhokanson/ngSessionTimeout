import { NgModule } from '@angular/core';
import {StoreModule} from "@ngrx/store";
import {timeoutReducer} from "./ngSessionTimeout.reducer";
import {TimeoutDirective} from "./ngSessionTimeout.directive";

@NgModule({
  declarations: [
    TimeoutDirective
  ],
  imports: [],
  exports: [
    TimeoutDirective
  ],
  providers: []
})
export class TimeoutModule { }
