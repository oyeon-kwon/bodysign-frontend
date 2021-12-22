import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/client'
import Layout from '../components/Layout'
import Loading from './Loading'
import { gql, useQuery, useMutation, useReactiveVar } from '@apollo/client'
import { loginTypeVar, accessTokenVar } from '../graphql/vars'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import axios from 'axios'

// TODO : env로 빼야함
const GOOGLE_CLIENT_ID =
	'228447519514-17eoff0h38vfipbkd7ata2gtt7e2bbo7.apps.googleusercontent.com'

// TODO : 유저/트레이너 타입을 받아서 각각 페이지로 라우팅하기

const LOGIN = gql`
	mutation LoginAuth($loginUserInput: LoginUserInput!) {
		loginAuth(loginUserInput: $loginUserInput) {
			accessToken
			userType
		}
	}
`

const Login: NextPage = () => {
	const [form, setForm] = useState({
		email: '',
		password: ''
	})

	const [loginAuth, { data, loading, error }] = useMutation(LOGIN)
	const loginType = useReactiveVar(loginTypeVar)

	const [session, pageLoading] = useSession()

	const router = useRouter()
	if (pageLoading) {
		return <Loading />
	}

	const onChangeId = (e: any) => {
		const email = e.target.value
		setForm({
			...form,
			email: email
		})
	}

	const onChangePassword = (e: any) => {
		const password = e.target.value
		setForm({
			...form,
			password: password
		})
	}

	const onSubmit = async (e: any) => {
		//? 왜 두번 눌러야 들어오지?
		console.log(form)

		console.log(11)

		try {
			await loginAuth({
				variables: {
					loginUserInput: {
						...form
					}
				}
			})
		} catch (error) {
			console.log(error)
		}
	}
	if (!loading && data) {
		const accessToken = data.loginAuth.accessToken
		accessTokenVar(accessToken)

		const userType = data.loginAuth.userType
		if (userType === 'user') {
			router.push('localhost:3000/user')
		} else if (userType === 'trainer') {
			router.push('localhost:3000/trainer')
		}
	}

	const onGoogleLogin = () => {
		window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=https://api.bodysign.link//auth/google&response_type=token&scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&
		include_granted_scopes=true`
	}

	return (
		<>
			<Layout>
				<div className="flex flex-col mx-auto my-5 text-[15px]">
					{!session && (
						<>
							<div className="max-w-screen-md">
								<input
									className="w-4/5 p-1 m-1 font-thin border font-IBM rounded-xl"
									type="text"
									placeholder="이메일"
									onChange={onChangeId}
								/>
								<input
									className="w-4/5 p-1 m-1 font-thin border font-IBM rounded-xl"
									type="password"
									placeholder="비밀번호"
									onChange={onChangePassword}
								/>
								<button
									onClick={onSubmit}
									className="w-4/5 py-1 m-1 font-thin text-gray-800 bg-gray-300 rounded font-IBM hover:bg-gray-400 hover:text-white ">
									로그인
								</button>
								<button
									onClick={onGoogleLogin}
									className="w-4/5 py-1 m-1 font-thin text-gray-800 bg-gray-200 rounded font-IBM hover:bg-gray-400 hover:text-white ">
									GOOGLE로 로그인
								</button>
								<div className="flex w-4/5 border-0"></div>
								<Link href="/signup" passHref>
									<button className="w-4/5 py-1 m-1 font-thin text-gray-500 transition-colors duration-150 border border-gray-300 rounded font-IBM focus:shadow-outline hover:bg-gray-300 hover:text-white">
										회원가입
									</button>
								</Link>
							</div>
						</>
					)}
					{session && (
						<>
							로그인 되었습니다. <br />
							<button onClick={() => signOut()}>Sign out</button>
						</>
					)}
				</div>
			</Layout>
		</>
	)
}

export default Login
