# with-login

** EN CONSTRUCTION **
Ce code est du code externalisé du https://github.com/betagouv/pass-culture-shared qui concentre un nombre d'utilités React Redux
utilisé par les applications front du pass culture.
Tant que les tests fonctionnels ne sont pas écrits, cette lib ne peut être considérée en production.

## Basic Usage
You need to add first the data reducer in your root reducer:

```javascript
import { createData } from 'pass-culture-shared'
import { combineReducers } from 'redux'

const data = createData()

const rootReducer = combineReducers({
  ...
  data,
})

const store = createStore(rootReducer)
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
