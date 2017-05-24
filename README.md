# iisnode_azure_recycle
Sample express/pouchdb app used to illustrate iisnode recycling issue. Steps are as follows:

- Deploy the code as is to an azure app service slot.
- Open Process Explorer, either in the Azure dashboard or in Kudu.
    - Your job is to, after each command, refresh the process list and observe any changes to the running node instance's details, especially PID.
- Using a curl command to get all dbs (as shown below), grab a list of all dbs.
```
curl -X GET https://<mysite>.azurewebsites.net/_all_dbs
```

Here's what I observed: after every (or nearly every) GET, iisnode recycles the existing node instance and creates a new one. Frankly, I don't understand why.

In contrast, running the same sample locally (on Sierra in my case) works fine - no crashes, no indication that we would need recycled.
