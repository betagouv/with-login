# with-login

React hoc component for rendering page only on user log success. It uses redux-saga-data as implicit helper.

## Basic Usage
You need to add first the data reducer in your root reducer:

You need to install a redux-saga setup with the watchDataActions and the data reducer,
don't forget to specify the url of your api here:

```javascript
import {
  applyMiddleware,
  combineReducers,
  createStore
} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import { createData, watchDataActions } from 'redux-saga-data'

const sagaMiddleware = createSagaMiddleware()
const storeEnhancer = applyMiddleware(sagaMiddleware)

function* rootSaga() {
  yield all([
    watchDataActions({
      rootUrl: "https://myfoo.com",
    }),
  ])
}

const rootReducer = combineReducers({
  data: createData({ users: [] }),
})

const store = createStore(rootReducer, storeEnhancer)

sagaMiddleware.run(rootSaga)
```

Then you can use withLogin in your component:

```javascript

import withLogin from 'with-login'

const FooPage = () => {
  // withLogin passes a currentUser props
  const { currentUser } = this.props
  const { email } = currentUser || {}
  return (
    <div>
      I am connected with {email} !
    </div>
  )
}

export default withLogin({
  currentUserApiPath: '/users/current',
  failRedirect: '/signin'
})(FooPage)
```

Depending on what returns GET 'https://myfoo.com/users/current':

  - if it is a 200 with { email: 'michel.momarx@youpi.fr' }, FooPage will be rendered,
  - if it is a 400, app will redirect to '/signin' page.

## Usage with config

### withLogin

| name | type | example | isRequired | default | description |
| -- | -- | -- | -- | -- | -- |
| currentUserApiPath | `string` | [See test](https://github.com/betagouv/normalized-data-state/blob/887323e6146d5eec40203b4f4b692bfcb65a4cd9/src/tests/getNormalizedMergedState.spec.js#L92) | no | '/users/current' | apiPath that will be joined with your rootUrl to get the authenticated user from your auth server |
| failRedirect | `function` | [See test](https://github.com/betagouv/normalized-data-state/blob/887323e6146d5eec40203b4f4b692bfcb65a4cd9/src/tests/getNormalizedMergedState.spec.js#L92) | no | 'undefined' | function triggered after fail of your auth currentUserApiPath request saying. It should return a redirect path towards which react-router will history push. |
| successRedirect | `function` | [See test](https://github.com/betagouv/normalized-data-state/blob/887323e6146d5eec40203b4f4b692bfcb65a4cd9/src/tests/getNormalizedMergedState.spec.js#L92) | no | 'undefined' | function triggered after success of your auth currentUserApiPath request saying. It should return a redirect path towards which react-router will history push. |
| isRequired | `boolean` | [See test](https://github.com/betagouv/normalized-data-state/blob/887323e6146d5eec40203b4f4b692bfcb65a4cd9/src/tests/getNormalizedMergedState.spec.js#L92) | no | 'true' | Boolean saying if the React WrappedComponent will need to wait a success from the currentUserApiPath to be rendered. |
