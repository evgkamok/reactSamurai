import React, {useState} from 'react';


const ProfileStatusHook2 = (props) => {

    const [isEditMode, setState] = useState(false);
    const [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setState(true);
    }

    const deactivateEditMode = () => {
        setState(false);
        props.setUserStatusMessage(status)
    }

    const onStatusChange = (status) => {
        setStatus(status)
    }

    return (
        <div>
            {!isEditMode &&
            <div>
                <span
                    onDoubleClick={() => activateEditMode()}>{status || 'Click for seting status'}
                </span>
            </div>
            }
            {isEditMode &&
            <div>
                <input autoFocus={true} type='text' value={status}
                       onBlur={() => deactivateEditMode()}
                       onChange={(event) => onStatusChange(event.currentTarget.value)}
                />
            </div>
            }
        </div>
    )
}

//
//
// class ProfileStatus extends React.Component
// {
//   state = {
//     isEditMode: false,
//     status: this.props.status
//   }
//
//   activateEditMode = () => {
//     this.setState({
//       isEditMode: true,
//     })
//   }
//
//   deactivateEditMode = () => {
//     this.setState({
//       isEditMode: false,
//     })
//     this.props.setUserStatusMessage(this.state.status)
//   }
//
//   onStatusChange = (statusMessage) => {
//     this.setState({
//       status: statusMessage
//     })
//   }
//
//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.status !== this.props.status) {
//       this.setState({
//         status: this.props.status
//       })
//     }
//   }
//
//
//   render() {
//     return (
//       <div>
//         {!this.state.isEditMode &&
//         <div>
//           <span onDoubleClick={() => this.activateEditMode()}>{this.props.status || 'Click for seting status'}</span>
//         </div>
//         }
//         {this.state.isEditMode &&
//         <div>
//           <input autoFocus={true} type='text' value={this.state.status}
//                  onBlur={() => this.deactivateEditMode()}
//                  onChange={(event) => this.onStatusChange(event.currentTarget.value)}/>
//         </div>
//         }
//       </div>
//     )
//   }
// }

export default ProfileStatusHook2;