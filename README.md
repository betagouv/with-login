# with-login

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
      url: "https://myfoo.com",
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
  const { currentUser } = this.props
  const { email } = currentUser || {}
  return (
    <div>
      I am connected with {email} !
    </div>
  )
}

export default withLogin({
  currentUserPath: 'users/current',
  failRedirect: '/signin'
})(FooPage)
```

Depending on what returns GET 'https://myfoo.com/users/current':

  - if it is a 200 with { email: 'Michel Marx' }, FooPage will be rendered,
  - if it is a 400, app will redirect to '/signin' page.
