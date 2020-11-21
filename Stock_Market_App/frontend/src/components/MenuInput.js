import React from 'react'
import {Dropdown} from 'react-bootstrap'
import MenuIcon from '@material-ui/icons/Menu';

function MenuInput() {
    return (
        <Dropdown className="Menu__dropdown">
            <Dropdown.Toggle variant="success" className="Menu__dropdownButton Menu__menu">
                <MenuIcon />
            </Dropdown.Toggle>

            <Dropdown.Menu className="Menu__dropdownItems">
                <Dropdown.Item href="/">Chart</Dropdown.Item>
                <Dropdown.Item href="/fundament">Fundament</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default MenuInput
