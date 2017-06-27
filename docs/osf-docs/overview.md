# OWC Overview

### Introduction to Open Web Components
The **Open Web Components** (**OWC**) is a client side software following the Single Page Application approach, for space data dissemination. The Software is based on Web Components Standard with Polymer v1.0 implementation.

These are the basic principles to be followed for **OWC** development:
- Modularity
- Extensibility
- Customization
- Open Source

The fulfillment of these principles involves the ability to install the same OWC software version on different sites, configuring OWC in order to:
- include different functionalities on different sites
- combine the same functionalities in different ways on different sites.
The following figure is a representation of this concept.

![modularity](https://cloud.githubusercontent.com/assets/1030870/17594167/9f590f5e-5fe8-11e6-9a73-44692ecdfa1a.png)
#### Modularity  
Since **OWC** architecture follows Object Oriented Programming, each component has to be designed and implemented as an independent module. This ensures the possibility to use and integrate easily a module in the main application, since each component is selfstanding and contains everything necessary to execute the desired functionalities.

#### Extensibility
The **OWC** application is extensible, because it-s possible to add new functionalities (i.e. new components) without any impact on existing code. One of the most powerful innovation of Web Components standard is the chance of importing components located everywhere in the web. This implies that is possible to extend the application with:
- internal components, i.e. components located within OWC application
- external components, i.e. components deployed outside OWC application and reachable through an HTTP URL

![ext_int](https://cloud.githubusercontent.com/assets/10920750/23408234/9ff94906-fdc7-11e6-9ff8-6cd6451234cb.png)

The extensibility principle is fully granted following the best practices of this guide for new components development.

#### Customization
Another important aspect of **OWC** is Customization, implemented in terms of:
- menu items (i.e. functionalities) displayed in application menu, which is fully configurable
- data representation, thanks to the possibility to define which kind of information needs to be extracted from a data model and how this information have to be represented
- application theme, which can be saved on browser local storage, allowing each user to configure application according to its preferences
- application language, by means of internationalization support

Customization principle will be detailed deeply in next paragraphs

#### Open Source
**OWC** project is a Open Source project with the goal of creating a community of developers interested in implementing new web components suitable to space products dissemination field.
Thanks to modularity and extensibility principles, components implemented by Open Source community can be dynamically imported in OWC application on the basis of users' needs.

### Components layout management
**OWC** components layout is managed by the navigation-manager component, which is in charge of displaying OWC components inside the browser.
The navigation system makes it possible to present data efficiently and makes it easier for the user to navigate among components, since it pushes components in the navigation stack and displays them horizontally on the screen in the order they are requested by end users.

 OWC navigation-manager component is constituted by a main class, containing the following methods:
 - pushComponent, devoted to create the DOM element of the component to be displayed on main application container and to add to navigation stack the component itself. Input parameters are:
    * component name
    * panel width in pixels
    * panel title
    * a boolean used to choose if close button is to be shown or not (true to hide, false to show)
    * a boolean used to choose if panel is resizible (true to resize, false to fix size)
    * maximun number of times a component can be pushed  
 - popComponent, devoted to remove a component from navigation stack on user request, which in turn implies component removal from main application container. Input parameter is the name of the component to remove.
