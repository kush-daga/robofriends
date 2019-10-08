import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll.js';
// import { robots } from './robots';
import './App.css'

// STATE >> props


class App extends Component {
	constructor() {
		super()
		this.state= { //state can change unlike props..
			robots: [],
			searchfield: '',
		}
	}

	componentDidMount(){
		console.log("Component mounted sucessfully!")
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response=> {
			return response.json();
		})
		.then(users =>{
			this.setState({robots: users})
		});
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })
	}
	render() {
		const { robots, searchfield } = this.state;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})
		if(robots.length === 0){
			return <h1>Loading</h1>
		}else{
			return (
				<div className='tc'>
					<h1 className='f1'> RoboFriends </h1>
					<SearchBox searchChange={this.onSearchChange}/>
					<Scroll>
						<CardList robots={ filteredRobots }/>
					</Scroll>
				</div>
			);
		}
	}
}
export default App;