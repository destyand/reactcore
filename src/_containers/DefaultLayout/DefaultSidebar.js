import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SubMenu from './SubMenu';
import { NavItem, NavLink, Nav } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import navigation from '../../_hoc/Nav';
import Aux from '../../_hoc/Aux';



const SideBar = props => {
	let Category = null;
	const Navigation = navigation.items.map((dt, key) => {
		if (typeof dt.navigation_header !== 'undefined' && dt.navigation_header.length > 0) { 
			dt.navigation_header.map((header, index) => {
				Category = <p className="nav-title">{header.name}</p> 
			})
		} else { Category = null; }
		if(typeof dt.children !== 'undefined'){
			return (
				<Aux key={key}>
					{Category}
					<SubMenu title={dt.name} icon={dt.icon} items={dt.children}/>
				</Aux>
			)
		} else {
			return (
				<Aux key={key}>
				{Category}
				<NavItem key={key}>
					<NavLink tag={Link} activeClassName="actived" tag={RRNavLink} to={dt.url}>
						<FontAwesomeIcon icon={dt.icon} className="mr-2"/>{dt.name}
					</NavLink>
				</NavItem>
				</Aux>
			)
		}
	})	

	return (
		<div className={classNames('sidebar', {'is-open': props.isOpen})}>
			<div className="sidebar-header">
				<span color="info" onClick={props.toggle} style={{color: '#fff'}}>&times;</span>
				<h3>React Admin</h3>
			</div>
			<div className="side-menu">
				<Nav vertical className="list-unstyled pb-3">
					{Navigation}
					{/* <NavItem>
						<NavLink tag={Link} activeClassName="actived" tag={RRNavLink} to={'/home'}>
							<FontAwesomeIcon icon={faHome} className="mr-2"/>Home
						</NavLink>
					</NavItem>
					<SubMenu title="Example" icon={faBriefcase} items={submenus[0]}/> */}
				</Nav>        
			</div>
		</div>
	);
}

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