import React from 'react';
import News from './News';
import {connect} from "react-redux";
import {setNewNewsAC, thunkCreateSetNewNews} from "../../redux/newsPage-reducer";
import {withRouter} from "react-router-dom";

let NewsContainer = (props) => {

  return (
    <div>
      <h1>Lolka</h1>
      <News setNewNewsAC={props.setNewNewsAC} thunkNews={props.thunkCreateSetNewNews} match={props.match}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    testProps: 'Test props'
  }
}

NewsContainer = connect(mapStateToProps, {setNewNewsAC, thunkCreateSetNewNews})(NewsContainer)
NewsContainer = withRouter(NewsContainer);

export default NewsContainer;


// class ReactContainer extends React.Component {
//
//   render() {
//     // debugger
//     return (
//       <div>
//         <h1>Lolka</h1>
//         <News />
//       </div>
//     )
//   }
// }
//
// const mapStateToProps = (state) => {
//   return {
//     testProps: 'Test props'
//   }
// }
//
// ReactContainer = connect(mapStateToProps, {setNewNewsAC})(ReactContainer)
// ReactContainer = withRouter(ReactContainer);
//
// export default ReactContainer;