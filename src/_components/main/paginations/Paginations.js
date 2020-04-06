import React from 'react';
import {Pagination, Row, Col} from 'react-bootstrap';
import Aux from '../../../_hoc/Aux';

const Paginations = props => {
    
    let renderPageNumbers;
    const pageNumbers = [];

    if (props.optionPaginate.total !== null || props.optionPaginate.total > 0) {
        for (let i = 1; i <= Math.ceil(props.optionPaginate.total / props.optionPaginate.per_page); i++) {
            pageNumbers.push(i);
        }


        renderPageNumbers = pageNumbers.map(number => {
            if (number === 1 || number === props.optionPaginate.total || (number >= props.optionPaginate.current_page - 2 && number <= props.optionPaginate.current_page + 2)) {
                return (
                    <Pagination.Item key={number} onClick={() => props.fetch(number, props.optionPaginate.per_page)} active={props.optionPaginate.current_page === number}>{number}</Pagination.Item>
                );
            }
            return null;
        });
    }

    return (
        <Aux>
            <Row>
                <Col lg="6">
                    <p className="text-muted table-label">
                        Showing {props.optionPaginate.from} to {props.optionPaginate.to} of {props.optionPaginate.total} entries
                    </p>
                </Col>
                <Col lg="6">
                    <div className="pagination-right custom">
                        <Pagination>
                            <Pagination.Item onClick={() => props.fetch(1, props.optionPaginate.per_page)}>&laquo;</Pagination.Item>
                            {renderPageNumbers}
                            <Pagination.Item onClick={() => props.fetch(props.optionPaginate.last_page, props.optionPaginate.per_page)}>&raquo;</Pagination.Item>
                        </Pagination>
                    </div>
                </Col>
            </Row>
        </Aux>
    );
}

export default Paginations;