// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCug0W0DVKWvpBR9nf3w3eIp3-QZhjFlug",
    authDomain: "hackprinceton-spr2018.firebaseapp.com",
    databaseURL: "https://hackprinceton-spr2018.firebaseio.com",
    projectId: "hackprinceton-spr2018",
    storageBucket: "hackprinceton-spr2018.appspot.com",
    messagingSenderId: "379768507832"
  }
};
