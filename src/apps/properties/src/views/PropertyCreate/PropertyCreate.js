import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { createInstance } from '../../store/sites'
import { notify } from '../../../../../shell/store/notifications'

import styles from './PropertyCreate.less'

class PropertyCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitted: false,
      name: ''
    }
  }
  render() {
    return (
      <section className={styles.PropertyCreate}>
        <div className={styles.nameNew}>
          <h1>Name your new instance</h1>
          <Input
            type="text"
            name="propertyName"
            placeholder="e.g. Acme Corp. Marketing Website"
            onChange={this.handleChange}
          />
          <div className={styles.controls}>
            <Button onClick={this.handleClick} disabled={this.state.submitted}>
              <i className="fa fa-plus" aria-hidden="true" />
              {this.state.submitted
                ? 'Creating Your Instance'
                : 'Create New Instance'}
            </Button>
            <Link to="/instances">
              <i className="fa fa-ban" aria-hidden="true" />
              &nbsp;Cancel
            </Link>
          </div>
        </div>
      </section>
    )
  }
  handleChange = evt => {
    this.setState({
      name: evt.target.value.trim()
    })
  }
  handleClick = () => {
    if (this.state.name) {
      this.setState({ submitted: true })
      this.props
        .dispatch(createInstance(this.state.name))
        .then(site => {
          this.setState({ submitted: false })
          this.props.history.push(`/instances/${site.ZUID}/blueprint`)
        })
        .catch(err => {
          this.setState({ submitted: false })
          this.props.dispatch(
            notify({
              message: `Failed creating instance`,
              type: 'error'
            })
          )
        })
    } else {
      this.props.dispatch(
        notify({
          message: 'You must enter a name for your instance',
          type: 'error'
        })
      )
    }
  }
}

export default connect()(PropertyCreate)
