<!--- STARTEXCLUDE --->
# TODO + Astra + Cassandra 📒
*10 minutes, Beginner, [Start Building](https://github.com/DataStax-Examples/todo-astra-jamstack-netlify#prerequisites)*

This is an example React To-Do application using a [DataStax Astra](https://dtsx.io/appdev-7-7) free tier database.
<!--- ENDEXCLUDE --->

![image](https://monosnap.com/image/Fv0yPAznbeNJD3vYlQfztME6yogzFT)

## 🎯 Objectives
* Create a "from scratch" **React** app using NPX
* Learn about **React** components and how they are used to dynamically update the DOM with new information
* Learn how **state** and **props** changes are used
* Learn how to use Swagger to interact with the database using a **REST** API 
* Leverage Netlify and DataStax Astra DB

## ℹ️ Frequently asked questions ℹ️ 

- *Can I run the workshop on my computer?*

> There is nothing preventing you from running the workshop on your own machine.
> If you do so, you will need
> * git installed on your local system
> * [node 15 and npm 7 or later](https://www.whitesourcesoftware.com/free-developer-tools/blog/update-node-js/)
>
> You will have to adapt commands and paths based on your environment and install the dependencies by yourself. **We won't provide support** to keep on track with schedule. However, we will do our best to give you the info you need to be successful.

- *What other prerequisites are there?*
> * You will need a github account
> * You will also need an Astra DB account, but we'll work through that in the exercises
> * Use **Chrome** or **Firefox** for the best experience. Other browsers are great, but don't work well with the GitPod integration we use a bit later.

- *Do I need to pay for anything for this workshop?*
> * **No.** All tools and services we provide here are FREE.

- *Will I get a certificate if I attend this workshop?*

> Attending the session is not enough. You need to complete the homework detailed below and you will get a nice badge.

## Materials for the Session

It doesn't matter if you join our workshop live or you prefer to do at your own pace, we have you covered. In this repository, you'll find everything you need for this workshop:

- [Slide deck](./slides/slides.pdf)
- [Discord chat](https://bit.ly/cassandra-workshop)
- [Questions and Answers](https://community.datastax.com/)

## Homework

<img src="https://user-images.githubusercontent.com/23346205/124651231-a7e99400-de68-11eb-9f3f-ab6b88da0cdf.png?raw=true" width="200" align="right" />

Don't forget to complete your upgrade and get your verified skill badge! Finish and submit your homework!

1. Complete the practice steps from this repository as described below. Take a screenshot of each completed step. One screen per section is fine. **DO NOT post your Astra token!**
2. Create a **React** app from scratch using NPX
3. Launch the TODO starter app, connect it to the database, and display your changes from the database
5. Submit your homework [here](https://github.com/datastaxdevs/appdev-week1-todolist/issues/new?assignees=HadesArchitect%2C+SonicDMG%2C+RyanWelford&labels=homework%2C+wait+for+review&template=homework-assignment.md&title=%5BHW%5D+%3CNAME%3E)

That's it, you are done! Expect an email next week!
  
# Let's start
Let's do some initial setup by creating a serverless(!) database.

## 1. Login or Register to AstraDB and create database
**`ASTRADB`** is the simplest way to run Cassandra with zero operations at all - just push the button and get your cluster. No credit card required, $25.00 USD credit every month, roughly 5M writes, 30M reads, 40GB storage monthly - sufficient to run small production workloads.  

### ✅ Step 1a: Click the button to login or register with Datastax. You can use your `Github`, `Google` accounts or register with an `email`.

_Make sure to chose a password with minimum 8 characters, containing upper and lowercase letters, at least one number and special character_

<a href="https://dtsx.io/appdev-7-7"><img src="https://github.com/datastaxdevs/workshop-graphql-netflix/blob/main/img/create_astra_db.png?raw=true" /></a>
- <details><summary>Show me!</summary>
    <img src="https://github.com/datastaxdevs/workshop-spring-stargate/raw/main/images/tutorials/astra-create-db.gif?raw=true" />
</details>

**Use the following values when creating the database**
|Field| Value|
|---|---|
|**database name**| `todos_workshop_db` |
|**keypace**| `todos_keyspace` |
|**Cloud Provider**| *Use the one you like, click a cloud provider logo,  pick an Area in the list and finally pick a region.* |

_You can technically use whatever you want and update the code to reflect the keyspace. This is really to get you on a happy path for the first run._

You will see your new database `pending` in the Dashboard.

![image](https://github.com/datastaxdevs/workshop-graphql-netflix/blob/main/tutorial/images/db-pending.png?raw=true)

The status will change to `Active` when the database is ready, this will only take 2-3 minutes. You will also receive an email when it is ready.

[🏠 Back to Table of Contents](#table-of-contents)

## 2. Create a security token

✅  **Step 2a:**  [Create a token for your app](https://docs.datastax.com/en/astra/docs/manage-application-tokens.html) to use in the settings screen. Use "Database Administrator" permission.

✅  **Step 2b:**  Copy the token value (eg `AstraCS:KDfdKeNREyWQvDpDrBqwBsUB:ec80667c....`) in your clipboard and save the CSV, this value would not be provided afterward.

**👁️ Expected output**
- <details><summary>Show me!</summary>
    <img src="https://github.com/datastaxdevs/workshop-graphql-netflix/blob/main/tutorial/images/astra-create-token.gif?raw=true" />
</details>

[🏠 Back to Table of Contents](#table-of-contents)

## 3. Create a table with REST API using Swagger

✅  **Step 3a:** Open **Swagger** by 
1. Click on your active database
2. Click `Connect` TAB
3. Click `REST API`
4. Clik link to your swagger endpoint.

*As show on the picture below.*
![image](https://user-images.githubusercontent.com/23346205/124656913-d28b1b00-de6f-11eb-9712-e7629f5b8867.png?raw=true)

✅  **Step 3b:** In GraphQL Playground, **Populate HTTP HEADER** variable `x-cassandra-token` on the bottom of the page with your token as shown below

![image](img/graphql-playground.png?raw=true)

✅  **Step 3c:** In GraphQL Playground, create a table with the following mutation, making sure to replace `netflix_keyspace` if you used a different name:

- Copy the following mutation on the left panel
```json
{
  "name": "restfromreadme_by_id",
  "ifNotExists": true,
  "columnDefinitions": [
    {
      "name": "id",
      "typeDefinition": "uuid",
      "static": false
    },
    {
      "name": "text",
      "typeDefinition": "text",
      "static": false
    },
    {
      "name": "key",
      "typeDefinition": "text",
      "static": false
    },
        {
          "name": "completed",
          "typeDefinition": "boolean"
        }
  ],
  "primaryKey": {
    "partitionKey": [
      "id"
    ]
  }
}
```
* Use the arrow in the middle of the screen to execute the query

![image](tutorial/images/playground-1.png?raw=true)

[🏠 Back to Table of Contents](#table-of-contents)

## 4. Insert data in the Table with the REST API using Swagger

✅  **Step 4a:** In graphQL playground, change tab to now use `graphql`. Edit the end of the URl to change from `system` to the name of your keyspace: `netflix_keyspace`

✅  **Step 4b:** Populate **HTTP HEADER** variable `x-cassandra-token` on the bottom of the page with your token as shown below (again !! yes this is not the same tab)

![image](img/graphql-playground-2.png?raw=true)

✅  **Step 4c:** In GraphQL Playground,populate the `reference_list` table with the following values

- Copy the following mutation on the left panel

```json
{"id":"57dbd260-d905-11eb-b985-c522859819b9","completed":false,"text":"TODO FROM README","key":"none"}
```

* Use the arrow in the middle of the screen to execute the query

[🏠 Back to Table of Contents](#table-of-contents)

## 5. Retrieving list of values

✅  **Step 5a:** In GraphQL Playground, not changing tab (yeah) list values from the table with the following query.

```yaml
query getAllGenre {
    reference_list (value: {label:"genre"}) {
      values {
      	value
      }
    }
}
```

*👁️ Expected output*
![image](img/graphql-playground-3.png?raw=true)

[🏠 Back to Table of Contents](#table-of-contents)

## 6. Launch GitPod IDE
- Click the button to launch the GitPod IDE from **YOUR** repository.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/datastaxdevs/appdev-week1-todolist/)

## 7. Retrieve application token to securely connect to the database

Use the token you previously generated. If you no longer have the token and did not download a .csv, you can generate a new token using [the instructions above](#2-create-a-security-token)

You will also need the GraphQL Endpoint for your keyspace.
First, go to the Astra DB connect page for your database.
![graphql-endpoint-1](tutorial/images/graphql-keyspace-url-01.png)
Then scroll down to find the endpoint for your keyspace.
![graphql-endpoint-1](tutorial/images/graphql-keyspace-url-02.png)

## 8. Configure Environment Variables and Install Dependencies

✅ Create `.env` file

In the repository directory run the following command  to set up your Astra environment.  Note that this does require Node 15 and NPM 7 to work.  You can install a node version manager like `nvm` or `n` to use multiple versions on your system.
```bash
npm exec astra-setup todos_workshop_db todos_keyspace
```

👩‍💻  Install all the packages

```bash
npm install -g netlify-cli
```

## 9. Launch your app
  * Run the application 
  ```
  netlify dev
  ```
  * The application should automatically launch in the GitPod preview pane

### Things to Note:
 - The contents of this repo are based on [Jake's port](https://github.com/tjake/todo-astra-react-serverless/) of the [TodoMVC code](https://github.com/tastejs/todomvc/tree/master/examples/react) originally written by [Pete Hunt](https://github.com/petehunt).
 - The example is modified from https://github.com/huksley/todo-react-ssr-serverless.
<!--- ENDEXCLUDE --->
