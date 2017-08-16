import React, { Component } from 'react'

class Loading extends Component {
  state = {
    dots: ''
  }

  componentDidMount() {
    const { maxDots, interval } = this.props

    this.interval = setInterval(() => {
      const { dots } = this.state

      this.setState({
        dots: dots.length === maxDots ? '' : dots + '.'
      })
    }, interval)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div>
        Loading{this.state.dots}
      </div>
    )
  }
}

export default Loading
