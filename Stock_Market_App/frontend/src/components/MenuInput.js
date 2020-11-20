import React from 'react'
import {Dropdown} from 'react-bootstrap'
import MenuIcon from '@material-ui/icons/Menu';

function MenuInput() {
    const handleSelect=(e)=>{
        console.log(e)
    }
    return (
        <Dropdown className="Menu__dropdown" onSelect={handleSelect}>
            <Dropdown.Toggle variant="success" className="Menu__dropdownButton">
                <MenuIcon />
            </Dropdown.Toggle>

            <Dropdown.Menu className="Menu__dropdownItems">
                <Dropdown.Item eventKey='TODO'>TODO</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default MenuInput
