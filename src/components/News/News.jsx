import React from 'react';
import {TextArea} from "../common/FormControl/FormsControl";
import {Field, reduxForm} from "redux-form";
import {required} from "../../utils/validator/validator";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


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

const News = (props) => {

  return (
    <div>
      <h1>This is NEWS page</h1>
      <NewsWithReduxForm onSubmit={onSendNews}/>
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