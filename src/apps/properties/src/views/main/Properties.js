import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./Websites.less";

import PropertiesList from "../PropertiesList";
import PropertyCreate from "../PropertyCreate";
import PropertyCreateFirst from "../PropertyCreateFirst";
import PropertyBlueprint from "../PropertyBlueprint";

class Properties extends Component {
  componentDidMount() {
    if (this.props.user && this.props.user.lastLogin === null) {
      //for first time users they are prompted to create a site
      //this is also where we need to check if they are invited
      this.props.dispatch({
        type: "NEW_MODAL",
        component: PropertyCreateFirst
      });
    }
  }
  render() {
    return (
      <section className={styles.Websites}>
        <Switch>
          <Route
            exact
            path="/properties/:zuid/blueprint"
            component={PropertyBlueprint}
          />
          <Route exact path="/properties/create" component={PropertyCreate} />
          <Route path="/properties" component={PropertiesList} />
        </Switch>
      </section>
    );
  }
}
export default connect(state => state)(Properties);
