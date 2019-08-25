### Run debug version
```bash
$ npm i
$ npm run run:android
```

### Build signed release apk with Docker
- Generate keystore `npm run generate:android:signing-key`
- Open `android/gradle.properties` file and replace `qwerty`s with your passwords
- Run `npm run build:release:docker` - upon script completion apk will be copied to `{{paramCase appName}}.apk` file
