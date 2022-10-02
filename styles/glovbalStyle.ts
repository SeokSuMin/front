import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, menu, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    main, menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
    font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, main, menu, nav, section {
        display: block;
    }
    /* HTML5 hidden-attribute fix for newer browsers */
    *[hidden] {
        display: none;
    }
    html, body {
        font-size:100%;
        height: 100%;
        /* @media screen and (max-width: 33rem) {
            font-size: 90%;
        } */
    }
    body {
        line-height: 1;
        font-family: 'Source Sans Pro', sans-serif;       
    }
    menu, ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
    content: '';
    content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    * {
        box-sizing: border;
    }
    a {
        text-decoration: none;
        color:inherit
    }
    #__next {
        display: flex;
        flex-direction: column;
        width:auto;
        min-height: 100%;
    }
    // left drawer
    .ant-drawer{
        display: flex;
        align-items: center;
    }
    .ant-drawer-header {
        text-align: center;
        padding: 1em;
    }
    .ant-drawer-content {
        border-radius: 0px 0.625em 0.625em 0px;
    }
    .ant-drawer .ant-drawer-content-wrapper {
        height: 60% !important;
        width: 9.375rem !important;
    }

    // navbar
    .ant-dropdown-menu-item {
        padding: 0px;
        div {
            padding: 5px 10px;
        }
    }
    .ant-select-selector {
        height: 1.7rem !important;
    }
    // select font size
    .ant-select-item-option-content {
        font-size: 0.750rem;
    }
    .ant-select-single .ant-select-selector {

        font-size: 0.75rem;
        align-items: center;
    }

`;

export default GlobalStyle;
