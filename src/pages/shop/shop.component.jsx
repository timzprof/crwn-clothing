import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionsOverviewContainer from "../../components/collections-overview/collection-overview.container";
import CollectionPageContainer from "../category/collection.container";

import { fetchCollectionsAsync } from "../../redux/shop/shop.actions";

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollections } = this.props;
    fetchCollections();
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  fetchCollections: () => dispatch(fetchCollectionsAsync()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
