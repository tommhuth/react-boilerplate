import { createContext, useCallback, useEffect, useState } from "react"

export function Only(props) {
    return props.if ? <>{props.children}</> : null
}

export function useResponsiveValue(defaultValue, breakpoints = {}) {
    let getValue = useCallback(() => {
        let resolved = defaultValue

        for (let [key, value] of Object.entries(breakpoints)) {
            if (window.matchMedia(`(max-width: ${key})`).matches) {
                resolved = value
            }
        }

        return resolved
    }, [defaultValue, breakpoints])
    let [responsiveValue, setResponsiveValue] = useState(() => getValue())

    useEffect(() => {
        let setValue = () => {
            setResponsiveValue(getValue())
        }
        let onResize = () => {
            clearTimeout(tid)
            tid = setTimeout(setValue, 150)
        }
        let tid

        window.addEventListener("resize", onResize)

        return () => {
            window.removeEventListener("resize", onResize)
        }
    }, [breakpoints, getValue])

    return responsiveValue
}

// Source: https://medium.com/@Heydon/managing-heading-levels-in-design-systems-18be9a746fa3
const Level = createContext(1)

export function Section({ children }) {
    return (
        <Level.Consumer>
            {level => <Level.Provider value={level + 1}>{children}</Level.Provider>}
        </Level.Consumer>
    )
}

export function Heading(props) {
    return (
        <Level.Consumer>
            {level => {
                let Component = `h${Math.min(level, 6)}`

                return <Component {...props} />
            }}
        </Level.Consumer>
    )
}