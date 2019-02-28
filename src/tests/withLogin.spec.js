import 'babel-polyfill'

import { mount, shallow } from 'enzyme'
import { createBrowserHistory } from 'history'
import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import { withLogin } from '../withLogin'
import { configureTestStore,
  configureFetchDataWithLoginFail,
  configureFetchDataWithLoginSuccess
} from './configure'
import Foo from './Foo'
import Signin from './Signin'

describe('src | components | pages | hocs | withLogin', () => {

  beforeEach(() => {
    fetch.resetMocks()
  })

  describe('snapshot', () => {
    it('should match snapshot', () => {
      // given
      const LoginFoo = withLogin()(Foo)

      // when
      const wrapper = shallow(<LoginFoo />)

      // then
      expect(wrapper).toBeDefined()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('functions', () => {
    describe('login with success', () => {
      it('should render test component when login is a success', done => {
        // when
        const history = createBrowserHistory()
        history.push('/test')
        const store = configureTestStore()
        const LoginFoo = withLogin()(Foo)
        configureFetchDataWithLoginSuccess()

        // then
        mount(
          <Provider store={store}>
            <Router history={history}>
              <Route path="/test">
                <LoginFoo onMountCallback={done} />
              </Route>
            </Router>
          </Provider>
        )
      })
    })
    describe('login with fail', () => {
      it('should redirect to failRedirect when login is a fail', done => {
        // when
        const history = createBrowserHistory()
        history.push('/test')
        const store = configureTestStore()
        const LoginFoo = withLogin({ failRedirect: () => "/signin" })(Foo)
        configureFetchDataWithLoginFail()

        // then
        mount(
          <Provider store={store}>
            <Router history={history}>
              <Switch>
                <Route path="/test">
                  <LoginFoo />
                </Route>
                <Route path="/signin">
                  <Signin onMountCallback={done} />
                </Route>
              </Switch>
            </Router>
          </Provider>
        )
      })
    })
  })
})
