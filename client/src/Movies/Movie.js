import React from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import api from '../utils/api';
export default class Movie extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			movie: null
		};
	}

	componentDidMount() {
		this.fetchMovie(this.props.match.params.id);
	}

	componentWillReceiveProps(newProps) {
		if (this.props.match.params.id !== newProps.match.params.id) {
			this.fetchMovie(newProps.match.params.id);
		}
	}

	fetchMovie = (id) => {
		axios
			.get(`http://localhost:5000/api/movies/${id}`)
			.then((res) => this.setState({ movie: res.data }))
			.catch((err) => console.log(err.response));
	};

	saveMovie = () => {
		const addToSavedList = this.props.addToSavedList;
		addToSavedList(this.state.movie);
	};

	handleDelete = (e, id) => {
		const movies = this.movie.find((user) => user.id === id);

		if (window.confirm('Please Do Not Delete unless certain')) {
			this.setState(this.movie.filter((e) => movies.id !== id));
			api()
				.delete(`/movies/${id}`)
				.then((res) => {
					console.log('movie was deleted');
				})
				.catch((err) => {
					console.log(err);

					this.setState([ ...this.state.movie, movies ]);
				});
		}
	};

	render() {
		if (!this.state.movie) {
			return <div>Loading movie information...</div>;
		}

		return (
			<div className="save-wrapper">
				<MovieCard movie={this.state.movie} />
				<div className="save-button" onClick={this.saveMovie}>
					Save
				</div>
				<div onClick={(e) => this.handleDelete(e, this.user.id)}>Delete</div>
			</div>
		);
	}
}
