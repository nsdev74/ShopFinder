import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable()

export class GeoLocationService {

  private location = {lat: 0, lng: 0};

  getLocation() {
    return this.location;
  }

  setLocation(lat: number, lng: number) {
    this.location.lat = lat;
    this.location.lng = lng;
  }

  geoLocation(geoLocationOptions?: any): Observable<any> {
    geoLocationOptions = geoLocationOptions || { timeout: 10000 };

        return Observable.create(observer => {

          if (window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
              (position) => {
                observer.next(position);
                observer.complete();
              },
              (error) => {
                switch (error.code) {
                  case 1:
                    observer.error('You have rejected access to your location, please refresh your browser to try again. ' +
                    'If you are using chrome, you may have to whitelist the website from geolocation request block on location settings.');
                    break;
                  case 2:
                    observer.error('Unable to determine your location, check your internet connection then try again.');
                    break;
                  case 3:
                    observer.error('Service timeout has been reached, please try again.');
                    break;
                }
              },
              geoLocationOptions);
        } else {
              observer.error('Your browser does not support geolocation, you may not proceed.');
        }
        });
      }
    }
