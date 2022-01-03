import { useQuery, useReactiveVar } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import Loading from '../../../components/Loading'
import { UserDocument } from '../../../graphql/graphql'
import {
	sessionExerciseInputVar,
	userDataVar
} from '../../../graphql/vars'

interface MemberSession {
	id: number
	date: string
}

const Session: NextPage = () => {
	const router = useRouter()
	const userData = useReactiveVar(userDataVar)
	const sessionExerciseInput = useReactiveVar(sessionExerciseInputVar)
	const { loading, data } = useQuery(UserDocument, {
		variables: { id: userData?.id }
	})

	const week = ['일', '월', '화', '수', '목', '금', '토']

	const sessionObject: Record<string, MemberSession[]> = {}
	const completedSessionObject: Record<string, MemberSession[]> = {}
	if (!loading && data) {
		let $Data = [...data.user.sessions]
		$Data
			.sort((a, b) => {
				const aDate = new Date(a.date).getTime()
				const bDate = new Date(b.date).getTime()
				return aDate > bDate ? -1 : 1
			})
			.forEach(session => {
				const date = session.date.split('T')[0]
				if (session.completedSession) {
					if (completedSessionObject[date] === undefined) {
						completedSessionObject[date] = []
					}
					completedSessionObject[date].push({
						id: session.id,
						date: session.date
					})
				} else {
					if (sessionObject[date] === undefined) {
						sessionObject[date] = []
					}
					sessionObject[date].push({
						id: session.id,
						date: session.date
					})
				}
			})
	}

	if (loading) return <Loading />
	return (
		<>
			<div className="flex items-center justify-between">
				<span className="flex text-[3.2rem]">
					<div className="font-bold">수업기록</div>
				</span>
			</div>

			{Object.entries(sessionObject).map((entry, idx) => {
				const date = entry[0].split('-')
				return (
					<React.Fragment key={idx}>
						<div className="mt-[2.4rem]">
							<div className="text-[1.8rem] font-semibold">
								{`${date[0]}.${date[1]}`}
							</div>
							{entry[1].map(session => {
								const date = new Date(session.date)
								let hours = date.getHours() + ''
								if (hours.length === 1) {
									hours = 0 + hours
								}
								let minutes = date.getMinutes() + ''
								if (minutes.length === 1) {
									minutes = 0 + minutes
								}
								return (
									<React.Fragment key={session.id}>
										<div
											className={`h-[7rem] flex justify-around items-center px-[2rem] mt-[0.8rem] border text-[1.8rem] rounded-full shadow-md bg-white	`}
											onClick={e => {
												if (
													e !== null &&
													e.target instanceof HTMLElement
												) {
													sessionExerciseInputVar({
														...sessionExerciseInput,
														sessionId: session.id
													})
													router.push(
														`/user/session/${session.date.split('T')[0]}`
													)
												}
											}}>
											<span>
												{session.date.split('T')[0].replace(/\-/g, '.')} (
												{week[new Date(session.date).getDay()]})
											</span>
											<span>{`${hours}:${
												minutes === '0' ? '00' : minutes
											}`}</span>
										</div>
									</React.Fragment>
								)
							})}
						</div>
					</React.Fragment>
				)
			})}
		</>
	)
}

export default Session
