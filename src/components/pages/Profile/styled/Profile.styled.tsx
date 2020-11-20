import styled from 'styled-components';
import { OneLineButton, Rectangle } from '../../../elements/StyledUtils';

export const FormContainer = styled(Rectangle)`
    display: block;
    padding: 3em;
`;
export const ImgField = styled.div`
    display: flex;
    justify-content: flex-start;
    img {
        width: 5em;
        height: 5em;
        border-radius: 50%;
    }
`;

export const Circle = styled(Rectangle)``;

export const ButtonField = styled(OneLineButton)`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 1em;
`;
