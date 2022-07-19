import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import wrapper from '../store/configStore';
import Layout from '../components/Layout';
import GlobalStyle from '../styles/glovbalStyle';

import '../styles/globals.css';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }: AppProps) {
    // console.log('pageProps', pageProps);
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default wrapper.withRedux(MyApp);
