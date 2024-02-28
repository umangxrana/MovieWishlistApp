import React from 'react'
import Movies from './Movies'

describe('<Movies />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Movies />)
  })
})