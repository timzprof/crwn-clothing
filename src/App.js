import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";

import Header from "./components/header/header.component";

import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import AuthPage from "./pages/auth/auth.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import { checkUserSession } from "./redux/user/user.actions";

class App extends React.Component {
  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <AuthPage />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(null, mapDispatchToProps)(App);
