# Quick Start - Running locally in development mode

| this is the easiest way to run locally, very likely you just need this


you'll need
- [nvm](https://github.com/nvm-sh/nvm)
- kubectl
- gcloud

- use node 18 and install all npm dependencies

```bash
nvm install # install nvm if needed
nvm use
npm install --legacy-peer-deps
npm run schema:download
```


- then you'll need to do a port-forward `localhost:10000` to `apollo-router` in the cluster to bypass authentication

```bash
# find the cluster name 
gcloud container clusters list

# login to staging cluster using same name above. You may have to install gke-gcloud-auth-plugin
gcloud container clusters get-credentials travello-stage-2 --zone us-central1 --project travello-api 

# start port forwards
./create-port-forwards.sh
```

- copy `.env.sample` to `.env`

you will also need to edit `.env` with below values so that the server side request can have a proper host name instead of `localhost:3000`

```
HOST_OVERRIDE=www.stage.backpackerdeals.com # or any other brands
CLIENTIP_OVERRIDE=your public ip # this is only needed if you need ip detection on server side code
```

```bash
npm run dev
```

however there will be some limitations

- proxying to pages that does not exist in next.js will have undesired issues due to remote site does not trust local proxy
- client ip will be 127.0.0.1, which will resolve to incorrect location sensitive queries


---

## Running locally with SSR pointing to local BPD

| maybe you're trying to fix some issue in BPD side 

you will need to edit `.env`

```
# you'll need to run the symfony site in non-https mode
BPD_MAIN_BASEPATH=http://127.0.0.1:8081
# or whatever you're running the site on
```

limitations
- since the graphql side is still pointing to `http://localhost:10000/graphql`, expect inconsistencies
