# choochoo

A small proof-of-concept app that visualises the current location of the [Dulwich Hill light rail](https://en.wikipedia.org/wiki/Dulwich_Hill_Line) vehicles on the tracks. Powered by openstreetmap and the TfNSW realtime API. Built in react and node, using a modified openlayers-to-react bindings library.

## Install

Install dependencies with

`$ npm install`

Run the app with

`$ npm start`

Defaults to hosting via `http://localhost:8080`.

### Environmental variables

You'll need a TfNSW API key, which can be set via the environment variable TFNSW_API_KEY.

## Deployment

For now there's no separate deployment; production webpack config is the same as development. 
