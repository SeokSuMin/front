import Head from 'next/head';

interface ITitle {
    title: string;
}

const Seo = ({ title }: ITitle) => {
    const message = `${title} | Next Movies`;
    return (
        <Head>
            <title>{message}</title>
        </Head>
    );
};

export default Seo;
