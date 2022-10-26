import { createGlobalStyle } from 'styled-components';
import NanumSquareRoundEB from './NanumSquareRoundEB.ttf';

export const Fonts = createGlobalStyle`
    @font-face {
        font-family: 'NanumSquareRoundEB';
        src: url(${NanumSquareRoundEB}) format('truetype');
    }
`;
