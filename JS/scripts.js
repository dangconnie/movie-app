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
				var poster = imageBaseUrl+'w300'+nowPlayingData.results[i].poster_path;
				// console.log(poster);

				var releaseDate = nowPlayingData.results[i].release_date;

				var overview = nowPlayingData.results[i].overview;
				// $('.overview').addClass('overview');

				var voteAverage = nowPlayingData.results[i].vote_average;				
				// console.log(movieKey)
				var youtubeKey = movieKey.results[0].key;
				var youtubeLink = 'https://www.youtube.com/watch?v='+youtubeKey;
				// console.log(youtubeLink)
				var nowPlayingHTML = '';
			
			// tvShowHTML += '<div class="eachTvShow"><button type="button" class="btn invisible-btn" data-toggle="modal" data-target="#exampleModalTV' + i + '" data-whatever="@' + i + '"><img src="' + imageBaseUrl + 'w300' + tvData.results[i].poster_path + '"></button>'

			// tvShowHTML += '<div class="modal fade" id="exampleModalTV' + i + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"><div class="modal-dialog" role="document"><div class="modal-content">'


				nowPlayingHTML += '<div class="col-sm-3 eachMovie">';
					nowPlayingHTML += '<button type="button" class="btn eachMovie" data-toggle="modal" data-target=".popupModal">'+'<img src="'+poster+'"></button>'; 	
					nowPlayingHTML += '<div class="modal fade popupModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">';
						nowPlayingHTML += '<div class="modal-dialog modal-lg" role="document">';
							nowPlayingHTML += '<div class="modal-content">';
								nowPlayingHTML += '<div class="overview">' +overview+ '</div>';
								nowPlayingHTML += '<div class="release">Release date: '+releaseDate+'</div>';
								nowPlayingHTML += '<div class="rating">Rating: '+voteAverage+ '/10</div>'
							nowPlayingHTML += '</div>' //close modal-content
						nowPlayingHTML += '</div>'; //close modal-dialog
					nowPlayingHTML += '</div>'; //close modal

					// nowPlayingHTML += '<a href="'+youtubeLink+'"><img src="'+poster+'"></a>';
					// nowPlayingHTML += '<div class="release">Release date: '+releaseDate+'</div>';
					// nowPlayingHTML += '<div class="overview">' +overview+ '</div>';// Put overview in a separate div to make it easier to style
					// nowPlayingHTML += '<div class="rating">Rating: '+voteAverage+ '/10</div>';
				nowPlayingHTML += '</div>'; //close off each div 

				$('#movie-grid').append(nowPlayingHTML);//Without this line, there is nowhere for the posters and overviews to display so it doesn't show up 

			})
		}

	}) 
});
