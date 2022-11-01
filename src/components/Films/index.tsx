import React from 'react'
import { useQuery } from '@apollo/client'

import { GET_FILMS } from '../../gql/api/filmsQueries'
import Carousel from '../Carousel'
import { Film } from '../../types/film'

const Films = () => {
	const { loading, error, data } = useQuery(GET_FILMS)

	const currentData = data?.films?.map((item: Film) => item.thumbnail)

	if (loading) return <p>Loading...</p>

	if (error || !data) return <p>Error</p>

	return <Carousel data={currentData} />
}

export default Films
