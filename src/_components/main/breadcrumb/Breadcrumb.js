import React from "react";
import { Link } from "react-router-dom";
import Aux from '../../../_hoc/Aux';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const Breadcrumbs = ({ crumbs }) => {
  if (crumbs.length <= 1) {
    return null;
	}

  return (
    <Aux>
				{crumbs.map(({ name, path, parent }, key) =>
				{
					if(key + 1 === crumbs.length){
						return (
							<Breadcrumb tag="nav" listTag="div" key={key}> 
								<BreadcrumbItem >{parent}</BreadcrumbItem>
								<BreadcrumbItem tag={Link} to={path} active>
									{name}
								</BreadcrumbItem>
      				</Breadcrumb>
						)
					} 
				}
				)}
    </Aux>
  );
};
export default Breadcrumbs;