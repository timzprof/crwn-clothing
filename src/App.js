import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';

import "./App.css";

import Header from "./components/header/header.component";

import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import AuthPage from "./pages/auth/auth.component";
import CheckoutPage from './pages/checkout/checkout.component';

import {auth, createUserProfileDocument} from "./firebase/firebase.util";

import {setCurrentUser} from "./redux/user/user.actions";
import {selectCurrentUser} from './redux/user/user.selectors';

class App extends React.Component {
	unsuscribeFromAuth = null;

	componentDidMount() {
		const {setCurrentUser} = this.props;
		this.unsuscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);
				userRef.onSnapshot((snapshot) => {
					setCurrentUser({
						currentUser: {
							id: snapshot.id,
							...snapshot.data(),
						},
					});
				});
			}
			setCurrentUser(userAuth);
		});
	}

	componentWillUnmount() {
		this.unsuscribeFromAuth();
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

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
