export const createRequestTypes = (
  baseType: string
): { [actionType: string]: string } => {
  const request = `${baseType}_REQUEST`;
  const error = `${baseType}_ERROR`;
  const success = `${baseType}_SUCCESS`;

  return {
    [request]: request,
    [error]: error,
    [success]: success,
  };
};

/* eslint-disable @typescript-eslint/no-unsafe-return,
 @typescript-eslint/explicit-module-boundary-types */
export const requestReducer = (state: any): any => {
  return {
    ...state,
    isLoading: true,
    error: null,
  };
};

export const errorReducer = (state: any, payload: string): any => {
  return {
    ...state,
    isLoading: false,
    error: payload,
  };
};

export const successReducer = (state: any, payload: unknown): any => {
  return {
    ...state,
    data: payload,
    isLoading: false,
    error: null,
  };
};

export const emptySuccessReducer = (state: any): any => {
  return {
    ...state,
    isLoading: false,
    error: null,
  };
};
