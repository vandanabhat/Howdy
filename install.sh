#!/usr/bin/env bash
# Installs and builds the webapp
# requires Node.JS to be preinstalled manually (see https://nodejs.org/en/download/ for details)

npm install -g grunt-cli
npm install -g bower
npm install
bower install
bower install --save mobile-angular-ui
grunt build


#grunt dependensies

#npm install grunt --save-dev
#npm install time-grunt --save
#npm install load-grunt-config --save-dev
#npm install grunt-concurrent --save-dev
#npm install grunt-contrib-clean --save-dev
#npm install grunt-contrib-imagemin --save-dev
#npm install grunt-sass --save-dev
#npm install grunt-contrib-uglify --save-dev
#npm install grunt-contrib-jshint --save-dev
#npm install jshint-stylish --save
#npm install grunt-contrib-watch --save-dev