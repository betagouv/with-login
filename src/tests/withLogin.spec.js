import 'babel-polyfill'

import { mount, shallow } from 'enzyme'
import { createBrowserHistory } from 'history'
import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import { withLogin } from '../withLogin'
import { configureTestStore,
  configureFetchDataWithLoginFail,
  configureFetchDataWithLoginSuccess,
  Test
} from './configure'

describe('src | components | pages | hocs | withLogin', () => {

  beforeEach(() => {
    fetch.resetMocks()
  })

  describe('snapshot', () => {
    it('should match snapshot', () => {
      // given
      const LoginTest = withLogin()(Test)

      // when
      const wrapper = shallow(<LoginTest />)

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
        const LoginTest = withLogin()(Test)
        configureFetchDataWithLoginSuccess()

        // then
        mount(
          <Provider store={store}>
            <Router history={history}>
              <Route path="/test">
                <LoginTest onMountCallback={done} />
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
        const LoginTest = withLogin({ failRedirect: () => "/signin" })(Test)
        configureFetchDataWithLoginFail()

        // then
        mount(
          <Provider store={store}>
            <Router history={history}>
              <Switch>
                <Route path="/test">
                  <LoginTest />
                </Route>
                <Route path="/signin">
                  <Test onMountCallback={done} />
                </Route>
              </Switch>
            </Router>
          </Provider>
        )
      })
    })
  })
})
