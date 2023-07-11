import 'tailwindcss/tailwind.css'; 
import Head from 'next/head';
import { AppProps } from 'next/app';
import './../styles/globals.css'
import { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';

export const metadata : Metadata = {
	title: 'Yowyob Auth',
	description: 'App for yowyob auth'
};

export default function RootLayout({ Component, pageProps: { session, ...pageProps } }: AppProps) {

	return (
		<SessionProvider  session={session}>
			<Head>
				<title>Yowyob Auth</title>
			</Head> 
			<Component {...pageProps} /> 
		</SessionProvider>
	);
}
