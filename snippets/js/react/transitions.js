// @flow

import * as React from 'react'

import { Transition } from 'react-transition-group'

const duration = 500
const defaultStyle = { transition: `opacity ${duration}ms ease-in-out`, opacity: 0 }
const transitionStyles = {
  entering: { opacity: 0 }, entered:  { opacity: 1 },
  exiting: { opacity: 0 }, exited: { opacity: 0 }
}

export default class AnimationController extends React.Component<> {
  timer: number

  state = {
    in: true,
    nextStage: '',
    stage: 'stage-1',
    runtime: 0
  }

  componentDidMount() {
    this.timer = setInterval(
      () => {
        this.setState({ runtime: this.state.runtime + 1 })
        this.flowManager()
      }, 1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  flowManager = () => {
    switch(this.state.runtime) {
      case 4:
        this.setState({ in: false, nextStage: 'stage-2' })
        break
      case 8:
        this.setState({ in: false, nextStage: 'foobar' })
        break
      case 12:
        this.setState({ in: false, nextStage: 'stage-1' })
        break
    }
  }

  handleExited = () => {
    this.setState({ in: true, stage: this.state.nextStage })
  }

  renderStage = () => {
    switch(this.state.stage) {
      case 'stage-1':
        return 'Stage 1 text'
        break
      case 'stage-2':
        return 'Stage 2 text'
        break
      default:
        return 'Something else'
    }
  }

  render () {
    return (
      <React.Fragment>
        <Transition
          in={this.state.in}
          timeout={duration}
          onExited={this.handleExited}
          appear>
          {(state) => (
            <div style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}>
              {this.renderStage()}
            </div>
          )}
        </Transition>
      </React.Fragment>
    )
  }
}
