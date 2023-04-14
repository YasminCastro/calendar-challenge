import styled from "styled-components";

export const CloseButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  cursor: pointer;
  margin-bottom: 6px;
  display: flex;
  padding: 4px;
  border-radius: 50%;
`;

export const ModalBox = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 14px;
  border-radius: 6px;

  background: white;
  display: flex;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-width: 300px;
  }

  button {
    :hover {
      background-color: #e8d6d5;
    }
  }
`;

export const ModalHead = styled.div`
  display: flex;

  justify-content: space-between;

  margin-bottom: 6px;
`;
