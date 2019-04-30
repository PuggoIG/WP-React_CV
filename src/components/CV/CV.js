import React, { Component } from 'react'
import axios from 'axios'
import CVitem from '../CVitem/CVitem';
import {Col, Row, Preloader} from 'react-materialize/lib'


export class CV extends Component {
    state = {
        CV: [],
        isLoaded: false
    };

    componentDidMount(){
        axios.get('http://localhost:8000/wp-json/wp/v2/cvs')
            .then(res => this.setState({
                CV: res.data,
                isLoaded:true
            }))
            .catch(err => console.log(err));
    }

  render() {
      const {CV, isLoaded} =this.state;
      if(isLoaded){
          return(
            <div>
                {CV.map(cv => (
                    <CVitem key={cv.id} cv={cv} />
                ))}
            </div>
          );
      }
      
    return (
      <div>
        <Row>
          <Col s={4}>
            <Preloader flashing />
          </Col>
        </Row>
      </div>
    )
  }
}

export default CV
