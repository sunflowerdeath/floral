import PropTypes from 'prop-types'
import Prefixer from 'inline-style-prefixer'

import mixin from './mixin'
import composeStyles from './composeStyles'

let prefixers = {}
let allNotSupportedWarnedOnce, unsuppliedUserAgentWarnedOnce, serverRenderingWarnedOnce

let StyledComponentMixin = {
	componentWillMount() {
		this.__super()
		if (!this.state) this.state = {}
		this.getStyles(this.props, this.state, this.context)
	},

	componentWillUpdate(nextProps, nextState, nextContext) {
		this.__super()
		this.getStyles(nextProps, nextState, nextContext)
	},

	getStyles(props, state, context) {
		let rootStyles = Array.isArray(props.style) ?
			props.style.map((style) => ({root: style})) :
			{root: props.style}

		let stylesFn = composeStyles(this.constructor.styles, props.styles, rootStyles)
		let styles = stylesFn(props, state, context)

		for (let elem in styles) {
			styles[elem] = this.postprocessStyle(styles[elem])
		}
		this.styles = styles
	},

	postprocessStyle(style) {
		for (let i in style) {
			let value = style[i]
			if (value && value.rgbaString) style[i] = value.rgbaString()
		}

		let autoPrefixing = this.context.styledComponentAutoPrefixing
		if (autoPrefixing === 'off') {
			return style
		} else if (autoPrefixing === 'all') {
			// FUTURE: remove warn, use Prefixer.prefixAll()
			if (!allNotSupportedWarnedOnce) {
				console.warn(
					'Floral: "all" is not supported, autoprefixing is disabled.'
				)
				allNotSupportedWarnedOnce = true
			}
			return style
		} else {
			let prefixer = this.getPrefixer()
			if (prefixer) return prefixer.prefix(style)
			else return style
		}
	},

	getPrefixer() {
		let userAgent
		if (this.context.styledComponentUserAgent !== undefined) {
			userAgent = this.context.stylesMixinUserAgent
		} else if (typeof navigator !== 'undefined') {
			userAgent = navigator.userAgent
		} else {
			// FUTURE: do not disable autoprefixing, allow auto fallback to prefixAll
			if (!serverRenderingWarnedOnce) {
				serverRenderingWarnedOnce = true
				console.warn(
					'Floral: userAgent should be supplied with UserAgentProvider' +
					'for server-side rendering, autoprefixing is disabled.'
				)
			}
			return
		}

		if (!prefixers[userAgent]) prefixers[userAgent] = new Prefixer({userAgent})
		let prefixer = prefixers[userAgent]
		// FUTURE: remove check and warn, allow auto fallback to prefixAll
		if (prefixer._browserInfo.browser === '') {
			if (!unsuppliedUserAgentWarnedOnce) {
				unsuppliedUserAgentWarnedOnce = true
				console.warn('Floral: supplied userAgent is not supported, ' +
					'autoprefixing is disabled.')
			}
			return
		} else {
			return prefixer
		}
	}
}

export default (Component) => {
	let StyledComponent = mixin(Component, StyledComponentMixin)

	let name = Component.displayName || Component.name
	StyledComponent.displayName = name ? `styled(${name})` : 'StyledComponent'

	StyledComponent.contextTypes = {
		...StyledComponent.contextTypes,
		styledComponentUserAgent: PropTypes.string,
		styledComponentAutoPrefix: PropTypes.string
	}

	return StyledComponent
}
