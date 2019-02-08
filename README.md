# with-login

** EN CONSTRUCTION **
Ce code est du code externalisé du https://github.com/betagouv/pass-culture-shared qui concentre un nombre d'utilités React Redux
utilisé par les applications front du pass culture.
Tant que les tests fonctionnels ne sont pas écrits, cette lib ne peut être considérée en production.

## Basic Usage
You need to add first the data reducer in your root reducer:

You need to install a redux-saga setup with the watchDataActions and the data reducer:

```javascript
import {
  applyMiddleware,
  combineReducers,
  createStore
} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createData, watchDataActions } from 'redux-saga-data'

const sagaMiddleware = createSagaMiddleware()
const storeEnhancer = applyMiddleware(sagaMiddleware)

function* rootSaga() {
  yield all([
    watchDataActions({
      url: <your api url like "https://myfoo.com">,
    }),
  ])
}

sagaMiddleware.run(rootSaga)

const rootReducer = combineReducers({
  data: createData({ foos: [] }),
})

const store = createStore(rootReducer, storeEnhancer)
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

export default withLogin({ failRedirect: '/connexion' })(FooPage)
```
