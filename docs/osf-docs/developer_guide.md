# DEVELOPER GUIDE

## Preface
This guide is oriented at anyone who is interested on Space Data Dissemination and wants to use Open Web Components (OWC) software, a configurable, user friendly, extensible Graphical User Interface for the SentinelDataHub/DataHubSystem, based on Web Components (Polymer).

## Prerequisites

To understand every part of the following guide it is required at least some `HTML`, `CSS` and `Javascript` programming experience.
Basic knowledge of HTML5, CSS and Javascript principles are enough to run and configure the ESA Scientific HUB Open Web Components.
This means that these guidelines are intended for intermediate web developers.

Before we dive in, a brief description of Standards and technologies involved is reported in next paragraphs.
### Web Components

`Web Components` are a set of standards beign added to the HTML and DOM specification, by the World Wide Web Consortium (W3C). Web Components main innovation is the possibility to use an Object Oriented approach in Web application development.
The main features of Web Components standards are:
  - Custom Elements, a specification describing the method for enabling the author to define and use new types of DOM elements in a document.
  - Shadow DOM, a specification based on encapsulation and hiding the innards of a custom element inside a nested document, avoiding overriding of JavaScript methods and CSS styles.
  - HTML Imports, a specification which allows to include and reuse HTML documents, considered as external resources, in other HTML documents.
  - HTML Template, a specification which enables to store HTML data inside an HTML document, by means of &lt;template&gt; tag. The &lt;template&gt; element is used to declare fragments of HTML that can be cloned and inserted in the document by script. The content of a &lt;template&gt; element is parsed without interpreting it.


### Polymer

`Polymer` is an open-source library for creating web applications using web components, following Material Design principles.
Polymer library is designed to make it easier and faster for developers to create great, reusable components for the modern web.
Polymer is built on top of the web components standards and it helps developers in building their own custom elements.

Polymer library provides a declarative syntax that makes it simpler to define custom elements. It adds features like templating, two-way data binding and property observation to help building powerful, reusable elements with less code.

More information about Polymer library can be found at: https://www.polymer-project.org/1.0/docs/start/what-is-polymer.html

### Bower
`bower` is package manager of web (html/css/js) dependencies for client side (browser). It simplifies developers' job downloading and managing all external libraries used by a web application. It's enough to include in your application a file, called bower.json, with the list of dependencies and the version to use.

### Node.js
`Node.js` is is an open-source, cross-platform JavaScript runtime environment for developing tools and application. Node.js javascript interpreter is Google's V8. In the context of OWC, Node.js is required as Bower dependency.

### Npm (Node Package Manager)

`npm` is the Node.js package manager, automatically included when Node.js is installed. npm manages installation of packages that are local dependencies of a particular project, resolving also, in one command, all the dependencies of a project.

### Gulp
`Gulp` helps automation of time-consuming tasks in development workflow. It is a Node.js task manager used mainly for:
- Minification and concatenation of Javascript and CSS files
- CSS and Javascript preprocessing and validation
- Image optimization
- Unit testing

The philosophy of gulp is *code over configurations*


### OData
`OData (Open Data Protocol)`  is a standard that defines a set of best practices for building and consuming RESTful APIs. OData RESTful APIs are easy to consume. The OData metadata, a machine-readable description of the data model of the APIs, enables the creation of powerful generic client proxies and tools.

## Build your own OWC Web Component

### <a name="gentool0001"></a> How to create a new web component for OWC (generation tool)
*OWC* provides a tool to auto-generate a polymer from a template, which is compliant with folder structure described previously.

These are the steps to follow for running OWC component generation tool:

1) move to the owc source folder (like:  ```<clone_folder>/client/owc-client/src/main/frontend/```):
```
cd <owc-path>
```
2) run the following command to create a new OWC component:
```
python tools/new_component.py create
```
3) during command execution, please insert the requested information:
```
Repository path (empty to load the path from configuration file):
```
*Insert the path of the owc source folder (e.g. <clone_folder>/client/owc-client/src/main/frontend/) and then press **enter**.*
```
Repository url (empty to load the path from configuration file):
```
*Insert the git repository url for this component (e.g. https: //github.com/<your_repo>/DataHubSystem.git), or leave field empty if there isn't a repository, then press **enter**.*
```
New element name:
```
*Insert the name of the new component. It must be composed with two words separated by '-' character (e.g. new-component), then press **enter**.*
```
New element class:
```
*Insert the name of the ES6 class that will contain the code of the new Polymer component (e.g. NewComponent), then press **enter**.*

```
New element description:
```
*Insert a description of the new component, then press **enter**.*

script output will be similar to snippet below:
```
Template path: /data/owc-project/app/elements/_template-element, new component path: /data/owc-project/app/elements/new-component
setting demo...
setting test...
setting README...
setting bower.json...
setting wct files...
setting element file
[DONE]
```
The source code of the new component is created in the folder ```<clone_path>/client/owc-client/app/elements/new-component/```, which contains all basic files of a standard Polymer component. This grants the possibility to:
- write and run easily component unit tests
- run component demo
- generate automatically component documentation

### How to integrate a new web component in OWC
After creating a new component, it is necessary to integrate it into OWC to make it visible to all the other components of the application.
To do this, it is enough to insert the reference link to the component in **elements.html** file located in the folder **<clone_path>/client/owc-client/src/main/app/elements**.

Some examples of components import are reported below:
```html
<link rel="import" href="navigation-manager/navigation-manager.html">
<link rel="import" href="http-manager/http-manager.html">
<link rel="import" href="authentication-manager/authentication-manager.html">
```

### How to generate documentation of web component
Google's provides automatic tools to auto-generate documentation from code comments.

Here is shown, as example, the iron-ajax documentation:

![autogenerated-docs](https://cloud.githubusercontent.com/assets/1030870/21136872/c29a9a8c-c127-11e6-8e5b-fc8225df7567.png)

Comment written to generate component generic description is:

```
<!--
The `iron-ajax` element exposes network request functionality.
    <iron-ajax
        auto
        url="https://www.googleapis.com/youtube/v3/search"
        params='{"part":"snippet", "q":"polymer", "key": "YOUTUBE_API_KEY", "type": "video"}'
        handle-as="json"
        on-response="handleResponse"
        debounce-duration="300"></iron-ajax>
With `auto` set to `true`, the element performs a request whenever
its `url`, `params` or `body` properties are changed. Automatically generated
requests will be debounced in the case that multiple attributes are changed
sequentially.
Note: The `params` attribute must be double quoted JSON.
You can trigger a request explicitly by calling `generateRequest` on the
element.
@demo demo/index.html
@hero hero.svg
-->
```
Comment written to generate documentation about *activeRequests* property is:
```
/**
 * An Array of all in-flight requests originating from this iron-ajax
 * element.
 */
activeRequests: {
  type: Array,
  notify: true,
  readOnly: true,
  value: function() {
    return [];
  }
},
```

iron-ajax code and documentation is available in the official google portal and repository on github ([code](https://github.com/PolymerElements/iron-ajax/blob/master/iron-ajax.html), [documentation](https://elements.polymer-project.org/elements/iron-ajax))

The documentation page is generated by the [iron-component-page](https://github.com/PolymerElements/iron-component-page). The environment to exploit iron-component-page is set using the component generation tool described in paragraph [How to create a new web component for OWC (generation tool)](#gentool0001).

To deploy the documentation is enough to serve the element folder via http server.
If you want to publish *new-component* documentation in the port 8081, you need to perform these commands:
```
cd <clone_path>/client/owc-client/src/main/frontend/app/
python -m SimpleHTTPServer 8081
```
Then you can take a look at your component documentation opening a browser at this url:

```
http://localhost:8081/elements/new-component/
```


**Note**: be careful about dependencies inclusion of bower_components folder.
This is documentation page outcome:

![auto-docs](https://cloud.githubusercontent.com/assets/1030870/21138202/435af3a6-c12d-11e6-885d-3e8625d4078f.png)
