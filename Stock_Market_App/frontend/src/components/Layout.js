import React from 'react'
import Market from './Market'
import ChartMenu from './ChartMenu'
import ChartDisplay from './ChartDisplay'

function Layout() {
    return (
        <div className="Layout">
            <div className="Layout__left">
                <ChartMenu />
                <ChartDisplay />
            </div>
            <div className="Layout__right">
                <Market />
            </div>
        </div>
    )
}

export default Layout
