# Front

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## CTS-FMS angular

<b>Outreach fms angular application local setup</b>

This angular app needs to be configured for CORS with spring boot running in backend.

That needs few setup

open <b>proxy.config.json</b> file. To access that file in this repository click <a href="">proxy.config.json</a>

<pre>
{
    "/api/*": {
        "target": "http://localhost:8080",
        "secure": false,
        "logLevel": "debug",
        "changeOrigin": true
    }
}
</pre>

The above is the code snippet of the CORS dev server proxy config file.

<pre>
"target": "http://localhost:8080"
</pre>

The above line contains the url, which is the url of the spring boot application of outreach fms running in the localhost.
This need to be changed accordingly to the environment. incase if the spring boot application is running in the ip 192.168.1.1 in port 8082
then the url should be <pre>http://<span></span>192.168.1.1:8082</pre>

<b>Running the application </b>

1) Download and install Node js server.
2) Download and install visual studio code.

Open visual studio code then in the side menu open the source control and clone this git repository.

As the cloned repository contains only source file, the application needs nodemodules to start the application.
for that nodemodules needs to be installed.
<pre>npm install</pre>
the above command install the nodemodules into the application.

Then build the application using the command.
<pre>ng build</pre>

This application must be started with the command
<pre>npm start</pre>
this will auto configure the CORS dev proxy.

otherway to run the application is
<pre>ng serve --proxy-config proxy.conf.json</pre>
here the application is started manually by enaabling the proxy.

The most importantly run the outreach fms spring boot application on the other hand for communication between both the servers.

