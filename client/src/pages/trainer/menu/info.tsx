import { NextPage } from 'next'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Layout from '../../../components/Layout'
import { modalVar } from '../../../graphql/vars'
import { useReactiveVar } from '@apollo/client'

interface FormInput {
	password: string
	newPassword: string
	checkPassword: string
}

const trainerInfo: NextPage = () => {
	const [checkModal, setCheckModal] = useState('changepassword')
	const modal = useReactiveVar(modalVar)

	const member_dummy = {
		id: '1',
		email: 'jsmsumin1234@naver.com',
		name: 'Alice',
		birth: '2020.11.13',
		phone: '12345678',
		gender: 'male',
		graduate: 'false',
		time: '14:00',
		times: '8/10',
		date: '2021-11-05',
		membercategory: '바디프로필'
	}

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<FormInput>()
	const onSubmit: SubmitHandler<FormInput> = data => {
		let test = { ...data }
		// 비밀번호 변경 API
	}

	return (
		<>
			<Layout variant="Web">
				<div className="font-IBM flex flex-col justify-center mx-4 my-5 text-[12px]">
					<div className="flex items-center justify-between">
						<span className="flex text-[20px]">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="self-center w-6 h-6 cursor-pointer"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M15 19l-7-7 7-7"
								/>
							</svg>
							<div className="font-bold">
								{member_dummy.name} 회원님
							</div>
						</span>
						<span className="flex">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-1" viewBox="0 0 20 20" fill="currentColor">
							<path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
							<path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
							</svg>
						</span>
					</div>

					<div className="mt-4">
						<div className="flex flex-col justify-between px-3 py-3">
							<div className="flex justify-between">
								<span>이름</span>
								<span className="font-thin">{member_dummy.name}</span>
							</div>
							<div className="flex justify-between mt-1">
								<span>성별</span>
								<span className="font-thin">{member_dummy.gender}</span>
							</div>
							<div className="flex justify-between mt-1">
								<span>이메일</span>
								<span className="font-thin">{member_dummy.email}</span>
							</div>
							<div className="flex justify-between mt-1">
								<span>생년월일</span>
								<span className="font-thin">{member_dummy.birth}</span>
							</div>
							<div className="flex justify-between mt-1">
								<span>전화번호</span>
								<span className="font-thin">{member_dummy.phone}</span>
							</div>
						</div>
					</div>
					{/* <button
						className="p-3 mt-4 border border-blue-100"
						data-check-modal="changepassword"
						onClick={e => {
							modalVar(true)
							if (e !== null && e.target instanceof HTMLButtonElement) {
								{
									setCheckModal(e.target.dataset.checkModal as string)
								}
							}
						}}>
						비밀번호 변경
					</button>
					<button
						className="p-3 mt-4 border border-red-100"
						data-check-modal="deleteaccount"
						onClick={e => {
							modalVar(true)
							if (e !== null && e.target instanceof HTMLButtonElement) {
								{
									setCheckModal(e.target.dataset.checkModal as string)
								}
							}
						}}>
						회원탈퇴
					</button> */}
					{/* 새 여기부터 */}
					<div className="flex-col mx-5 mt-4">
					<button
						onClick={e => {
							modalVar(true)
							if (e !== null && e.target instanceof HTMLButtonElement) {
								{
									setCheckModal(e.target.dataset.checkModal as string)
								}
							}
						}}
						className="font-thin w-20 p-1 my-2 text-[10px] border float-right hover:bg-gray-50">
						비밀번호 변경
					</button>
					<div
						onClick={e => {
							modalVar(true)
							if (e !== null && e.target instanceof HTMLButtonElement) {
								{
									setCheckModal(e.target.dataset.checkModal as string)
								}
							}
						}}
						className="inline-block mt-10 text-[6px] text-red-600 hover:text-gray-400 hover:cursor-pointer">
						회원탈퇴
					</div>
					</div>
					{/* 새 여기까지 */}
				</div>

				{modal ? (
					checkModal === 'changepassword' ? (
						<div className="fixed max-w-[450px] w-full bottom-0">
							<div
								className="fixed inset-0 z-[-1] bg-black opacity-20"
								onClick={() => modalVar(false)}></div>
							<div className="bg-white flex z-[50] h-full flex-col py-10">
								<div className="py-3 text-center text-[20px]">
									비밀번호 변경
								</div>
								<form
									className="flex flex-col mt-4"
									onSubmit={handleSubmit(onSubmit)}>
									<input
										className="w-full h-12 px-10 border"
										type="text"
										placeholder="기존 비밀번호"
										{...register('password', {
											required: true
										})}
									/>
									<input
										className="w-full h-12 px-10 mt-1 border"
										type="text"
										placeholder="새 비밀번호"
										{...register('newPassword', {
											required: true,
											maxLength: 8
										})}
									/>
									{errors.newPassword?.type === 'maxLength' && (
										<div className="text-[16px] text-red-500 mt-1 text-center">
											새로운 비밀번호를 8자리 이상 입력해주세요.
										</div>
									)}
									<input
										className="w-full h-12 px-10 mt-1 border"
										type="text"
										placeholder="비밀번호 확인"
										{...register('checkPassword', {
											required: true,
											maxLength: 8
										})}
									/>

									<div className="max-w-[450px] self-end mt-4">
										<button
											className="px-4 py-3 bg-gray-100 border"
											onClick={() => modalVar(false)}>
											취소
										</button>
										<button
											className="px-4 py-3 mx-3 bg-yellow-100 border"
											type="submit">
											추가
										</button>
									</div>
								</form>
							</div>
						</div>
					) : (
						<div className="fixed max-w-[450px] w-full bottom-0">
							<div
								className="fixed inset-0 z-[-1] bg-black opacity-20"
								onClick={() => modalVar(false)}></div>
							<div className="bg-white flex z-[50] h-full flex-col py-10">
								<div className="py-3 text-center text-[20px]">
									회원탈퇴를 진행하시겠습니까?
								</div>
								<div className="max-w-[450px] self-end mt-4">
									<button
										className="px-4 py-3 bg-gray-100 border"
										onClick={() => modalVar(false)}>
										취소
									</button>
									<button
										className="px-4 py-3 mx-3 bg-red-100 border"
										onClick={() => {
											// 회원탈퇴 API
											modalVar(false)
										}}>
										확인
									</button>
								</div>
							</div>
						</div>
					)
				) : null}
			</Layout>
		</>
	)
}

export default trainerInfo
