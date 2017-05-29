import {ActionReducer, Action} from "@ngrx/store";
import {TimeoutState, initialState} from "./ngSessionTimeout.state";
import * as moment from 'moment';

export const timeoutReducer:ActionReducer<TimeoutState> =
  (state = initialState, action: Action) => {
    return Object.assign(state, {
      lastAccessed: moment()
    });
  };
