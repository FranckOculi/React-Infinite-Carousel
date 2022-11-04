import React, { useRef, useState } from 'react'
import { getTouchEventData } from '../../lib/dom'
import { getRefValue, useStateRef } from '../../lib/hooks'
import './index.css'

type Data = {
	thumbnail: string
}

type SwiperItemProps = {
	index: number
	image: string
	alt?: string
}

type SwiperProps = {
	/**
	 A collection of image links
	 */
	data: Data[]
}

const MIN_SWIPE_REQUIRED = 40

const SwiperItem = ({ index, image, alt }: SwiperItemProps) => {
	return (
		<li className='list'>
			<img
				src={image}
				className='image'
				alt={alt ? alt : `image ${index}`}
				draggable={false}
			/>
		</li>
	)
}

const Swiper = ({ data }: SwiperProps) => {
	const containerRef = useRef<HTMLUListElement>(null)
	const containerWidthRef = useRef(0)
	const minOffsetXRef = useRef(0)
	const currentOffSetXRef = useRef(0)
	const startXRef = useRef(0)

	const [isSwiping, setIsSwiping] = useState(false)
	const [offSetX, setOffsetX, offSetXRef] = useStateRef(0)
	const [currentIndex, setCurrentIndex] = useState(0)

	const onTouchMove = (e: TouchEvent | MouseEvent) => {
		const currentX = getTouchEventData(e).clientX
		const diff = getRefValue(startXRef) - currentX
		let newOffsetX = getRefValue(currentOffSetXRef) - diff
		const maxOffsetX = 0
		const minOffsetX = getRefValue(minOffsetXRef)

		if (newOffsetX > maxOffsetX) {
			newOffsetX = 0
		}

		if (newOffsetX < minOffsetX) {
			newOffsetX = minOffsetX
		}

		setOffsetX(newOffsetX)
	}
	const onTouchEnd = (e: TouchEvent | MouseEvent) => {
		const containerWidth = getRefValue(containerWidthRef)
		const currentOffSetX = getRefValue(currentOffSetXRef)
		let newOffsetX = getRefValue(offSetXRef)

		const diff = currentOffSetX - newOffsetX

		if (Math.abs(diff) > MIN_SWIPE_REQUIRED) {
			if (diff > 0) {
				newOffsetX = Math.floor(newOffsetX / containerWidth) * containerWidth
			} else {
				newOffsetX = Math.ceil(newOffsetX / containerWidth) * containerWidth
			}
		} else {
			newOffsetX = Math.round(newOffsetX / containerWidth) * containerWidth
		}

		setIsSwiping(false)
		setOffsetX(newOffsetX)
		setCurrentIndex(Math.abs(newOffsetX / containerWidth))

		window.removeEventListener('touchmove', onTouchMove)
		window.removeEventListener('touchend', onTouchEnd)
		window.removeEventListener('mousemove', onTouchMove)
		window.removeEventListener('mouseup', onTouchEnd)
	}

	const onTouchStart = (
		e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
	) => {
		setIsSwiping(true)
		currentOffSetXRef.current = getRefValue(offSetXRef)
		startXRef.current = getTouchEventData(e).clientX

		const containerEl = getRefValue(containerRef)
		const containerWidth = containerEl.offsetWidth

		containerWidthRef.current = containerEl.offsetWidth
		minOffsetXRef.current = containerWidth - containerEl.scrollWidth

		window.addEventListener('touchmove', onTouchMove)
		window.addEventListener('touchend', onTouchEnd)
		window.addEventListener('mousemove', onTouchMove)
		window.addEventListener('mouseup', onTouchEnd)
	}

	const currentData = data.map((item, index) => (
		<SwiperItem key={index} index={index} image={item.thumbnail} />
	))

	const indexIndicator = data.map((item, index) => (
		<li
			key={index}
			className={`swiper-indicator ${index === currentIndex ? 'active' : ''}`}
			onClick={() => indicatorOnClick(index)}
		/>
	))

	const indicatorOnClick = (index: number) => {
		const containerEl = getRefValue(containerRef)
		const containerWidth = containerEl.offsetWidth

		setCurrentIndex(index)
		setOffsetX(-(containerWidth * index))
	}

	return (
		<div
			className='swiper-container'
			onTouchStart={onTouchStart}
			onMouseDown={onTouchStart}
		>
			<ul
				className={`swiper-list ${isSwiping ? 'swiping' : ''}`}
				style={{ transform: `translate3d(${offSetX}px, 0, 0)` }}
				ref={containerRef}
			>
				{currentData}
			</ul>
			<ul className='indicator-container'>{indexIndicator}</ul>
		</div>
	)
}

export default Swiper
