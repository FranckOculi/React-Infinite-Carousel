import { Film } from '../../types/film'

type ItemProps = {
	item: Film
}

type RenderGridProps = {
	items: JSX.Element[]
}

type TableProps = {
	/**
    A collection of films
    */
	data: Film[]
}

const styles = {
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		backgroundColor: '#371d20',
		width: 1610,
	},
	item: {
		width: 390,
		padding: 5,
		marginBottom: 10,
	},
	image: { width: 390 },
	title: { margin: 0, fontSize: 16, color: 'white' },
	textWrapper: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	text: { fontSize: 14, color: 'white' },
}

const RenderItem = ({ item }: ItemProps) => {
	return (
		<div style={styles.item}>
			<img src={item.thumbnail} style={styles.image} />
			<span style={styles.title}>{item.title}</span>
			<div style={styles.textWrapper}>
				<span style={styles.text}>2019</span>
				<span style={styles.text}>{item.genre}</span>
			</div>
		</div>
	)
}

const RenderGrid = ({ items }: RenderGridProps) => {
	return <div style={styles.container}>{items}</div>
}

const Table = ({ data }: TableProps) => {
	if (data.length) {
		const items = data.map((item, index) => (
			<RenderItem key={index} item={item} />
		))
		return <RenderGrid items={items} />
	} else {
		return null
	}
}

export default Table
