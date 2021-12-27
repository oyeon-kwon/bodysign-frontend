import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import BottomBar from '../../../components/organisms/BottomBar'
import Layout from '../../../components/Layout'

const Menu: NextPage = () => {
	return (
		<>
			<Layout>
				<div className="flex items-center justify-between">
					<span className="flex text-[3.2rem]">
						<div className="font-bold">전체</div>
					</span>
				</div>

				<div className="mt-[2.4rem] text-[2rem]">
					<Link href="/trainer/menu/info" passHref>
						<div className="flex items-center justify-between cursor-pointer">
							<li className="text-[#9F9F9F] list-none">내 정보</li>
							<svg
								viewBox="0 0 15 15"
								className="text-[#9F9F9F]"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								width="35"
								height="35">
								<path
									d="M6.5 10.5l3-3-3-3"
									stroke="currentColor"
									strokeLinecap="square"></path>
							</svg>
						</div>
					</Link>
					<Link href="/trainer/menu/sales" passHref>
						<div className="flex items-center justify-between mt-[2.4rem] cursor-pointer">
							<li className="text-[#9F9F9F] list-none">매출 조회</li>
							<svg
								viewBox="0 0 15 15"
								className="text-[#9F9F9F]"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								width="35"
								height="35">
								<path
									d="M6.5 10.5l3-3-3-3"
									stroke="currentColor"
									strokeLinecap="square"></path>
							</svg>
						</div>
					</Link>
					<Link href="/trainer/menu/ledger" passHref>
						<div className="flex items-center justify-between mt-[2.4rem] cursor-pointer hover:bg-gray-100">
							<li className="text-[#9F9F9F] list-none">수업료 정산</li>
							<svg
								className="text-[#9F9F9F]"
								viewBox="0 0 15 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								width="35"
								height="35">
								<path
									d="M6.5 10.5l3-3-3-3"
									stroke="currentColor"
									strokeLinecap="square"></path>
							</svg>
						</div>
					</Link>
				</div>
			</Layout>
			<BottomBar variant="Trainer" />
		</>
	)
}

export default Menu
