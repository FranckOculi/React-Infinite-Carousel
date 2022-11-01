import { gql } from '@apollo/client'

export const GET_FILMS = gql`
	query GetFilms {
		films {
			id
			thumbnail
		}
	}
`
