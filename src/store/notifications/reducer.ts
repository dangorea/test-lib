import c from "./constants";
import type { State, INotification } from "./types";
import type { Reducers } from "../types";
import type { AnyAction } from "redux";

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
  const relevantReducer = reducers[action.type] || reducers.def;

  return relevantReducer(state, action.payload) as State;
};

export default notificationsReducer;
