import composeStyles from './composeStyles'

const prefixers = {}
let unsupportedUserAgentWarnedOnce, serverRenderingWarnedOnce

const DEFAULT_OPTIONS = {
	pefixingEnabled: true,
	userAgent: typeof navigator !== 'undefined' && navigator.userAgent
}

const getPrefixer = userAgent => {
	if (!userAgent) {
		if (!serverRenderingWarnedOnce) {
			serverRenderingWarnedOnce = true
			// FIXME warn only in browser?
			console.warn(
				'Floral: userAgent is not defined, prefixing is disabled.\n' +
					'You can set userAgent for server-rendering using ' +
					'<FloralContext.Provider>'
			)
		}
		return
	}
	if (!prefixers[userAgent]) {
		prefixers[userAgent] = new Prefixer({ userAgent })
	}
	const prefixer = prefixers[userAgent]
	if (prefixer._browserInfo.browser === '') {
		// FIXME warn only in browser?
		if (!unsupportedUserAgentWarnedOnce) {
			unsupportedUserAgentWarnedOnce = true
			console.warn(
				'Floral: userAgent is not supported, autoprefixing is disabled.'
			)
			console.warn(userAgent)
		}
		return
	} else {
		return prefixer
	}
}

const computeStyles = ({ styles, options, props, state }) => {
	options = { ...DEFAULT_OPTIONS, ...options }
	const rootStyles = Array.isArray(props.style)
		? props.style.map(style => ({ root: style }))
		: { root: props.style }
	const stylesFn = composeStyles(styles, props.styles, rootStyles)
	const computedStyles = styles = stylesFn(props, state)
	/* for (let i in style) {
		const value = style[i]
		if (value && value.rgbaString) style[i] = value.rgbaString()
	} */
	if (options.prefixingEnabled) {
		const prefixer = getPrefixer(options.userAgent)
		if (prefixer) {
			for (let elem in styles) {
				computedStyles[elem] = prefixer.prefix(styles[elem])
			}
		}
	}
	return computedStyles
}

export default computeStyles
