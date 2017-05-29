import {Directive, Renderer2, Input, Output, EventEmitter, OnChanges} from "@angular/core";
import {Store} from "@ngrx/store";
import {TimeoutState} from "./ngSessionTimeout.state";
import {Subscription, Observable} from "rxjs";
import * as moment from "moment";

const millis = 1000;

@Directive({
  selector: '[timeout]'
})
export class TimeoutDirective implements OnChanges {
  @Input() interval:number = 20;
  @Input() idle:number = 10;
  @Output() timedOut:EventEmitter<boolean> = new EventEmitter<boolean>();

  private timeoutSubscription:Subscription;
  private logoutSubscription:Subscription;
  private listener:Function;
  private state:TimeoutState;
  private intervalCheck:number = this.interval * millis;

  constructor(private store:Store<TimeoutState>,  private renderer:Renderer2) {
    store.select('timeoutReducer').subscribe((state:TimeoutState) => {
      this.state = state;
      if (this.timeoutSubscription) {
        this.timeoutSubscription.unsubscribe();
        this.timeoutSubscription = undefined;
      }
      if (!this.logoutSubscription) {
        this.setTimeoutSubscription();
      }
    });
  }

  ngOnChanges(changes) {
    if (changes.interval) {
      this.intervalCheck = this.interval * millis;
    }
  }

  setTimeoutSubscription() {
    this.timeoutSubscription = Observable.timer(this.intervalCheck, this.intervalCheck).subscribe(() => {
      let diff = moment().diff(this.state.lastAccessed);
      if (diff > this.intervalCheck) {
        this.listener = this.renderer.listen('document', 'mousemove', this.removeListener.bind(this));
        this.logoutSubscription = Observable.timer(millis, millis).subscribe((x) => {
          if (x >= this.idle) {
            this.timedOut.emit(true);
          }
        });
        this.timeoutSubscription.unsubscribe();
        this.timeoutSubscription = undefined;
      }
    });
  }

  removeListener() {
    this.listener();
    this.logoutSubscription.unsubscribe();
    this.logoutSubscription = undefined;
    this.setTimeoutSubscription();
  }
}
