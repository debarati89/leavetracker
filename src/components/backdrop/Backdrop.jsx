import React from 'react'
import { Spinner } from 'react-bootstrap'
import './Backdrop.css'
export default class Backdrop extends React.Component {
    render() { 
    return(
      <div
        className="backdrop"
        onClick={this.props.showMenuHandler}
      ><div><Spinner animation="grow" ></Spinner></div> 
      </div>
    )
  }
}