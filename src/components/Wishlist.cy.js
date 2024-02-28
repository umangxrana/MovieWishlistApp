import React from 'react'
import Wishlist from './Wishlist'

describe('<Wishlist />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Wishlist />)
  })
})