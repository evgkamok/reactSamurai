import React, {useState, useEffect} from 'react';

const ProfileStatusHook = (props) => {

  const [isEditMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status)
  }, [props.status])

  const activateEditMode = () => {
    setEditMode(true)
  }

  const deactivateEditMode = () => {
    setEditMode(false);
    props.setUserStatusMessage(status);
  }

  const onStatusChange = (statusInput) => {
    setStatus(statusInput);
  }
  if (props.isOwner) {
    return (
      <>
        {!isEditMode &&
        <div>
          <span onDoubleClick={() => activateEditMode()}>{status || 'Click for setting status'}</span>
        </div>
        }
        {isEditMode &&
        <div>
          <input autoFocus={true}
                 type='text'
                 value={status}
                 onBlur={() => deactivateEditMode()}
                 onChange={(event) => onStatusChange(event.currentTarget.value)}
          />
        </div>
        }
      </>
    )
  } else {
    return (
      <div>
        <span>{status || 'User dont set status'}</span>
      </div>
    )
  }

}

export default ProfileStatusHook;