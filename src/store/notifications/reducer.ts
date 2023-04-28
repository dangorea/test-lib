import c from "./constants";
import type { State, INotification } from "./types";
import type { Reducers } from "../types";
import type { AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";

const initialState: State = {
  data: [],
};

const reducers: Reducers<State> = {
  [c.ADD_NOTIFICATION]: (state, payload: INotification) => {
    return {
      ...state,
      data: [...state.data, payload],
    };
  },
  [c.REMOVE_NOTIFICATION]: (state, payload: string) => {
    return {
      ...state,
      data: state.data.filter(({ id }) => id !== payload),
    };
  },
  def: (state) => state,
};

const notificationsReducer = (
  state = initialState,
  action: AnyAction
): State => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }

  const relevantReducer = reducers[action.type] || reducers.def;

  return relevantReducer(state, action.payload) as State;
};

export default notificationsReducer;
