import 'babel-polyfill'

import { mount, shallow } from 'enzyme'
import { createBrowserHistory } from 'history'
import React from 'react'
import { Route, Router } from 'react-router-dom'

import { withLogin } from '../withLogin'

const Test = () => <p> I can be rendered because I am logged ! </p>

describe('src | components | pages | hocs | withLogin', () => {
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
  /*
  describe('functions ', () => {
    describe('parse', () =>
      it('withLogin passes a query.parse function that formats the location search string into in a params object', () => {
        // given
        const history = createBrowserHistory()
        history.push('/test?page=1&mots-cles=test')

        // when
        const wrapper = mount(
          <Router history={history}>
            <Route path="/test">
              <LoginTest />
            </Route>
          </Router>
        )

        // then
        const { query } = wrapper.find('Test').props()
        const expectedParams = { 'mots-cles': 'test', page: '1' }
        expect(query.parse()).toEqual(expectedParams)
      }))

    describe('clear', () =>
      it('withLogin passes query.clear function that erases the location.search string', () => {
        // given
        const history = createBrowserHistory()
        history.push('/test?page=1&mots-cles=test')
        const wrapper = mount(
          <Router history={history}>
            <Route path="/test">
              <LoginTest />
            </Route>
          </Router>
        )
        const { query } = wrapper.find('Test').props()

        // when
        query.clear()

        // then
        const expectedParams = {}
        expect(query.parse()).toEqual(expectedParams)
      }))

    describe('change', () =>
      it('withLogin passes query.change that overwrites the location.search', () => {
        // given
        const history = createBrowserHistory()
        history.push('/test?page=1&mots-cles=test')
        const wrapper = mount(
          <Router history={history}>
            <Route path="/test">
              <LoginTest />
            </Route>
          </Router>
        )
        const { query } = wrapper.find('Test').props()

        // when
        query.change({ 'mots-cles': null, page: 2 })

        // then
        const expectedParams = { page: '2' }
        expect(query.parse()).toEqual(expectedParams)
      }))

    describe('add', () =>
      it('withLogin passes query.add function that concatenates values in the location.search', () => {
        // given
        const history = createBrowserHistory()
        history.push('/test?jours=0,1&mots-cles=test')
        const wrapper = mount(
          <Router history={history}>
            <Route path="/test">
              <LoginTest />
            </Route>
          </Router>
        )
        const { query } = wrapper.find('Test').props()

        // when
        query.add('jours', '2')

        // then
        const expectedParams = { jours: '0,1,2', 'mots-cles': 'test' }
        expect(query.parse()).toEqual(expectedParams)
      }))

    describe('remove', () =>
      it('withLogin passes query.remove function that pops values from the location.search', () => {
        // given
        const history = createBrowserHistory()
        history.push('/test?jours=0,1&mots-cles=test')
        const wrapper = mount(
          <Router history={history}>
            <Route path="/test">
              <LoginTest />
            </Route>
          </Router>
        )
        const { query } = wrapper.find('Test').props()

        // when
        query.remove('jours', '1')

        // then
        const expectedParams = { jours: '0', 'mots-cles': 'test' }
        expect(query.parse()).toEqual(expectedParams)
      }))
  })
  */
})
