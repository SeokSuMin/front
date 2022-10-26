import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import wrapper from '../store/configStore';
import Layout from '../components/Layout';
import GlobalStyle from '../styles/glovbalStyle';
import { CookiesProvider } from 'react-cookie';
import '../styles/globals.css';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import 'antd/dist/antd.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Fonts } from '../styles/fonts/font';

function MyApp({ Component, pageProps }: AppProps) {
    // console.log('pageProps', pageProps);
    const queryClient = new QueryClient();
    return (
        <CookiesProvider>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={true} />
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    {/* <Fonts /> */}
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </QueryClientProvider>
        </CookiesProvider>
    );
}

export default wrapper.withRedux(MyApp);
