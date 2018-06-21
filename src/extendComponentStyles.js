import floral from './floral'
import composeStyles from './composeStyles'

const extendComponentStyles = (Component, styles) => {
	if (!Component.isFloral) {
		throw 'You can extend only floral components.'
	}
	return floral(composeStyles(Component.styles, styles))(
		Component.innerComponent
	)
}

export default extendComponentStyles
