import React from 'react';

class ProfileStatus extends React.Component {
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

  onStatusChange = (statusMessage) => {
    this.setState({
      status: statusMessage
    })
  }

  componentDidUpdate(prevProps, prevState) {
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