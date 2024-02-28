import React from 'react'
import Logout from './Logout'

describe('<Logout />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Logout />)
  })
})