import {useEffect, useRef} from 'react';
import {Loader} from '@googlemaps/js-api-loader';
import sampleProjects from './sampleProjects.json';

export default function Page() {
  const googlemap = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyANWzcWWTX-2ek2826AggM1x2hXK0Q5asI',
      version: 'weekly',
    });

    let map;

    loader.importLibrary('maps').then(({Map}) => {
      const google = window.google;
      
      map = new Map(googlemap.current!, {
        center: {lat: 30, lng: 0},
        zoom: 3,
        fullscreenControl: false,
        //mapTypeControl: false,
        //streetViewControl: false,
        //zoomControl: false,
      });

      const asterisk = {
        filePath: '/asterisk.svg',
        height: 38.173,
        width: 37.802,
      }

      for (let i = 0; i < sampleProjects.projects.length; i++) {
        const project = sampleProjects.projects[i];
        
        new google.maps.Marker({
          icon: {
            anchor: new google.maps.Point(
              asterisk.width / 2,
              asterisk.height / 2
            ), 
            url: asterisk.filePath,
          },
          map: map,
          position: {
            lat: project.latitude,
            lng: project.longitude,
          },
          title: project.description,
        });
      }
    });
  });
  
  return (
    <div id="map" ref={googlemap} />
  );
}
