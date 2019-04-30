import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import{Row,Col,CardPanel} from 'react-materialize'

import './CVitem.css'


export class CVitem extends Component {
    state= {
        imgURL: '',
        author: '',
        isLoaded: false
        
    }

     static propTypes ={
      cv:  PropTypes.object.isRequired
    }           

    componentDidMount(){
        const {acf , author} = this.props.cv;
        const getImageURL= axios.get(`http://localhost:8000/wp-json/wp/v2/media/${acf.profile_photo.id}`);
        const getAuthor = axios.get(`http://localhost:8000/wp-json/wp/v2/users/${author}`)

        Promise.all([getImageURL,getAuthor]).then(res =>{
            this.setState({
                imgURL: res[0].data.media_details.sizes.full.source_url,
                author: res[1].data.name,
                isLoaded: true
            })
        })
    }
 
    

    render() {
    const {title, acf} = this.props.cv
    const {author, imgURL, isLoaded}= this.state;

    if(isLoaded){
        return (
          <div className='header'>
            <div className='header'>
              <Row>
                <Col l={1} m={1}>              
                </Col>
                  <div>
                    <Col s={12} l={10} m={10} className="info_photo">                      
                      <div className='photo_info_container' >
                        <Row>                         
                          <Col l={3} m={3} s={6} className='profile_photo_container'>
                            <CardPanel className='photoName  blue-grey darken-4'>
                              <img className='profile_photo' src={imgURL} alt="{title.rendered}"/>
                              <p className='strongo'>{acf.name}</p> 
                              <p>{acf.position}</p>
                            </CardPanel>
                          </Col>                        
                          <Col l={9} m={9} s={6} className='contacts'>
                            <CardPanel className='contact-container'>
                                <p className='strongo contact'>Email</p>
                                <p className='contact'>{acf.email}</p>
                                <p className='strongo contact'>GitHub</p>
                                <p className='contact'>{acf.github}</p>
                                <p className='strongo contact'>Phone Number</p>
                                <p className='contact'>{acf.phone_number}</p>
                                <p className='strongo contact'>Address</p>
                                <p className='contact'>{acf.addresss}</p>
                            </CardPanel>
                          </Col>                                              
                        </Row>
                      </div>
                    </Col>
                  </div>
                <Col l={1} m={1}>                  
                </Col>                
              </Row>
            </div> 
            <div className='main'>
              <div>
                <Row>
                  <Col l={1} m={1}>
                  </Col>
                  <Col s={12} l={10} m={10}>
                    <div>
                      <Row>
                        <Col l={3} m={3} s={1} >
                            
                        </Col>
                        <Col l={6} m={6} s={10} >
                          <CardPanel className='subtitles-container blue-grey darken-4'>
                            <span className='subtitles white-text'>Summary</span>
                          </CardPanel>
                          <p className='text'>{acf.summary}</p>
                        </Col>
                        <Col  l={3} m={3} s={1}>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col l={1} m={1}>                  
                  </Col>
                </Row>
              </div>
              <div>
                <Row>
                  <Col l={1} m={1} s={1}></Col>
                  <Col l={2} m={3} s={4}>
                    <CardPanel className='subtitles-container blue-grey darken-4'>
                      <span className='subtitles white-text'>Projects</span>
                    </CardPanel>
                  </Col>
                  <Col l={8} m={7} s={6}>
                    <p className='text'>{acf.projects}</p>
                  </Col>
                  <Col l={1} m={1} s={1}></Col>
                </Row>
              </div>
              <div>
                <Row>
                  <Col l={1} m={1} s={1}></Col>
                  <Col l={2} m={2} s={3} >
                    <CardPanel className='teal subtitle-container'>
                      <p className='subtitles white-text'>Skills</p>
                    </CardPanel>
                    <p className='text'>{acf.skills}</p>
                  </Col>
                  <Col l={6} m={6} s={4}>
                    <CardPanel className='blue-grey darken-4 subtitles-container'>
                    <p className='subtitles white-text'>Scholarship</p>
                    </CardPanel>
                    <p className='text'>{acf.scholarship}</p>
                  </Col>
                  <Col l={2} m={2} s={3} >
                    <CardPanel className='teal subtitles-container'>
                    <p className='subtitles white-text'>Languages</p>
                    </CardPanel>
                    <p className='text'>{acf.languages}</p>
                  </Col>
                  <Col l={1} m={1} s={1}></Col>
                </Row>
              </div>
            </div>            
          </div>
          
        );
    }
    return null;
  }
}

export default CVitem
