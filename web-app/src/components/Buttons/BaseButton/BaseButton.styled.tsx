import { PRIMARY_COLOR, SECONDARY_COLOR } from '@/styles/constants';
import styled from 'styled-components';

export const BaseButtonStyled = styled.button<{
  $color: 'PRIMARY' | 'SECONDARY';
}>`
  min-width: 40px;
  height: 40px;
  padding: 8px;
  border-radius: 8px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  font-size: 12px;
  font-weight: bold;
  color: black;
  background-color: ${({ $color: color }) =>
    color === 'PRIMARY' ? PRIMARY_COLOR : SECONDARY_COLOR};
  cursor: pointer;
`;
