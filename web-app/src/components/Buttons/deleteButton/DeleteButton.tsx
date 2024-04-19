import { DeleteButtonStyled } from './DeleteButton.styled';

export default function DeleteButton({
  onClick = () => {},
}: {
  onClick?: () => void;
}) {
  return (
    <DeleteButtonStyled onClick={onClick}>
      <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'red' }}>
        X
      </div>
    </DeleteButtonStyled>
  );
}
