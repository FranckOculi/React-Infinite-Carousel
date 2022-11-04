import { RefObject, useRef, useState } from 'react'

export function getRefValue<T>(ref: RefObject<T>) {
	return ref.current as T
}

export function useStateRef<T>(
	initialValue: T
): [T, (arg: T) => void, RefObject<T>] {
	const ref = useRef(initialValue)
	const [state, _setState] = useState(initialValue)
	const setState = (value: T) => {
		_setState(value)
		ref.current = value
	}
	return [state, setState, ref]
}
