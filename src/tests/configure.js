import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  applyMiddleware,
  combineReducers,
  createStore
} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import { createData, watchDataActions } from 'redux-saga-data'

export function configureTestStore() {

  const sagaMiddleware = createSagaMiddleware()
  const storeEnhancer = applyMiddleware(sagaMiddleware)

  function* rootSaga() {
    yield all([
      watchDataActions({
        url: 'http://foo.com',
      }),
    ])
  }

  const rootReducer = combineReducers({
    data: createData({ users: [] }),
  })

  const store = createStore(rootReducer, storeEnhancer)

  sagaMiddleware.run(rootSaga)

  return store
}

export function configureFetchDataWithLoginFail () {
  fetch.mockResponse(JSON.stringify(
    [{ global: ['Nobody is authenticated here'] }],
  ), { status: 400 })
}

export function configureFetchDataWithLoginSuccess () {
  fetch.mockResponse(JSON.stringify(
    { email: 'michel.marx@youpi.fr' }
  ), { status: 200 })
}

export class Test extends Component {
  componentDidMount () {
    const { onMountCallback } = this.props
    onMountCallback()
  }

  render () {
    return null
  }
}

Test.defaultProps = {
  onMountCallback: () => {}
}

Test.propTypes = {
  onMountCallback: PropTypes.func
}

export default configureTestStore
