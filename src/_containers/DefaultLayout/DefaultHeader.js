import React from 'react';
import Aux from '../../_hoc/Aux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Navbar, Button, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';



class DefaultHeader extends React.Component {
	state = {
		dropdownOpen: false,
		isOpen: true
	}
	
	toggleDropdown(){ 
		this.setState({dropdownOpen: !this.state.dropdownOpen})
	}

  toggleOpen(){
    this.setState({isOpen: !this.state.isOpen})
	}
	
	render(){
		return(
			<Aux>
				<Navbar color="light" light className="navbar shadow-sm bg-white rounded" expand="sm">
				<Button color="info" onClick={this.props.toggle}>
					<FontAwesomeIcon icon={faBars}/>
				</Button>
				<NavbarToggler onClick={() => {this.toggleOpen()}} />
				<Collapse isOpen={this.state.isOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavItem>
						<Dropdown isOpen={this.state.dropdownOpen} toggle={() => {this.toggleDropdown()}}>
							<DropdownToggle caret>
								ADMIN
								</DropdownToggle>
							<DropdownMenu>
								<DropdownItem >Profile</DropdownItem>
								<DropdownItem divider />
								<DropdownItem onClick={this.props.logout}>Logout</DropdownItem>
							</DropdownMenu>
						</Dropdown>
						</NavItem>
				</Nav>
				</Collapse>
			</Navbar>
			</Aux>
		)
	}
}

export default DefaultHeader;
