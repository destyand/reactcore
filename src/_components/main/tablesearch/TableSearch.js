import React from 'react';
import { FormGroup, CustomInput, Input } from 'reactstrap';
import { Row, Col } from "reactstrap";
import Aux from '../../../_hoc/Aux';

const TableSearch = props => {
		let lengthPage = [5, 10, 20, 50, 100];
    if(props.lengthPage) {
        lengthPage = props.lengthPage;
		}
		const options = lengthPage.map((data, i) => (<option key={i} value={data}>{data}</option>));
    return(
        <Aux>
            <Row>
                <Col sm="1">
									<div className="left">
										<FormGroup>
											<CustomInput type="select" id="perPageSelect" name="perPageSelect" value={props.perPage} onChange={(e) => props.change(e.target.value)}>
												{options}
											</CustomInput>
										</FormGroup>
									</div>
                </Col>
								<Col sm="7"></Col>
                <Col sm="4">
										<FormGroup>
											<Input type="text" placeholder="Search" value={props.searchVal} onChange={(e) => props.search(e.target.value)} />
										</FormGroup>
                </Col>
            </Row>
        </Aux>
    );
}

export default TableSearch;
