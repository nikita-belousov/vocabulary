import React, { Component } from 'react'
import { fromJS } from 'immutable'

const WithHover = (WrappedComponent) => (
  class extends Component {
    state = {
      data: fromJS({
        isHovered: false
      })
    }

    componentDidMount() {
      this.node.addEventListener('mouseenter', this.handleMouseenter)
      this.node.addEventListener('mouseleave', this.handleMouseleave)
    }

    componentWillUnmount() {
      this.node.removeEventListener('mouseenter', this.handleMouseenter)
      this.node.removeEventListener('mouseleave', this.handleMouseleave)
    }

    handleMouseenter = () => {
      this.setState(({ data }) => ({
        data: data.set('isHovered', true)
      }))
    }

    handleMouseleave = () => {
      this.setState(({ data }) => ({
        data: data.set('isHovered', false)
      }))
    }

    render() {
      const isHovered = this.state.data.get('isHovered')

      return (
        <div ref={node => this.node = node}>
          <WrappedComponent
            isHovered={isHovered}
            {...this.props}
          />
        </div>
      )
    }
  }
)

export default WithHover
