import React, { Component } from "react";
import {connect} from 'react-redux';
import {fetchRoute} from '../../../_store/actions/routeActions';
import Table from "../../main/table/Table";
import Skeleton from 'react-loading-skeleton';
import ModalConfirm from '../../main/modal/confirm/ModalConfirm';


class ReactDatatable extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
  }
  state = {
    loading: false,
    entities: {
      data: [],
      meta: {
        current_page: 1,
        from: 1,
        last_page: 1,
        per_page: 5,
        to: 1,
        total: 1,
      },
    },
    first_page: 1,
    order_by: 'id',
    order_by_type: 'asc',
    toggle: false,
    modalConfirm: {
      title: 'Delete',
      label: 'Are You Sure Want Remove This Items ?',
    },
    isConfirm: false,
    id: null,
    keyword: '',
  }

  componentDidMount() {
    this._isMounted = true;
    this.asyncRoute()
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  
  asyncRoute = async () => {
    if(this._isMounted){
      this._isMounted && this.setState({loading: true})
      // this.setState({keyword: this.props.search.keyword})
      this.setState({keyword: this.props.search});

      this.props.fetchRoute(this.state.first_page, this.state.order_by, this.state.order_by_type, this.state.entities.meta.per_page, this.state.keyword)
      .then(() => this._isMounted && this.setState({loading: false}))
      .catch(()=> this._isMounted && this.setState({loading: false}));
    }
  }

  handleEdit = async (id) => {
    console.log(id)
  }

  handleRemove = async(id) => {
    console.log(id)
    if(this._isMounted){
      this.setState({ isConfirm: true, id: id })
    }
  }

  delConfirm(){
    console.log("HAHAHAA : "+this.state.id);
  }

  toggle(){
    this.setState({ isConfirm: false })
  }

  render() {
    const columns = ['id', 'method', 'url', 'route', 'guard', 'type', 'middleware', 'permission', 'action'];
    let {routes} = this.props;
    let {search} = this.props;
    // console.log(search);
    let rows;
    if(typeof routes.data !== 'undefined'){
      rows = <Table 
              routes={routes}
              fetchRoute={this.props.fetchRoute}
              columns={columns} 
              actions={true} 
              actionEdit={true} 
              actionDelete={true}
              edit={this.handleEdit}
              remove={this.handleRemove}
              search={search}
              />
    } else {
      rows = <Skeleton height={20} count={10}/>
    }

    return (
      <div>
        {rows}
        <ModalConfirm
          toggle={() => this.toggle()}
          modalConfirm={this.state.modalConfirm}
          open={this.state.isConfirm}
          id={this.state.id}
          ifConfirm={() => this.delConfirm()}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    routes: state.routeMaster.routes,
    response: state.routeMaster.response,
    search: state.routeMaster.search
  }
}

const dispatchToProps = dispatch => {
  return {
    fetchRoute: (current_page, sorted_column, order, per_page, keyword) => dispatch(fetchRoute(current_page, sorted_column, order, per_page, keyword))
  }
}

export default connect(mapStateToProps, dispatchToProps)(ReactDatatable);