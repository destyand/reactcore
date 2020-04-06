
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import TableSearch from '../tablesearch/TableSearch';
import './Table.css';

class Table extends Component {
  constructor(props) {
    super(props);
		this._isMounted = false;

    this.state = {
      first_page: 1,
      current_page: 1,
      sorted_column: this.props.columns[0],
      columns: this.props.columns,
      offset: 4,
			order: 'asc',
			loading: false,
			lengthPage: [5, 10, 20, 50, 100],
			perPage: this.props.routes.meta.per_page,
			keyword: this.props.search
    };
	}

  fetchEntities = async () => {
		if(this._isMounted){
			// console.log(this.props.actions);
			this._isMounted && this.setState({loading: true})
			this.props.fetchRoute(this.state.current_page, this.state.sorted_column, this.state.order, this.state.perPage, this.state.keyword);
		}
	}
	
	changeLengthPage(value) {
    this.setState({ perPage: value, current_page: 1 }, () => {this.fetchEntities()});
	}

	handleSearch(value) {
    this.setState({ keyword: value, current_page: 1 }, () => {this.fetchEntities()});
	}

  changePage(pageNumber) {
    this.setState({ current_page: pageNumber }, () => {this.fetchEntities()});
  }

  columnHead(value) {
    return value.split('_').join(' ').toUpperCase()
  }

  pagesNumbers() {
    if (!this.props.routes.meta.to) {
      return [];
    }
    let from = this.props.routes.meta.current_page - this.state.offset;
    if (from < 1) {
      from = 1;
    }
    let to = from + (this.state.offset * 2);
    if (to >= this.props.routes.meta.last_page) {
      to = this.props.routes.meta.last_page;
    }
    let pagesArray = [];
    for (let page = from; page <= to; page++) {
      pagesArray.push(page);
    }
    return pagesArray;
  }

  componentDidMount() {
		this._isMounted = true;
		// console.log(this.state.columns)
    this.setState({ current_page: this.props.routes.meta.current_page }, () => { this.fetchEntities() });
	}
	
	componentDidUpdate(){
		
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

  tableHeads() {
		let icon;
		if (this.state.order === 'asc') {
			icon = <i className="fa fa-arrow-up"></i>;
		} else {
			icon = <i className="fa fa-arrow-down"></i>;
		}
		return this.props.columns.map(column => {
			return <th className="table-head" key={column} onClick={() => this.sortByColumn(column)}>
								{ this.columnHead(column) }
								{ column === this.state.sorted_column && icon }
							</th>
		});
  }

  dataList() {
    if (this.props.routes.data.length) {
      let edit;
      let del;
      return this.props.routes.data.map(data => {
				if(this.props.actionEdit) {
					edit = <Button color="info" onClick={(e) => this.props.edit(data.id)} size="sm"><i className="fa fa-pencil-square-o"></i> EDIT</Button>
				}
				if(this.props.actionDelete){
					del = <Button color="danger" onClick={(e) => this.props.remove(data.id)} size="sm"><i className="fa fa-trash-o"></i> REMOVE</Button>
				}
        return <tr key={ data.id }>
                {Object.keys(data).map(key => <td key={key}>{ data[key] }</td>)}
                {(this.props.actions) ? <td> {edit} {del} </td> : null }
               </tr>
      })
    } else {
      return <tr>
                <td colSpan={this.props.columns.length} className="text-center">No Records Found.</td>
						 </tr>
    }
  }

  sortByColumn(column) {
    if (column === this.state.sorted_column) {
      this.state.order === 'asc' ? this.setState({ order: 'desc', current_page: this.state.first_page }, () => {this.fetchEntities()}) : this.setState({ order: 'asc' }, () => {this.fetchEntities()});
    } else {
      this.setState({ sorted_column: column, order: 'asc', current_page: this.state.first_page }, () => {this.fetchEntities()});
    }
  }

  pageList() {
    return this.pagesNumbers().map(page => {
      return <li className={ page === this.props.routes.meta.current_page ? 'page-item active' : 'page-item' } key={page}>
        <button className="page-link" onClick={() => this.changePage(page)}>{page}</button>
      </li>
    })
  }

  render() {
    return (
      <div className="table-responsive ">
				<TableSearch
					lengthPage={this.state.lengthPage}
					perPage={this.state.perPage}
					searchVal={this.state.keyword}
					change={(value) => this.changeLengthPage(value)}
					search={(value) => this.handleSearch(value)}
				/>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>{ this.tableHeads() }</tr>
          </thead>
          <tbody>{ this.dataList() }</tbody>
        </table>
        { (this.props.routes.data && this.props.routes.data.length > 0) &&
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <Button className="page-link"
                  disabled={ 1 === this.props.routes.meta.current_page }
                  onClick={() => this.changePage(this.props.routes.meta.current_page - 1)}
                >
                  Previous
                </Button>
              </li>
              { this.pageList() }
              <li className="page-item">
                <Button className="page-link"
                  disabled={this.props.routes.meta.last_page === this.props.routes.meta.current_page}
                  onClick={() => this.changePage(this.props.routes.meta.current_page + 1)}
                >
                  Next
                </Button>
              </li>
              <span style={{ marginTop: '8px' }}> &nbsp; <i>Showing { this.props.routes.data.length } of { this.props.routes.meta.total } entries.</i></span>
            </ul>
          </nav>
        }
      </div>
    );
  }
}

export default Table;