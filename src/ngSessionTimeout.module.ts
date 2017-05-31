import { NgModule } from '@angular/core';
import {TimeoutDirective} from "./ngSessionTimeout.directive";
import {StoreModule} from "@ngrx/store";
import {timeoutReducer} from "./ngSessionTimeout.reducer";

@NgModule({
  declarations: [
    TimeoutDirective
  ],
  imports: [
      StoreModule.provideStore({timeoutReducer})
  ],
  exports: [
    TimeoutDirective
  ],
  providers: []
})
export class TimeoutModule { }
