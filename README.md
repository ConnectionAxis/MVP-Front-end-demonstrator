# MVP-Front-end-demonstrator

### GitHub Pages

[GitHub Pages](https://pages.github.com/) is designed to host your personal, organization, or project pages from a GitHub repository.

* ConnectionAxis info landing page - [connectionaxis.github.io/conax](https://connectionaxis.github.io/conax/)
* ConnectionAxis MVP - [connectionaxis.github.io/mvp](https://connectionaxis.github.io/mvp/)

#### GitHub Pages config and deploy

The project was built assuming it is hosted at [/mvp/](https://connectionaxis.github.io/mvp).  
You can control this with the homepage field in your package.json.  

The build folder is ready to be deployed.  
To publish it at [https://connectionaxis.github.io/mvp](https://connectionaxis.github.io/mvp), run:  

  `yarn add --dev gh-pages`

Add the following script in your package.json.  
```
    // ...
    "scripts": {
      // ...
      "predeploy": "yarn build",
      "deploy": "gh-pages -d build"
    }
```

Then run:  

  `yarn run deploy`  

Find out more about deployment here: [bit.ly/CRA-deploy](http://bit.ly/CRA-deploy)