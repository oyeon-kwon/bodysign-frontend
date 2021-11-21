import type { NextPage } from 'next'
import Head from 'next/head'
import Login from './login'

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Trainers</title>
				<meta name="description" content="Generated by create next app" />
			</Head>
			<Login />
			<footer></footer>
		</div>
	)
}

export default Home
