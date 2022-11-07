import React from 'react'
import { useQuery } from '@apollo/client'

import { GET_FILMS } from '../../gql/api/filmsQueries'
import Carousel from '../Carousel'
import Swiper from '../Swiper'
import { Film } from '../../types/film'
import Table from '../Table'

const Films = () => {
	const { loading, error, data } = useQuery(GET_FILMS)

	const currentData = data?.films.map((film: Film) => {
		return {
			thumbnail: film.thumbnail,
		}
	})

	if (loading) return <p>Loading...</p>

	if (error || !data) return <p>Error</p>

	return (
		<div>
			<Carousel data={currentData} />
			<Swiper data={currentData} />
			<Table data={data?.films} />
		</div>
	)
}

export default Films
