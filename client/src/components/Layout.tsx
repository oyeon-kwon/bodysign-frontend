import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import BottomBar from './organisms/BottomBar'

interface LayoutProps {
	children: React.ReactNode
}

const hrefLists = [
	'/trainer',
	'/user',
	'/trainer/manage-member',
	'/trainer/exercise',
	'/trainer/session',
	'/user/session',
	'/user/chat',
	'/trainer/menu',
	'/user/menu'
]

const Layout = ({ children }: LayoutProps) => {
	const pathName = useRouter().pathname
	const [checkHrefPathName, setCheckHrefPathName] = useState(false)

	useEffect(() => {
		if (hrefLists.includes(pathName)) {
			setCheckHrefPathName(true)
		} else {
			setCheckHrefPathName(false)
		}
	}, [pathName])

	return (
		<>
			<div
				className={`
			${
				checkHrefPathName === true ? 'mb-[6.3rem]' : ''
			} sm-max:w-screen sm:w-screen sm:mx-auto font-IBM m-0 p-0`}>
				{children}
			</div>
			{checkHrefPathName === true ? (
				<BottomBar pathName={pathName} />
			) : null}
		</>
	)
}

export default Layout
