import React from "react"

export function Only(props) {
    return props.if ? <>{props.children}</> : null
}

// Source: https://medium.com/@Heydon/managing-heading-levels-in-design-systems-18be9a746fa3
const Level = React.createContext(1)

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