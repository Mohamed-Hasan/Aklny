import React from 'react'
import { Input, Button, Container, Header, Icon, Card, Image } from 'semantic-ui-react'
import axios from 'axios';
var uuid = require('uuid-v4');

export default class Friends extends React.Component{
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    userId = this.props.match.params.id;
    state = {
        friends:[],
        input: ""
		}

		constructor(props){
			super(props);
			this.getMyFriends()
		}

    addFriend = ()=>{
			this.setState({input:document.getElementById("friendEmail").value}, ()=>{
				if (this.emailRegex.test(this.state.input)){

					axios.post(`http://localhost:3000/users/friends/add`,{
							'email': this.state.input
					},
					{headers: {
                            'Content-Type': 'application/json',
                            'Authorization':"Bearer "+localStorage.getItem('token')
					}}).then((response)=>{
							this.getMyFriends();
							console.log("response",response);
					}).catch((error)=>{
							console.log("error", error);
					})
				}
			})

    }

    removeFriend = (e)=>{
				console.log("removing"+e.target.value);
				axios.delete(`http://localhost:3000/users/friends/${e.target.value}`, {
					headers:{
                            'Content-Type': 'application/json',
                            'Authorization':"Bearer "+localStorage.getItem('token')
					}}).then((response)=>{
						this.getMyFriends();
					}).catch((error)=>{

					})


    }

    getMyFriends = ()=>{
        axios.get(`http://localhost:3000/users/friends`, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization':"Bearer "+localStorage.getItem('token')
            }
        }).then((response)=>{
            this.setState({friends:response.data.message});

        }).catch((error)=>{
            console.log("error", error);

				})
				this.render()
    }

    render(){
        return (
            <div>
                <h1>Friends</h1>
                <div align="center">
                    <label htmlFor="friendEmail" >Your Freinds Email</label>
                    <Input  validations={{matchRegexp:this.emailRegex}} id="friendEmail" icon='user' iconPosition='left' placeholder='mail@example.com'  />
                    <Button secondary onClick={this.addFriend}>ADD</Button>
                </div>
                <div>
                    <Container fluid>
                        <Header as='h3' icon>
                            <Icon name='users' circular/>
                            <Header.Content>Friends List</Header.Content>
                        </Header>
                        {
                            this.state.friends.length==0 && (<h1 align="center">Start adding your friends...</h1>)
                        }
                        <Card.Group className="eight wide">
                        {
                            this.state.friends.map(friend=>{
                                return (
                                    <Card  key={uuid()}>
                                        <Card.Content>
                                            <Image className="ui avatar image" floated='right' size='mini' src='https://react.semantic-ui.com/assets/images/avatar/large/steve.jpg'/>
                                            <Card.Header>{friend.name}</Card.Header>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <Button className="ui button" size='mini' value={friend.id} basic color='red'onClick={this.removeFriend}>Remove</Button>
                                        </Card.Content>
                                    </Card>
                                )
                            })
                        }
                        </Card.Group>
                    </Container>
                </div>
            </div>
        );
    }
}
// const AddFriendToGroup = () => (
// )

// export default Friends
