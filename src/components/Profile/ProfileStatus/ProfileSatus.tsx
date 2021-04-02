import React from 'react';


type Props = {
  status: string
  setUserStatusMessage: (status: string) => void
}

type State = {
  isEditMode: boolean
  status: string
}


class ProfileStatus extends React.Component<Props, State> {
  state = {
    isEditMode: false,
    status: this.props.status
  }

  activateEditMode = () => {
    this.setState({
      isEditMode: true,
    })
  }

  deactivateEditMode = () => {
    this.setState({
      isEditMode: false,
    })
    this.props.setUserStatusMessage(this.state.status)
  }

  onStatusChange = (statusMessage: string) => {
    this.setState({
      status: statusMessage
    })
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
  }

  render() {
    return (
      <div>
        {!this.state.isEditMode &&
        <div>
          <span onDoubleClick={() => this.activateEditMode()}>{this.props.status || 'Click for seting status'}</span>
        </div>
        }
        {this.state.isEditMode &&
        <div>
          <input autoFocus={true} type='text' value={this.state.status}
                 onBlur={() => this.deactivateEditMode()}
                 onChange={(event) => this.onStatusChange(event.currentTarget.value)}/>
        </div>
        }
      </div>
    )
  }
}

export default ProfileStatus;