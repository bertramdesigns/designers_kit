# Scripts

**ToC**

- [init](#init)
- [random_id](#random_id)

## init

Configures a fresh install of appwrite. This script will use the `./.env` and `./appwrite/template.appwrite.json` files to configure a project and database with the keys, permissions, collections, and attributes. The script requires the docker container to be running with appwrite installed.

`init.sh` copies and executes `init/create_user.php` on the docker container. Then the Appwrite CLI pushes the schema `./appwrite.json`, which configures the server. <!-- TODO: Within the project, this is also used to shape the types for the frontend. -->

### node scripts

```json
{
  "appwrite:init": "pnpm run appwrite:init:user && pnpm run appwrite:init:schema && pnpm run appwrite:init:db",
  "appwrite:init:user": "sh ./appwrite/scripts/init/init.sh",
  "appwrite:init:schema": "node ./appwrite/scripts/init/generate_schema.cjs",
  "appwrite:init:db": "node ./appwrite/scripts/init/appwrite_cli_push_schema.js"
}
```

#### Explanation

Appwrite doesnt really allow for you to configure a server outside a CI/CD pipeline. It also requires you to set your user credentials manually (on web console) the first time.

To get around this, we make the same calls as a user registration from web within the appwrite container, calling the PHP SDK from the vendor files in the container. This first login defaults to Admin. Then we create an organization (team) and associate the user with it.

The script `generate_schema.cjs` populates `./appwrite.json` based on `./appwrite/template.appwrite.json` and the `./.env` variables, placing the resulting file in the root directory so the Appwrite CLI sees it.

Then we use the Appwrite CLI with `./appwrite/appwrite_cli_push_schema.js` to login with these new credentials and initialize the project and databases.

- Note: There is a bug in the Appwrite CLI that forces you to go through an interactive shell when creating a project. The workaround is to use 'projects' instead of 'project'.

From here the init script will automatically force the schema in `appwrite.json` to the server and create a new platform and API key.

Together this mimics a fresh install and doing everything manually.

#### Cavaets of the create_user.php script

In the appwrite/appwrite container there are vendor files that contains a PHP autoload (`/usr/src/code/vendor`). This configures the PHP SDK, but it is not the complete one from the docs (it is version 1.4.0 from what I can tell). You can read the files for what is available in the `/vendor/appwrite/appwrite/` directory in the `appwrite/appwrite` container.

The best way is to make a REST call using the PHP client when you don't need headers back (i.e. the session cookie), simply using `$client->addHeader()` and/or `$client->call()`. If you need the headers back, you need to do a curl request.

If there is something new needing to be called, it is best to spin up an instance and try to do the action on the web console. Before doing the action, open up the inspector network tab and record the action. Use it as a guide to make the request.

## random_id

Random ID is a script pulled from the Appwrite CLI library. It is a javascript recreation of php's [uniqid](https://www.php.net/manual/en/function.uniqid.php). It is not a guaranteed unique ID, but it is unique enough for our purposes.

For convenience, the script can be run using `pnpm run appwrite:id` to return a random ID.

### node scripts

```json
{
  "appwrite:id": "node ./appwrite/scripts/random_id/generate_id.cjs"
}
```
