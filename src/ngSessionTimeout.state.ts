import * as moment from 'moment';

export interface TimeoutState {
  lastAccessed: any;
}

export const initialState: TimeoutState = {
  lastAccessed:moment()
};
