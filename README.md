<!--- STARTEXCLUDE --->
# JAMStack + Netlify + Astra + Cassandra 📒
*10 minutes, Beginner, [Start Building](https://github.com/DataStax-Examples/todo-astra-jamstack-netlify#prerequisites)*

This is an example React To-Do application using a [DataStax Astra](https://astra.datastax.com/register?utm_source=devplay&utm_medium=github&utm_campaign=todo-astra-jamstack-netlify) free tier database.
<!--- ENDEXCLUDE --->

![image](https://monosnap.com/image/Fv0yPAznbeNJD3vYlQfztME6yogzFT)

## Objectives
* Provide a fullstack development example using Astra as the storage backend

## How this works
Once the Astra credentials are provided, the necessary tables are created in the database. The webservice will be available on port 8080 once the application has been deployed.

[JAMstack](https://jamstack.org/) is a big leap forward in how we can write web applications that are easy to write, deploy, scale, and also maintain. Using this approach means that newly created content is rendered from a content API, while a static render of it is being built into the site for future.

<!--- STARTEXCLUDE --->
# Running JAMStack + Netlify + Astra + Cassandra 
Follow the instructions below to get started.

## Prerequisites
* git installed on your local system
* github account
* [node 15 and npm 7 or later](https://www.whitesourcesoftware.com/free-developer-tools/blog/update-node-js/)

## Getting Started
Let's do some initial setup by creating a serverless(!) database.

1. **Login/Register**
Click the button to login or register with Datastax.
- <a href="https://astra.datastax.com/register?utm_source=github&utm_medium=referral&utm_campaign=todo-astra-jamstack-netlify"><img src="https://dabuttonfactory.com/button.png?t=Create+Astra+Database&f=Calibri-bold&ts=20&tc=fff&hp=40&vp=10&c=8&bgt=unicolored&bgc=6fa8dc" /></a>
- <details><summary>Show me!</summary>
    <img src="https://github.com/datastaxdevs/workshop-spring-stargate/raw/main/images/tutorials/astra-create-db.gif?raw=true" />
</details>

**Use the following values when creating the database**
|Field| Value|
|---|---|
|**database name**| `netlify` |
|**keypace**| `todos` |
|**Cloud Provider**| *Use the one you like, click a cloud provider logo,  pick an Area in the list and finally pick a region.* |


2. **Deploy to Netlify**
- <details><summary> What does the netlify deploy button do?</summary>The Netlify deploy button will:<ul>
    <li>Create a new repository for you on Github</li>
    <li>Create a site on Netlify</li>
    <li>Link the two together.</li></ul>
</details>

- Click the button to deploy:
  [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/synedra/netlify-astra-example)
 * <details><summary>Show me!</summary>
    <img src="https://github.com/datastaxdevs/workshop-spring-stargate/raw/main/images/tutorials/astra-create-token.gif?raw=true" />
    </details>

This will take a few minutes.

  * Click on `Site deploy in progress`, 
    <details>
    <summary>Show me! </summary>
    <img src="/images/deploy-1.png" />
    </details>

  * Click the top deploy link to see the build process.
    <details>
    <summary>Show me! </summary>
    <img src="/images/deploy-2.png" />
    </details>

  * Wait until the build complete `Netlify Build Complete`,  **When you see Pushing to repository** you're ready to move on.
    <details>
    <summary>Show me! </summary>
    <img src="/images/deploy-3.png" />
    </details>

  * Scroll up to the top and click on the site name (it'll be after {yourlogin}'s Team next to the Netlify button).
    <details>
    <summary>Show me! </summary>
    <img src="/images/deploy-4.png" />
    </details>

3. **Clone your GitHub repository**

  * Click on the `GitHub` in `Deploys from GitHub` to get back to your new repository.  Scroll to where you were in the README.
    <details>
    <summary>Show me! </summary>
    <img src="/images/deploy-5.png" />
    </details>

  * Clone this repository to your local system by clicking the `Code` button, 
    <details>
    <summary>Show me! </summary>
    <img src="/images/deploy-6.png" />
    </details>

  * Copying the link, and running in a terminal
    ```bash
    git clone {repo_link}
    ```
    <details>
    <summary>Show me! </summary>
    <img src="/images/deploy-7.png" />
    </details>

  * Change into your repository directory 
  ```bash
  cd netlify-astra-example
  ```

7. In the repository directory

```bash
npm install
npm install -g netlify-cli
```

8. In the repository directory run the following command  to set up your Astra environment.  Note that this does require Node 15 and NPM 7 to work.  You can install a node version manager like `nvm` or `n` to use multiple versions on your system.
```
npm exec astra-setup netlify todos
```

<details>
<summary>What does astra-setup do?</summary>
    To setup your ASTRA instance, you want to run `npm exec astra-setup`

    This will do the following:
    * Have you go to your [Astra Database](https://datastx.io/workshops) to register or login. There is no credit card required to sign up. The 'Pay as you go' option gives you a huge amount of transactions for free:
        * 30 million reads
        * 5 million writes
        * 40 gigabytes of storage
    * Give steps to grab a Database Administrator Token and paste it into the input field
    * Ask you what database you want to use (default, existing, create)
    * Create or access the database
    * Create/update an .env file in the project root
    * Create/update an .astrarc file in your home directory
        * This can be used by httpie-astra `pip3 install httpie-astra`
        * It can also be used by the @astra/collections and @astra/rest node modules

    ## Specify the database and keyspace
    You can run the script and tell it which database/keyspace to use by using:
    `npm exec astra-setup databasename keyspacename`
</details>


9. Next you will run some commands to connect netlify to your site.
      * `npm install -g netlify-cli`
      * `netlify login` - this will pop up a browser to authenticate with netlify.  
      * `netlify link` - this will link your workspace to the associated site
      * `netlify env:import .env` - this will take the .env file created by astra-setup and upload it to netlify.
      * Run the application `netlify dev` and open http://localhost:8080 to view your application:
      * `netlify deploy`
      * `netlify open:site` - will launch a browser with your new site on Netlify


### Things to Note:
 - The contents of this repo are based on [Jake's port](https://github.com/tjake/todo-astra-react-serverless/) of the [TodoMVC code](https://github.com/tastejs/todomvc/tree/master/examples/react) originally written by [Pete Hunt](https://github.com/petehunt).
 - The example is modified from https://github.com/huksley/todo-react-ssr-serverless.
<!--- ENDEXCLUDE --->
