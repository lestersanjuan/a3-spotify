import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  expressBaseUrl: string = 'http://localhost:8888';

  constructor(private http: HttpClient) { }

  private sendRequestToExpress(endpoint: string): Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server
    //Note: toPromise() is a deprecated function that will be removed in the future.
    //It's possible to do the assignment using lastValueFrom, but we recommend using toPromise() for now as we haven't
    //yet talked about Observables. https://indepth.dev/posts/1287/rxjs-heads-up-topromise-is-being-deprecated
    let promise = this.http.get(this.expressBaseUrl + endpoint).toPromise();
    return Promise.resolve(promise);
  }

  aboutMe(): Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category: string, resource: string): Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    const endpoint = `/search/${category}/${encodeURIComponent(resource)}`;
    return this.sendRequestToExpress(endpoint).then(response => {
      switch (category) {
        case 'artist': {
          var resources: ArtistData[];
          resources = response['artists']['items'].map((artist) => {
            return new ArtistData(artist);
          });
          return resources;
        }
        case 'album': {
          let resources: AlbumData[];
          resources = response['albums']['items'].map((album) => {
            return new AlbumData(album);
          });
          return resources;
        }
        case 'track': {
          let resources: TrackData[];
          resources = response['track']['items'].map((track) => {
            return new TrackData(track);
          });
          return resources;
        }
      }
      return resources;
    });
  }


  getArtist(artistId: string): Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    return null as any;
  }

  getRelatedArtists(artistId: string): Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    return null as any;
  }

  getTopTracksForArtist(artistId: string): Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    return null as any;
  }

  getAlbumsForArtist(artistId: string): Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    return null as any;
  }

  getAlbum(albumId: string): Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    return null as any;
  }

  getTracksForAlbum(albumId: string): Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    return null as any;
  }

  getTrack(trackId: string): Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    return null as any;
  }

  getAudioFeaturesForTrack(trackId: string): Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    return null as any;
  }
}
