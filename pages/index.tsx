import {useEffect, useRef} from 'react';
import {Loader} from '@googlemaps/js-api-loader';
import Head from 'next/head'
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
    <>
      <Head>
        <title>Websuite &laquo; Comon Invent</title>
      </Head>
      
      <div id="map" ref={googlemap}>
          <div>
              <div><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAABAAAAAQADq8/hgAAAEwElEQVR42u2bbYhVRRjHf/eoa1RrpikslRtD6xZCaRDi0huVMAR+iAo02rY1AjWJqQ8agglJ5H5om6BWKchgYxOqLxUxhUUgrJhQVJi92GHLYqGywssSbq7bh5l7u/e29+2cc8/sdff/7Zw78zzP/3/nnJnzzDOZyclJZjIyjXYglFkE3ApcD1wLXAMsAVqBi12zMeA08BvwDXAc+BL4JNTyj6YTQCjTAXQDdwE3xPAzCXwGvA8Mhlp+P20FEMrMBe4HNgFrkg7U4TCwDxgKtTw7LQQQyrQAG4HtwFUNIl6KEaAPeDXUctybAEKZ24EBoDMl4qU4DmwNtfw4VQGEMpcCLwEbPBEvxZAT4s+GCyCUWQMcAJb5Zl2CH4ENoZaH6+kU1En+UeDQNCQP0A4cEspsqadTTSNAKJMBnsW+6JoBe4AdoZZVV3lVBRDKzAH2Y+f1ZsIg0BtqOVGpUcVHwP3ze5uQPC7mF6s1qvYO2Ak84ptJDGwSyjxVqUHZR0Aosw54xzeDhLAu1PK9mgUQylwNHAUW+o48IfwF3BhqeaKqAEKZADvVdXkI9CjwAfA1kAUuBDqAtcAtxFu5DgM3h1qeK7w5d4qGWzyQPwhsC7X8vMzvz7hRuRtYH9FHF/ZDbaDwZpGiQpk24Fvst3oaOAdsA/prmbNdjOux0/IFEfxlgc5Qy9HcjdJZYHuK5AE2h1o+Vyt5gFDLA8DdwEStfQrQSsliLj8ChDLLgBPAvJTI7w+13Bi1s1BmJ/B0hK7jQEeo5U9QPAKeSJH8GHbox0EfcDJCvxbg8dxFACCUmQ88kBJ5sOmt3+MYcImQqiu9Muh2nPMj4B5gcYoCJLXAimpnseOcF+C+FMkDfJGQne+AMxH73guQEcrMA06R7tu/JdTynyQMCWVOAldE6JoFFgXYDG6a5EnYX1RbrUBXAKxOmTyASMSIMpcBl8QwsToAVngQ4M6E7NwRs/8KXwI85D664uLhJARo8yBAJ9Abx4Dbk1gbM462AFjgQQCAfqHM8ojklwCvJRDDgoD0Z4C8c+BDt5FaD/ml2JzBlQnE0JrEcxgH7cCnQpkel4CtRl5id4tXJRVARihzGn+joBBfAS9j/90fcpkboUw79m3fC9yUsM9sRijzM3C5b/YlGAf+BuYTLfFRK34JgNHYZpJHC3aB00jyAKMBcMw3W484NisAcMR3FB5xJMDW3WR9R+IBWWA4cN/lH/mOxgMOhlqezS2E3vQdjQe8Bf+lxN7GZoVmCk45zlaAUMszwOu+o0oRg45z0b5AP5BInm6aYxx4PneRF8DtlAxEsdhk2JvbFSoSwKGP83tKzDqOeRQJ4HZNd/iOsoF4snBn+H8COAxgiwnONwxjC62LMONLZKbMCLmGD/qOOkF0T0W+rABOhHeBXb4jTwC7ylWIVRTAYTfwim8GMbAv1LJiEUVFAVzpymZs2WmzYRDYWq1R1aywq7XtoWT+nObYA/RUqxOGOuvuXLn8C8Ac3wzLYAJ4LNSy5hXt7IGJer04ByuBN3wzLsAQsKpe8jB7aKr+EVAI5/g67EwxkiLxEedzZRzyMHtwcvbobFqHp2/DPiq5w9NLsRuyF7lmY9hv9V9J+/D0TD8+/y9NLWFz2gbDuAAAACJ6VFh0U29mdHdhcmUAAHjac0zJT0pV8MxNTE8NSk1MqQQAL5wF1K4MqU0AAAAASUVORK5CYII=" alt=""  /></div>
              <div>Loading...</div>
          </div>
      </div>
    </>
  );
}
