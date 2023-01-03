import styled from 'styled-components';
import { Button, Checkbox, Text } from 'wix-style-react';

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const SelectAllCheckbox = styled(Checkbox)`
  margin-bottom: 10px;
`;

export const SelectCount = styled(Text)`
  margin-left: 8px;
`;

export const CreateTourBtn = styled(Button)`
  margin-left: 8px;
  margin-right: 8px;
`;
