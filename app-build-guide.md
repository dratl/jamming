# Jammming React Web Application

In this project, you will build a React web application called Jammming. You will use your knowledge of React components, passing state, and requests with the Spotify API to build a website that allows users to search the Spotify library, create a custom playlist, then save it to their Spotify account.

Use the following guide and explain step by step.

## Features

- Users can search for songs by song title.
- You can also include functionality to search by other attributes like artist’s name, genre, etc.
- Users can see information about each song like title, artist, and album for songs they queried.
- Users can export their custom playlist to their personal Spotify account.

## First Step: Create Static Components

Create components for your Jammming application. You may structure your components as you see fit, but you should have a component representing each of these core components of the interface:

- `App`
- `SearchBar`
- `SearchResults`
- `Playlist`
- `Tracklist`
- `Track`

Additionally, make sure that your interface has a **Save To Spotify** button and a **Search** button.

For now, these components should be static and may contain mock data. At this point, you should focus on how your components will interact with the data rather than on how they will retrieve data from APIs (that comes in a later task). Remember to build reusable components and keep them small.

Organizationally, don’t forget to keep your project tidy by creating a folder for each component and keeping your styles separate with a CSS module for each component.

## Second Step: Implement Track Listing in The Component Tree

When a user requests data from Spotify, the JSON response will contain a set of song tracks. Your Jammming web app should display the song name, artist, and album for each track in the results list.

Implement this by creating a unidirectional data flow from your root component. The root component should pass down the search results to a child component that will return each individual track to be rendered.

Since the Spotify API is not currently set up to be called, you may hard-code an array of track objects to be passed down for now.

### Things to Keep in Mind

- Each hard-coded array of track objects should contain a `name`, `artist`, `album`, and `id` property.
- Consider using state to store information such as your search results array, allowing you to update the array in response to user inputs and other events.
- Use JavaScript’s `map()` method to iterate over arrays and render multiple components dynamically.
- When returning the list of tracks, make sure to set a unique `key` attribute for each track. This will help React efficiently update the DOM when changes occur.

## Third Step: Implement Playlists in The Component Tree

Your Jammming web app should allow the user to customize their playlist title and tracks. When a user creates a playlist, your app should display the playlist name and tracks from the playlist.

Create a unidirectional data flow from your root component to relevant children components. This data flow should pass down the playlist name and tracks.

### Things to keep in mind:

You can create a mock string containing the playlist name and tracks to test your code.

If you’ve set up your static components with the proper representation for the core components of the interface, you can pass the playlist tracks from the component responsible for the Playlist to the component responsible for the Tracklist.

Consider using state to store information such as the playlist name and playlist tracks.

## Fourth Step: Implement Adding Songs To a Custom Playlist

Your Jammming web app should allow users to add songs from the search results to their custom playlist. To achieve this, implement a method that adds a selected song from the search results track list to the user’s custom playlist. The method should be triggered when the user clicks an “add” button displayed next to each track in the search results list.

You will want to create a method that can accept a track as an argument, and check if the passed-in track is in the playlist already — there is a unique property of each track that can help you with this step, and if the song is new, add the song to the playlist.

The “add” button can be anything. For example, a + sign provides a visual aid of “adding” a song. An event listener can wait for the button to be clicked and trigger the method that adds the track to the playlist.

Don’t forget to render the playlist component with the updated playlist to reflect the changes made by adding a new track!

## Fifth Step: Implement Removing Songs From a Custom Playlist

Along with adding, your Jammming web app should allow users to remove songs from their playlists.

This function should trigger when the user presses the “remove” button next to a displayed track. To achieve this, implement a method that removes a selected song from the user’s custom playlist.

To complete this step, create a method that can accept a track as an argument, and check if the passed-in track is in the playlist — there is a unique property of each track that can help you with this step, and if the song exists in the playlist, remove it.

The “remove” button can be anything. For example, a - sign provides a visual aid of “subtracting” or “removing” a song. An event listener can wait for the button to be clicked and trigger the method that removes the track from the playlist.

Don’t forget to render the playlist component with the updated playlist to reflect the changes made by removing the track!

## Sixth Step: Implement Playlist Renaming

One essential feature of a music application is customization. Provide users with more control over their music by allowing them to rename their playlists.

Implement code that enables a user to change the name of their playlist. The user should be able to click on the title of their playlist and type in a new name to replace the existing name.

Displaying the playlist title with the input element can allow users to click on the title of their playlist and edit it directly on the page by clicking on the form field.

The input element can be monitored using the onChange attribute to update the playlist title accordingly.

## Seventh Step: Implement Saving the Playlist to a User's Account

Jammming’s main feature is allowing users to export their created playlist and save it to their personal Spotify account. Implement a feature to save a user’s playlist to their Spotify account and reset the existing playlist on the web app.

As a part of this goal, you should access a track property named uri. Spotify uses this field to reference tracks in the Spotify library. You should create an array containing the uri of each track in the playlist.

At this point, you don’t need to interact with the Spotify API quite yet. Use mock data to test your implementation.

Mock Urls:
https://open.spotify.com/track/2S3flt2KfOpG7JNmtteAAZ?si=c434474129584fa4
https://open.spotify.com/track/1S0B6NQeoaDO2vh2MEflkp?si=188e2e2cde714aef
https://open.spotify.com/track/6825ujIyyrnHiXOzTVlWFG?si=8d31e6f11c774cb2
https://open.spotify.com/track/5pQ0ZiCd26Q9fNw8SCmsFO?si=cc8064a1b08a4639
https://open.spotify.com/track/6x367ass0NQZOc8j0z0eot?si=8d504e2ada4d46c1
https://open.spotify.com/track/7zH7o0YuTjhaFNtaVBj7y2?si=fc961db111a34e55

## Eighth Step: Obtain a Spotify Access Token

Create a JavaScript module that will handle the logic for getting an access token and using it to make requests. The method should have a way to get a user’s access token and store it.

You can use the Implicit Grant Flow to set up a user’s account and make requests. The implicit grant flow returns a user’s token in the URL.

From the URL, you should extract the access token values and set them up in your app. You should also set up a variable for the expiration time and configure the access token to expire at the appropriate time.

Remember to clear parameters from the URL to avoid issues with expired access tokens.

You may encounter errors if the access token is not in the URL. It can happen if the user has not logged in and granted your app access to their Spotify account yet. Handle these errors appropriately.

To use the access token you must include the following header in your API calls:
	
Header Parameter: Authorization	
Value: Valid access token following the format: Bearer <Access Token>
Temporal Acces Token: BQCFA64m8lFI7GOsgdbwfgfqcbkhO7CiN-rl_eAM8UGfYgQeFNXlE_vKZH2VNl_VDoUwReUG1G2dBCFl4SgKYx_PA2tX0IjgWt7IJVRm3KeHi4kTaz2nde3KeZxiItdk28u4Ldzi8-w

Example: The following code implements the getProfile() function which performs the API call to the Get Current User's Profile endpoint to retrieve the user profile related information:

<script>
async function getProfile(accessToken) {
  let accessToken = localStorage.getItem('access_token');

  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });

  const data = await response.json();
}
</script>

Example: A client side (browser) JavaScript function to refresh tokens issued following the Authorization Code with PKCE extension flow.

<script>
  const getRefreshToken = async () => {

   // refresh token that has been previously stored
   const refreshToken = localStorage.getItem('refresh_token');
   const url = "https://accounts.spotify.com/api/token";

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId
      }),
    }
    const body = await fetch(url, payload);
    const response = await body.json();

    localStorage.setItem('access_token', response.accessToken);
    if (response.refreshToken) {
      localStorage.setItem('refresh_token', response.refreshToken);
    }
  }
</script>

## Ninth Step: Implement Spotify Search Request

Connect the search bar to Spotify so that it can query data from the Spotify API. Your implementation should enable users to enter a search parameter and receive a response from the Spotify API. You should display the results from the request to the user.

To make your request to the API, use the `/v1/search?type=TRACK` endpoint. You can refer to the Spotify Web API Endpoint Reference for guidance on formatting your request.

You can use `fetch()` to make your GET requests and you should be expecting the response back as a list of tracks in JSON format.

It is best to convert the JSON to an array of tracks, the array should be a list of track objects with the following properties: id, name, artist, album, and uri.

Common errors to avoid:

- Invalid access tokens: Make sure that you use valid access tokens before making your requests.

## Tenth Step: Save a User's Playlist

Create a method that writes the user’s custom playlist in Jammming to their Spotify account. The user should be able to save their custom playlist from Jammming into their account when they click the “Save To Spotify” button.

To implement this feature, you will need to make requests to create new playlists on the user’s Spotify account with the playlist’s custom name and add the tracks from the user’s custom playlist to the new playlist.

To hit the necessary endpoints, you’ll need the user’s ID, you can make a request that returns the user’s Spotify username by making a request to `https://api.spotify.com/v1/me`.

To create a new playlist, you will need to make a POST request to the `/v1/users/{user_id}/playlists` endpoint. You can set the name and description of the new playlist in the request body.

To add tracks to the new playlist, you will need to make a POST request to the `/v1/users/{user_id}/playlists/{playlist_id}/tracks` endpoint. You can provide a list of track IDs in the request body to add them to the playlist.