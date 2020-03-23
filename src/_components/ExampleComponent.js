import React from 'react';
import Aux from '../_hoc/Aux';
import { Row, Col, Container} from 'reactstrap';

const ExampleComponent = (props) => {
	return(
		<Aux>
			<Container className="themed-container" fluid={true}>
			<Row>
        <Col>EXAMPLE COMPONENT</Col>
      </Row>
			</Container>
		</Aux>
	)
}

export default ExampleComponent;