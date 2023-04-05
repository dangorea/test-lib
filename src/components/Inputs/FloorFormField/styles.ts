import styled from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  position: relative;
  margin-top: 3px;
  margin-bottom: 10px;
  width: 343px;
`;

export const FormWrapper = styled.div`
  padding-top: 6px;
  flex-grow: 1;
  margin: auto 0;
  max-width: 100%;
  display: block;
`;

export const FormContainer = styled.div<{ error: boolean }>`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  box-sizing: border-box;
  position: relative;
  display: flex;
  border-bottom: solid 1px ${({ error }) => (!error ? "#aaa" : "#ee5951")};
  background: transparent;
  color: #fff;
`;

export const InputContainer = styled.div<{ error: boolean }>`
  padding: 0;
  display: flex;
  width: 100%;

  path {
    width: 15.75px;
    height: 12.38px;
    fill: ${({ error }) => (!error ? "#aaa" : "#ee5951")};
  }
`;

export const FormInput = styled.input<{ error: boolean }>`
  text-overflow: clip;
  padding: 2px 3px 12px 8px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #fff;
  display: block;
  flex: 1 1 auto;
  margin: 0;
  border: 0;
  outline: 0;
  background: 0 0;
  box-shadow: none;
  width: inherit;
  overflow-block: scroll;

  &::placeholder {
    color: ${({ error }) => (!error ? "#aaa" : "#ee5951")};
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
`;

export const Label = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 auto;
  max-width: 100%;
  color: #ffffff;
  margin-top: 20px;
  margin-bottom: 15px;
`;

export const LabelText = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.3px;
`;

export const RequiredField = styled.div`
  line-height: 24px;
  font-weight: 400;
  display: inline-block;
  color: #4eb7f5;
  font-size: 22px;
  margin-left: 6px;
  margin-top: -4px;
`;

export const ErrorNotification = styled.div`
  position: absolute;
  left: 93%;
  top: 2%;
`;
