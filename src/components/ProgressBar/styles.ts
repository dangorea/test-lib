import styled from "styled-components";

export const ContainerStyles = styled.div`
  height: 4px;
  width: 100%;
  background: rgba(22, 45, 61, 0.1);
  border-radius: 10px;
`;

export const FillerStyles = styled.div<{ completed: number }>`
  background: #308ddd;
  height: 100%;
  width: ${({ completed }) => completed}%;
  border-radius: inherit;
  text-align: right;
  position: absolute;
  transition: width 0.3s;
`;
