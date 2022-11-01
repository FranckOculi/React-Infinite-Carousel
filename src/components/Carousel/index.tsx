import React, { useMemo, useState } from 'react'
import './index.css'

type Data = {
	thumbnail: string
}

type RenderListProps = {
	slides: JSX.Element[]
	backSlide: () => void
	nextSlide: () => void
}

type RenderItemProps = {
	data: Data
	id: string
}

type CarouselProps = {
	/**
	 A collection of image links with minimum 5 items
	 */
	data: Data[]
}

const RenderList = ({ slides, backSlide, nextSlide }: RenderListProps) => {
	return (
		<section id='container'>
			<button className='arrows' id='arrowLeft' onClick={backSlide}>
				{'^'}
			</button>

			<div id='imageWrapper'>{slides}</div>

			<button className='arrows' id='arrowRight' onClick={nextSlide}>
				{'^'}
			</button>
		</section>
	)
}

const RenderItem = ({ data, id }: RenderItemProps) => {
	return (
		<div className='slide' id={id}>
			<img src={data.thumbnail} className={`img ${id}`} />
		</div>
	)
}

const Carousel = ({ data }: CarouselProps) => {
	const [current, setCurrent] = useState(0)
	const length = data.length

	const nextSlide = () => {
		setCurrent(current === length - 1 ? 0 : current + 1)
	}

	const backSlide = () => {
		setCurrent(current === 0 ? length - 1 : current - 1)
	}

	if (data.length >= 5) {
		const slides = useMemo(() => {
			return [
				<RenderItem
					data={
						data[
							current === 0
								? length - 2
								: current === 1
								? length - 1
								: current - 2
						]
					}
					id='prev-1'
				/>,
				<RenderItem
					data={data[current === 0 ? length - 1 : current - 1]}
					id='prev'
				/>,
				<RenderItem key={'current'} data={data[current]} id={'active'} />,
				<RenderItem
					data={data[current === length - 1 ? 0 : current + 1]}
					id='next'
				/>,
				<RenderItem
					data={
						data[
							current === length - 1
								? 1
								: current === length - 2
								? 0
								: current + 2
						]
					}
					id='next1'
				/>,
			]
		}, [current])

		return (
			<RenderList slides={slides} backSlide={backSlide} nextSlide={nextSlide} />
		)
	}

	return null
}

export default Carousel
