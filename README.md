The Problem statement: 
Create a service that shows on a map where movies have been filmed in San Francisco. The user should be able to filter the view using autocompletion search.

The Solution: 
  APIs used: DataSF (Film Locations), Google Maps API, complete-ly, omdb 
  Solution Link: http://movielocation.herokuapp.com/
  
  As the user searches for a movie in the search box, we show the auto complete suggestions. The user picks one, or completes his query and clicks on the search button. Now, we fire the query to get the location where this movie is filmed from the DataSF API and get the result. Using the googleMaps API, we plot the location from the result of the previous query on the San Francisco map. When the user hovers over a location marker on the map, we show him the location's name and a few other details of the movie - to enhance the user experience here, we query the omdb API for the poster of the movie and the clickable title (which links to the imdb page of the movie) and show these in the infoWindow of the marker. 
