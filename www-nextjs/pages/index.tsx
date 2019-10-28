import React from "react";
import { NextPage, NextPageContext } from "next";
import Head from "next/head";

type Props = {
    test: string | string[];
};

const Home: NextPage<Props> = ({ test }) => (
    <div>
        <Head>
            <title>Home</title>
        </Head>

        <div>Hello, {test}!</div>
    </div>
);

Home.getInitialProps = async (context: NextPageContext) => {
    const { test } = context.query;
    return { test };
};

export default Home;