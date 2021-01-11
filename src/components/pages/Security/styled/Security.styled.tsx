import styled from 'styled-components';
import { OneLineButton, Rectangle } from '../../../elements/StyledUtils';

export const FormContainer = styled(Rectangle)`
    display: block;
    padding: 3em;
`;

export const AuthenBox = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    flex-direction: column;
`;

export const QrBox = styled.div`
    margin-top: 3em;
    display: flex;
    justify-content: center;
    div {
        width: max-content;
        padding: 10px;
        border: 1px solid #bbb;
    }
`;

export const ButtonField = styled(OneLineButton)`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 1em;
`;

export const ButtonEnabled = styled.div`
    button {
        color: #fff;
        background-color: #43a047;

        &:hover {
            color: #fff;
            background-color: rgb(220, 0, 78);

            .MuiButton-label {
                visibility: hidden;
            }

            .MuiButton-label:after {
                visibility: visible;
                content: 'Disable';
                display: block;
                width: 100%;
                position: absolute;
            }
        }
    }
`;
