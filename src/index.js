import React, { useMemo, forwardRef } from 'react'
import flattenDeep from 'lodash.flattendeep'
import compact from 'lodash.compact'

const composeStyles = (...stylesList) => (...deps) => {
    let composed = {}
    let flatStylesList = compact(flattenDeep(stylesList))
    for (let i in flatStylesList) {
        let styles = flatStylesList[i]
        let result = typeof styles === 'function' ? styles(...deps) : styles
        for (let elem in result) {
            if (composed[elem] === undefined) composed[elem] = {}
            Object.assign(composed[elem], result[elem])
        }
    }
    return composed
}

const extendComponentStyles = (Component, styles) =>
    forwardRef((props, ref) => (
        <Component
            {...props}
            ref={ref}
            styles={'styles' in props ? [styles, props.styles] : styles}
        />
    ))

const useStyles = (styles, [props, ...restDeps]) => {
    let stylesFn = useMemo(() => {
        let items = [styles, props.styles]
        if ('style' in props) items.push({ root: props.style })
        return composeStyles(items)
    }, [styles, props.styles, props.style])
    return useMemo(() => stylesFn(props, ...restDeps), [props, ...restDeps])
}

export { composeStyles, extendComponentStyles, useStyles }
