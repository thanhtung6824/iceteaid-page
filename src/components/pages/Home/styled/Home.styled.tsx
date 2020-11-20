import styled from 'styled-components';
import { Grid } from '@material-ui/core';

export const Wrapper = styled(Grid)`
    height: 100%;
    padding: 2em 0;
`;

export const KeyContent = styled(Grid)`
    border-right: 1px solid #424242 !important;
    padding: 0 2em;
`;

export const InputField = styled.div`
    margin: 1em 0 2em;
    .icon {
        color: #878dab;
    }
`;

export const HelpContent = styled(Grid)`
    padding: 0 2em;
`;

export const HowToHelp = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    line-height: 2.2em;
`;

export const UserContent = styled.div`
    padding: 0 2em;
    width: 100%;
`;

export const SearchInput = styled(Grid)`
    margin: 1em 0 !important;
`;
