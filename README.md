# SASSERPLATE


## main.scss

* variables - colors, fonts (with imports), sizes
* helpers - additional classes
* typography - default fonts, margins and colors
* forms - forms
* layouts - page layouts, main sections
* components - elements inside main sections
* vendor - css for vendor libraries
* media-queries 
* print


We can add additional files like:
* buttons - buttons
* tables - tables
* alerts - alerts
* popups - popups


## Requirements
============
1. node & npm
2. ruby & compass
3. **grunt-cli** node package installed globally:
`npm install -g grunt-cli`

## Installation
============

```shell
cd package_directory
npm install
```

## Grunt Tasks
============

### Default Task 

This task is used for development. 
What it does?
1. Compiles src/sass files into CSS (static/css).
2. Copies src/js files into JS (static/js).
3. Running LiveReload that allows refreshing CSS files without browser refresh [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch#optionslivereload).
4. Running local sever of static files [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect).

```shell
grunt
```

#### Options

##### Port

Type: `Integer`  
Default: `8000`

The port on which the webserver will respond. The task will fail if the specified port is already in use. You can use the special values `0` or `'?'` to use a system-assigned port.

```shell
grunt --port 8011
```

### Compress Task

This task will optymalize (compress) images.

```shell
grunt compress
```

### Compile Task

This task will only compile SASS (src/sass) files into CSS files (static/css).

```shell
grunt compile
```

### Uglify Task

This task will uglify and compress javascripts from src/js into static/js/app.min.js.

```shell
grunt uglify
```
