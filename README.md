# Foundation-6-Wordpress
This repo is made to kickstart your Wordpress Theme development.
It uses bower and npm for dependency management and gulp as a task runner.
I am trying to keep it as DRY as possible.

## Installation
Run the following from your terminal:

```bash
git clone https://github.com/Dev-Force/Foundation-6-Wordpress
cd Foundation-6-Wordpress
npm install
bower install
```
After that follow the instruction on https://github.com/Automattic/_s to name your theme. (Actually renaming _s to 'theme name' to all the template files).

Then edit the gulp file and change BrowserSync Proxy at 'serve' task to the one that serves your needs (or you can delete that line completely) and start gulp either with or without the flag production to start the local server like so:

```bash
gulp serve
gulp serve --production
```

## P.S.
Wordpress functions are setup so that they use the production version of ur theme.