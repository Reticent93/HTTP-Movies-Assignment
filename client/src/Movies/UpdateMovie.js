import React, { useState, useEffect } from 'react';
import api from '../utils/api';

function UpdateMovie(props) {
	const [ updateMovie, setUpdateMovie ] = useState({
		id: '',
		title: '',
		director: '',
		metascore: '',
		stars: []
	});
	useEffect(
		() => {
			api()
				.get(`/movie/${props.match.params.id}`)
				.then((res) => {
					setUpdateMovie(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		[ props.match.params.id ]
	);

	const handleChange = (e) => {
		setUpdateMovie({
			...updateMovie,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		api()
			.put(`/movies/${updateMovie}`, updateMovie)
			.then((result) => {
				props.history.push('/movie');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<h1>Update Movie</h1>
			<form onSubmit={handleSubmit}>
				<input type="text" name="title" placeholder="Title" value={updateMovie.title} onChange={handleChange} />
				<input
					type="text"
					name="director"
					placeholder="Director"
					value={updateMovie.director}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="metascore"
					placeholder="Metascore"
					value={updateMovie.metascore}
					onChange={handleChange}
				/>
				<input type="text" name="stars" placeholder="Stars" value={updateMovie.stars} onChange={handleChange} />
				<button type="submit">Update</button>
			</form>
		</div>
	);
}

export default UpdateMovie;
