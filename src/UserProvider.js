import React, { Component, createContext } from "react";
import { db, auth } from './index.js';

export const UserContext = React.createContext({user: null});

class UserProvider extends Component {
    state = {
        user: null
    };

    userUpdate = async (user) => {
        this.setState({user: user});
    }

    componentDidMount = () => {
        this._isMounted = true;
        auth.onAuthStateChanged(userAuth => {
            this._isMounted && this.userUpdate(userAuth);
        })
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }



    render() {
        return(
            <UserContext.Provider value={{user:this.state.user}}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export default UserProvider;