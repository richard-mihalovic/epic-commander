#!/bin/sh

PROJECT_HOME=/tmp/epic_release
THIS=`pwd`

rm -rf $PROJECT_HOME
mkdir $PROJECT_HOME

rm -rf _RELEASE_
mkdir _RELEASE_

node_modules/webpack/bin/webpack.js --config webpack.config.release.js -p --define process.env.NODE_ENV=production --progress --colors
cp dist/app.js $PROJECT_HOME
cp main.js $PROJECT_HOME
cp index.html $PROJECT_HOME/index.html
cp package.json $PROJECT_HOME
sed -i '' 's/<script src="http:\/\/localhost:8080\/webpack-dev-server.js"><\/script>//g' $PROJECT_HOME/index.html
sed -i '' 's/http:\/\/localhost:8080\/built\/bundle.js/app.js/g' $PROJECT_HOME/index.html

cd $PROJECT_HOME
npm install electron-prebuilt

cd $THIS/
node_modules/electron-packager/cli.js $PROJECT_HOME --all --out _RELEASE_
rm -rf dist
rm -rf $PROJECT_HOME
