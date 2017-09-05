import flatten from 'lodash.flatten'

/**
 * Composes `styles` props for each element.
 * If styles uses functions, they are combined
 * to single function that returns merged results.
 */
export default function composeStyles(...stylesList) {
	return function(props, state, context) {
		let composed = {}
		let flatStylesList = flatten(stylesList)
		for (let i in flatStylesList) {
			let styles = flatStylesList[i]
			let result = typeof styles === 'function' ? styles(props, state, context) : styles
			for (let elem in result) {
				if (composed[elem] === undefined) composed[elem] = {}
				Object.assign(composed[elem], result[elem])
			}
		}
		return composed
	}
}
