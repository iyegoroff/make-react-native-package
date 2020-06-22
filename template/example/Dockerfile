FROM iyegoroff/ubuntu-node-android-git:{{#if usesJetpackCompose}}2{{else}}1{{/if}}

RUN mkdir /package
COPY . /package
WORKDIR /package/example

RUN npm i --unsafe-perm
RUN npm run generate:android:bundle
RUN rm -rf node_modules/.bin && rm -rf ../node_modules/.bin
RUN cd android && ./gradlew assembleRelease
