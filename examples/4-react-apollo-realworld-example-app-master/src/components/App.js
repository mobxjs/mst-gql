import React, { Fragment } from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import apolloClient from '../apolloClient'
import Article from './Article'
import EditArticle from './EditArticle'
import Home from './Home'
import Login from './Login'
import NewArticle from './NewArticle'
import Profile from './Profile'
import Register from './Register'
import Settings from './Settings'

const App = () => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/article/:slug" component={Article} />
          <Route exact path="/editor" component={NewArticle} />
          <Route path="/editor/:slug" component={EditArticle} />
          <Route path="/settings" component={Settings} />
          <Route path="/profile/:username" component={Profile} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  </ApolloProvider>
)

export default App
