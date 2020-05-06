import React from "react";
import {Route, Switch} from "react-router-dom";

import "./App.css";

import Header from "./components/header/header.component";

import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import AuthPage from "./pages/auth/auth.component";

import {auth} from "./firebase/firebase.util";

class App extends React.Component {
	state = {
		currentUser: null
	}

	unsuscribeFromAuth = null;

	componentDidMount() {
		this.unsuscribeFromAuth = auth.onAuthStateChanged(user => {
			this.setState({ currentUser: user});
		});
	}

	componentWillUnmount(){
		this.unsuscribeFromAuth();
	}

	render() {
		return (
			<div>
				<Header currentUser={this.state.currentUser} />
				<Switch>
					<Route exact path="/" component={Homepage} />
					<Route path="/shop" component={ShopPage} />
					<Route path="/signin" component={AuthPage} />
				</Switch>
			</div>
		);
	}
}

export default App;
