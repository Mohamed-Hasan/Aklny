import React from 'react';
import { Input, Button, Container, Header, Icon, Card, Image, Grid, Segment, Tab, Label, Menu, List } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import GroupMember  from './GroupMembers'
var uuid = require('uuid-v4');

export default class Groups extends React.Component {

  
    constructor(props) {
        super(props);
        this.state = {
            groupName: null,
            activeItem: 'inbox',
            groups: [
                {name:'1', id:1},
                {name:'2', id:2},
                {name:'3', id:3},
            ]
        }
    }
    groupRegex = new RegExp('/[:alpha:]+$/')

    handleItemClick = (e, { name }) => {
        console.log("My Active Item is ",name)
        this.setState({ activeItem: name });

    }

    addGroup = (e) => {
        console.log(this.state.groupName)
        this.setState((prevState) => {
            let newGRP = prevState.groups.push({name:this.state.groupName, id:prevState.groups.length+1})
            console.log(newGRP)
            return {
                groups: prevState.groups
            };
        });

    }

    handleChange = (e) => {
        let groupName = e.target.value
        this.setState(() => {
            return {
                groupName: groupName
            };
        });
    }

    removeGroup = (e) => {
        let newGroups=[]
        let removeId = e.target.value;
        console.log("My Active Item in remove group is ",removeId)
        this.state.groups.forEach(group => {
        console.log("My group id in remove is ",removeId)
        console.log("My remove id in remove is ",group.id)
        console.log(removeId != group.id)
            if (group.id != removeId) {
                newGroups.push(group);
            }
        });
        console.log(newGroups);
        this.setState(() => {
        return {
            groups:  newGroups,
        }
    })

        //loop on the array and remove the removed group
    }
    render() {
        return (
                 <Grid>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <h1>Groups</h1>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <div centered>
                                <Input validations={{matchRegexp:this.groupRegex}} onChange={this.handleChange} value={this.state.groupName}  id="addGroup" icon='group' iconPosition='left' placeholder='Group Name' />  
                                <Button secondary onClick={this.addGroup}>ADD</Button>
                            </div>
                        </Grid.Column>
                        
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <Segment>
                                <Container fluid>
                                    <Header as='h3' icon textAlign='center'>
                                        <Icon name='users' circular />
                                        <Header.Content>
                                            My Groups
                                        </Header.Content>
                                    </Header>
                                </Container>
                                <Container fluid>
                                    <List verticalAlign='middle' divided animated vertical relaxed>
                                        {this.state.groups.map(group => {
                                            return (
                                                <List.Item as={Link} to={`/groups/${group.id}`} name={group.name} active={this.state.activeItem === group.name} onClick={this.handleItemClick}>
                                                    <List.Content>
                                                        <List.Header>{group.name}</List.Header>
                                                    </List.Content>
                                                    <Button class="ui icon button" value={group.id} floated="right" color='red' onClick={this.removeGroup} >
                                                        <i class="icon remove"></i>
                                                    </Button>
                                                    <Button value={group.id} floated="right" color='green' >
                                                        <i class="icon add user"></i>
                                                    </Button>
                                                </List.Item>
                                            )
                                        })
                                        }
                                    </List>
                                </Container>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <Segment>
                                <GroupMember groupName={this.state.activeItem} />                           
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            
        )
    }
}