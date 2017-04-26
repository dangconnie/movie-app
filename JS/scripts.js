$(document).ready(function(){
	// The base url for all API calls
	var apiBaseURL = 'http://api.themoviedb.org/3/';

	// URL in Authentication. Base URL of image
	var imageBaseUrl = 'https://image.tmdb.org/t/p/';

	const nowPlayingURL = apiBaseURL + 'movie/now_playing?api_key=' + apiKey;

	// const getMoviesByGenreURL = apiBaseURL + '/genre/' + genre_id + '/movies?api_key=' + apiKey + '&language=en-US&include_adult=false&sort_by=created_at.asc';

	//Get "Now Playing" data on default. Change results when a genre is clicked on.
	function getNowPlayingData(){
		$.getJSON(nowPlayingURL, function(nowPlayingData){
			// console.log(nowPlayingData);
			//we needed to add .results because nowPlayingData is an array.
			for(let i = 0; i<nowPlayingData.results.length; i++){
				// w300 is how wide it is
				var mid = nowPlayingData.results[i].id;
				// mid = movie ID
				var thisMovieUrl = apiBaseURL+'movie/'+mid+'/videos?api_key=' + apiKey;
				// console.log(i)

				$.getJSON(thisMovieUrl, function(movieKey){
					// console.log(i);
					// console.log(thisMovieUrl)
					// console.log(movieKey)

					var poster = imageBaseUrl+'w300'+nowPlayingData.results[i].poster_path;
					// console.log(poster);

					var title = nowPlayingData.results[i].original_title;

					var releaseDate = nowPlayingData.results[i].release_date;

					var overview = nowPlayingData.results[i].overview;
					// $('.overview').addClass('overview');

					var voteAverage = nowPlayingData.results[i].vote_average;				
					// console.log(movieKey)
					var youtubeKey = movieKey.results[0].key;
					var youtubeLink = 'https://www.youtube.com/watch?v='+youtubeKey;
					// console.log(youtubeLink)
					var nowPlayingHTML = '';
					// added in i to nowPlayingHTML. Without it, only the details for the first movie in the results display in the modal no matter which movie poster you click on.
					nowPlayingHTML += '<div class="col-sm-3 eachMovie">';
						nowPlayingHTML += '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal'+ i + '" data-whatever="@' + i + '">'+'<img src="'+poster+'"></button>'; 	
						nowPlayingHTML += '<div class="modal fade" id="exampleModal' + i +'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
							nowPlayingHTML += '<div class="modal-dialog" role="document">';
								nowPlayingHTML += '<div class="modal-content col-sm-12">';
								// nowPlayingHTML += '<div class="modal-content col-sm-12"><a href="'+youtubeLink+'"><span class="glyphicon glyphicon-play"></span>&nbspPlay trailer';	
									nowPlayingHTML += '<div class="col-sm-6 moviePosterInModal">';
										nowPlayingHTML += '<a href="'+youtubeLink+'"><img src="'+poster+'"></a>'; 
									nowPlayingHTML += '</div><br>';//close trailerLink
									nowPlayingHTML += '<div class="col-sm-6 movieDetails">';
										nowPlayingHTML += '<div class="movieName">'+title+'</div><br>';
										nowPlayingHTML += '<div class="linkToTrailer"><a href="'+youtubeLink+'"><span class="glyphicon glyphicon-play"></span>&nbspPlay trailer</a>' + '</div><br>';	
										nowPlayingHTML += '<div class="release">Release Date: '+releaseDate+'</div><br>';
										nowPlayingHTML += '<div class="overview">' +overview+ '</div><br>';// Put overview in a separate div to make it easier to style
										nowPlayingHTML += '<div class="rating">Rating: '+voteAverage+ '/10</div><br>';
										nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">8:30 AM' + '</div>';
										nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">10:00 AM' + '</div>';
										nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">12:30 PM' + '</div>';
										nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">3:00 PM' + '</div>';
										nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">4:10 PM' + '</div>';
										nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">5:30 PM' + '</div>';
										nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">8:00 PM' + '</div>';
										nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">10:30 PM' + '</div>';
									nowPlayingHTML += '</div>'; //close movieDetails
								nowPlayingHTML += '</div>'; //close modal-content
							nowPlayingHTML += '</div>'; //close modal-dialog
						nowPlayingHTML += '</div>'; //close modal
					nowPlayingHTML += '</div>'; //close off each div

					$('#movie-grid').append(nowPlayingHTML);
					//Without this line, there is nowhere for the posters and overviews to display so it doesn't show up 
					$('#movieGenreLabel').html("Now Playing");
					//h1 will change depending on what is clicked. Will display "Now Playing" in this case.
				})
			}
		}) 
	}
	getNowPlayingData();

		//Check genreIDs and genre names: 
		// http://api.themoviedb.org/3/movie/:movieID?api_key=<<>>
					//28 = action
					//12 = adventure
					//16 = animation
					//35 = comedy
					//80 = crime
					//18 = drama
					//10751 = family
					//14 = fantasy
					//36 = history
					//27 = horror
					//10402 = music
					//10749 = romance
					//878 = science fiction
					//53 = thriller

	//Get movies by genre.
	// function getMoviesByGenre(genre_id){
	// 	//Action movies
	// 	$.getJSON(getMoviesByGenreURL, function(genreData){
	// 		for(let i = 0; i<genreData.results.length; i++){
	// 			var mid = genreData.results[i].id;
	// 			var thisMovieUrl = apiBaseURL+'movie/'+mid+'/videos?api_key=' + apiKey;

	// 			$.getJSON(thisMovieUrl, function(movieKey){
	// 				var poster = imageBaseUrl+'w300'+nowPlayingData.results[i].poster_path;
	// 				var title = genreData.results[i].original_title;
	// 				var releaseDate = genreData.results[i].release_date;
	// 				var overview = genreData.results[i].overview;
	// 				var voteAverage = genre.results[i].vote_average;				
	// 				var youtubeKey = movieKey.results[0].key;
	// 				var youtubeLink = 'https://www.youtube.com/watch?v='+youtubeKey;
	// 				var genreHTML = '';
	// 				genreHTML += '<div class="col-sm-3 eachMovie">';
	// 					genreHTML += '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal'+ i + '" data-whatever="@' + i + '">'+'<img src="'+poster+'"></button>'; 	
	// 					genreHTML += '<div class="modal fade" id="exampleModal' + i +'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
	// 						genreHTML += '<div class="modal-dialog" role="document">';
	// 							genreHTML += '<div class="modal-content col-sm-12">';
	// 								genreHTML += '<div class="col-sm-6 moviePosterInModal">';
	// 									genreHTML += '<a href="'+youtubeLink+'"><img src="'+poster+'"></a>'; 
	// 								genreHTML += '</div><br>';//close trailerLink
	// 								genreHTML += '<div class="col-sm-6 movieDetails">';
	// 									genreHTML += '<div class="movieName">'+title+'</div><br>';
	// 									genreHTML += '<div class="linkToTrailer"><a href="'+youtubeLink+'"><span class="glyphicon glyphicon-play"></span>&nbspPlay trailer</a>' + '</div><br>';	
	// 									genreHTML += '<div class="release">Release Date: '+releaseDate+'</div><br>';
	// 									genreHTML += '<div class="overview">' +overview+ '</div><br>';
	// 									genreHTML += '<div class="rating">Rating: '+voteAverage+ '/10</div><br>';
	// 									genreHTML += '<div class="col-sm-3 btn btn-primary">8:30 AM' + '</div>';
	// 									genreHTML += '<div class="col-sm-3 btn btn-primary">10:00 AM' + '</div>';
	// 									genreHTML += '<div class="col-sm-3 btn btn-primary">12:30 PM' + '</div>';
	// 									genreHTML += '<div class="col-sm-3 btn btn-primary">3:00 PM' + '</div>';
	// 									genreHTML += '<div class="col-sm-3 btn btn-primary">4:10 PM' + '</div>';
	// 									genreHTML += '<div class="col-sm-3 btn btn-primary">5:30 PM' + '</div>';
	// 									genreHTML += '<div class="col-sm-3 btn btn-primary">8:00 PM' + '</div>';
	// 									genreHTML += '<div class="col-sm-3 btn btn-primary">10:30 PM' + '</div>';
	// 								genreHTML += '</div>'; //close movieDetails
	// 							genreHTML += '</div>'; //close modal-content
	// 						genreHTML += '</div>'; //close modal-dialog
	// 					genreHTML += '</div>'; //close modal
	// 				genreHTML += '</div>'; //close off each div

	// 				$('#movie-grid').append(genreHTML);
	// 				//Without this line, there is nowhere for the posters and overviews to display so it doesn't show up 
	// 				$('#movieGenreLabel').html("Action");
	// 				//h1 will change depending on what is clicked. Will display "Now Playing" in this case.
	// 			})
	// 		}
	// 	}) 
	// }
	// getMoviesByGenre(genre_id);

	// $('.action').click(function(){
	// 	getNowPlayingData();
	// 	$('#movieGenreLabel').html("Now Playing");
	// })
});


//.append(nowPlayingHTML) adds nowPlayingHTML to the present HTML
//.html(nowPlayingHTML) ovwrwrites the HTML present with nowPlayingHTML. 
//.html() is faster than DOM creation
//.html() is good for when the element is empty. 
//.append() is better when you want to add something dynamically, like adding a list item dynamically. (You would be adding a new string of HTML to the element.)



