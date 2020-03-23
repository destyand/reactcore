import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import SubMenu from './SubMenu';
import { NavItem, NavLink, Nav } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import classNames from 'classnames';
import {Link} from 'react-router-dom';


const SideBar = props => (
	<div className={classNames('sidebar', {'is-open': props.isOpen})}>
		<div className="sidebar-header">
			<span color="info" onClick={props.toggle} style={{color: '#fff'}}>&times;</span>
			<h3>React Admin</h3>
		</div>
		<div className="side-menu">
			<Nav vertical className="list-unstyled pb-3">
				<p>Dummy Heading</p>
				<NavItem>
					<NavLink tag={Link} activeClassName="actived" tag={RRNavLink} to={'/home'}>
						<FontAwesomeIcon icon={faHome} className="mr-2"/>Home
					</NavLink>
				</NavItem>
				<SubMenu title="Example" icon={faBriefcase} items={submenus[0]}/>
			</Nav>        
		</div>
	</div>
  );

  const submenus = [
    [
      {
        title: "Example 1",
        target: "example1"
      },
      {
        title: "Example 2",
        target: "example2",        
      },
    ],
  ]
  

export default SideBar;