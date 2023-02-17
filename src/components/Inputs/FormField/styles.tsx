import styled from "styled-components";

export const FormFieldWrapper = styled.div`
  //margin-top: 10px;
  //margin-bottom: 10px;
`;

export const Label = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 auto;
  max-width: 100%;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: #ffffff;
  margin-top: 10px;
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

export const InputWrapper = styled.div`
  display: flex;
  position: relative;
  margin-top: 3px;
  margin-bottom: 10px;
`;

export const ErrorNotification = styled.div`
  position: absolute;
  left: 93%;
  top: 2%;
`;

export const FormWrapper = styled.div`
  padding-top: 6px;
  flex-grow: 1;
  margin: auto 0;
  flex: 0 0 100%;
  max-width: 100%;
  display: block;
`;

export const FormContainer = styled.div<{ focus: boolean; error: boolean }>`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  box-sizing: border-box;
  border-radius: 6px;
  position: relative;
  display: flex;
  border: solid 1px #c1e4fe;
  background: #fff;
  color: #162d3d;

  &:hover {
    background: #eaf7ff;
  }

  outline: ${({ focus }) => focus && 0};
  border-color: ${({ focus }) => focus && "#3899EC"};
  box-shadow: ${({ focus }) => focus && "0 0 0 3px #aadbfc"};

  border-color: ${({ error }) => (error ? "#ee5951" : "")};
  box-shadow: ${({ error }) => (error ? "0 0 0 3px #ffd7d7" : "")};
`;

export const InputContainer = styled.div`
  padding: 0 6px;
  display: flex;
  width: 100%;
`;

export const FormInput = styled.input`
  text-overflow: clip;
  padding: 5px 3px 5px 6px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: #162d3d;
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
    color: #162d3d;
    font-size: 15px;
    font-weight: 300;
  }
`;
