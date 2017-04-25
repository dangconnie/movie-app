$(document).ready(function(){
	// The base url for all API calls
	var apiBaseURL = 'http://api.themoviedb.org/3/';

	// URL in Authentication. Base URL of image
	var imageBaseUrl = 'https://image.tmdb.org/t/p/';

	
	const nowPlayingURL = apiBaseURL + 'movie/now_playing?api_key=' +apiKey;
	$.getJSON(nowPlayingURL, function(nowPlayingData){
		// console.log(nowPlayingData);
		//we needed to add .results because nowPlayingData is an array.
		for(let i = 0; i<nowPlayingData.results.length; i++){
			// w300 is how wide it is
			var mid = nowPlayingData.results[i].id;
			// mid = movie ID
			var thisMovieUrl = apiBaseURL+'movie/'+mid+'/videos?api_key=' +apiKey;
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

				$('#movie-grid').append(nowPlayingHTML);//Without this line, there is nowhere for the posters and overviews to display so it doesn't show up 

			})
		}

	}) 
});
