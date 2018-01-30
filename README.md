# Serverless Multi-Region Client Demo

Sample React application to demonstrate multi-region applications.

## How to setup

1. Configure the Google Maps API Key as environment variable (you can [create one here](https://developers.google.com/maps/documentation/javascript/get-api-key)):

```bash
export REACT_APP_GOOGLE_MAP_API_KEY=YOUR_GOOGLE_MAP_API_KEY
```

2. Setup your regional endpoints in [src/regions.yml](src/regions.yml). For example:

```yaml
us-west-2:
    name: Oregon (US)
    lat: 43.791332
    long: -120.728691
    endpoint: YOUR_REGIONAL_API_GATEWAY_ENDPOINT
```

## How to run locally

1. Install local dependencies:

```bash
npm install
```

2. Run the local server:
    
```bash
npm start
```


## How to deploy to AWS

1. Build the React app:

```bash
npm run build
```

2. Configure your AWS CLI ([doc here](https://docs.aws.amazon.com/cli/latest/reference/configure/), [installation guide here](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)):

```bash
aws configure
```

3. Configure the bucket name as environment variable:

```bash
export S3_BUCKET_NAME=YOUR_BUCKET_NAME
```

4. Deploy the static assets to S3:
    
```bash
# using the default AWS profile
npm run deploy
# using your own AWS profile
npm run deploy -- --profile YOUR_PROFILE
# with dryrun (unless YOLO)
npm run deploy -- --dryrun
```


## Serverless Backend

You can find the Serverless backend at [alexdebrie/serverless-multi-region](https://github.com/alexdebrie/serverless-multi-region).
