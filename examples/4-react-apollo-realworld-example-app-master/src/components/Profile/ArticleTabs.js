import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Tab from '../Tab'
import UserArticles, { FAVORITED_ARTICLES, MY_ARTICLES } from './UserArticles'

class ArticleTabs extends Component {
  state = { tab: MY_ARTICLES }

  handleTabClick = (tab) => {
    this.setState({ tab })
  }

  render() {
    const { username } = this.props
    const { tab } = this.state

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <Tab
                  active={tab === MY_ARTICLES}
                  onClick={() => this.handleTabClick(MY_ARTICLES)}
                >
                  My Articles
                </Tab>

                <Tab
                  active={tab === FAVORITED_ARTICLES}
                  onClick={() => this.handleTabClick(FAVORITED_ARTICLES)}
                >
                  Favorited Articles
                </Tab>
              </ul>
            </div>

            <UserArticles username={username} type={tab} />
          </div>
        </div>
      </div>
    )
  }
}

ArticleTabs.propTypes = {
  username: PropTypes.string.isRequired
}

export default ArticleTabs
