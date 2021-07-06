# Final branch - start your TODO App here

## Objectives
* Provide a fullstack development example using Astra as the storage backend

## 1. Retrieve application token to securely connect to the database

Use the token you previously generated. If you no longer have the token and did not download a .csv, you can generate a new token using [the instructions above](#2-create-a-security-token)

## 2. Configure Environment Variables and Install Dependencies

✅ Create `.env` file

In the repository directory run the following command  to set up your Astra environment.  Note that this does require Node 15 and NPM 7 to work.  You can install a node version manager like `nvm` or `n` to use multiple versions on your system.
```bash
npm exec astra-setup todos_workshop_db todos_keyspace
```

👩‍💻  Install all the packages

```bash
npm install -g netlify-cli
```

## 3. Launch your app
  * Run the application 
  ```
  netlify dev
  ```
  * The application should automatically launch in the GitPod preview pane