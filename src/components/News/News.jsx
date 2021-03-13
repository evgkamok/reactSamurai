import React from 'react';
import {TextArea} from "../common/FormControl/FormsControl";
import {Field, reduxForm} from "redux-form";
import {required} from "../../utils/validator/validator";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {connect} from "react-redux";


const NewsForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <Field
          name={'newsForm'}
          component={TextArea}
          placeholder={'Type here your news'}
          validate={required}
        />
        <div>
          <button>Send news</button>
        </div>
      </form>
    </div>
  )
}

const NewsWithReduxForm = reduxForm({form: 'newsForm'})(NewsForm)

const onSendNews = (values) => {
  console.log(values)
}


const ListItem = (props) => {

  React.useEffect( () => {
    console.log('DID MOUNT OR UPDATE');
    return () => {
      console.log('WILL UNMOUNT')
    }
  })

  return (
    <div>
      <ul>
        <li>10000000000</li>
        <li>20000000000</li>
        <li>30000000000</li>
        <li>40000000000</li>
      </ul>
    </div>
  )
}

// const ButtonToggle = () => {
//   const [isVisible, setVisible] = React.useState(true);
//   return (
//     <div>
//       <button onClick={null}>
//         HIDE / SHOW
//       </button>
//     </div>
//   )
// }






const News = (props) => {

  const [isVisible, setVisible] = React.useState(true);

  const changeVisible = (() => {
    setVisible(visible => !visible);
  })

  return (
    <div>
      <h1>This is NEWS page</h1>
      <NewsWithReduxForm onSubmit={onSendNews}/>
      <h2>{props.testProps}</h2>
      <hr/>

      <button onClick={changeVisible}>
        HIDE / SHOW
      </button>

      {isVisible && <ListItem/>}

    </div>
  )
}

export default withAuthRedirect(News);

//
// class NewsForm extends React.Component{
//   render() {
//     return (
//       <div>
//         <form onSubmit={this.props.handleSubmit}>
//           <Field
//             name={'newsForm'}
//             component={TextArea}
//             placeholder={'Type here your news'}
//             validate={required}
//           />
//           <div>
//             <button>Send news</button>
//           </div>
//         </form>
//       </div>
//     )
//   }
// }
//
// const NewsWithReduxForm = reduxForm({form: 'newsForm'})(NewsForm)
//
// const onSendNews = (values) => {
//   console.log(values)
// }
//
// class News extends React.Component {
//
//   render() {
//     console.log(this.props)
//     return (
//       <div>
//         <h1>This is NEWS page</h1>
//         <NewsWithReduxForm onSubmit={onSendNews}/>
//       </div>
//     )
//   }
// }
//
//
// export default News;