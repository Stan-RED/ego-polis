import { CoreAction, CoreActionTypes } from "../actions";

export interface CoreState {

}

export const initialState: CoreState = {};

export function reducer(state = initialState,
                        action: CoreAction): CoreState {
  switch (action.type) {
    case CoreActionTypes.APP_START: {
      return {
        ...state
      };
    }

    default: {
      return state;
    }
  }
}

// export const selectProperty = (state: CoreState) => state.property;
