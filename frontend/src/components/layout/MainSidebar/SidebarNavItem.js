import React from "react";
import PropTypes from "prop-types";
import { NavItem } from "shards-react";
import {  FETCH_TWEET_DATA_CATEGORY_WISE, FETCH_TWEET_DATA, SET_CATEGORY } from "../../../Actions/Actions";
import { connect } from 'react-redux';


class SidebarNavItem extends React.Component {
 
  fetchTweetsCategoryWise(item) {
    this.props.setCategory(item);
    if(item === 'DASHBOARD'){
      this.props.fetchTweets(1);
    } else{
      this.props.fetchTweetsCategoryWise(item,1);
    }
  }
  render() {
    return (
      <NavItem>
        <div className="nav-link"  onClick={()=>{this.fetchTweetsCategoryWise(this.props.item)}}>
          <div
            className="d-inline-block item-icon-wrapper"
            dangerouslySetInnerHTML={{ __html: 
              this.props.item === 'DASHBOARD'?
              '<i class="material-icons">dashboard</i>':
              '<i class="material-icons">chevron_right</i>' }}
          /><span>{this.props.item}</span>
        </div>
      </NavItem>
    )
  }
}




SidebarNavItem.propTypes = {
  /**
   * The item string.
   */
  item: PropTypes.string
};
export const mapStateToProps = (state) => {
  console.log(state, 'state')
  return {
    reducer: state
  }
}


export const mapDispatchToProps = (dispatch) => {
  return {
    fetchTweetsCategoryWise: (category,page) => {
      console.log('fetchTweetsCategoryWise')
      dispatch({
        type: FETCH_TWEET_DATA_CATEGORY_WISE,
        category,
        page
      })
    },
    fetchTweets: (page) => {
      console.log('fetchTweets')
      dispatch({
        type: FETCH_TWEET_DATA,
        page
      })
    },
    setCategory: (category)=>{
      dispatch({
        type: SET_CATEGORY,
        category
      })
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarNavItem);
