<a name="module_QuotaManager"></a>

## QuotaManager
**Example**  
```js
const QuotaManager = require("QuotaManager");const Quota = new QuotaManager(10000, "Quotausage.json");Quota.use("Videos.insert");
```

* [QuotaManager](#module_QuotaManager)
    * [~QuotaManager](#module_QuotaManager..QuotaManager)
        * [new QuotaManager(quota, fileName)](#new_module_QuotaManager..QuotaManager_new)
        * [.fileName](#module_QuotaManager..QuotaManager+fileName)
        * [.quota](#module_QuotaManager..QuotaManager+quota)
        * [.left](#module_QuotaManager..QuotaManager+left)
        * [.initTime](#module_QuotaManager..QuotaManager+initTime)
        * [.clock](#module_QuotaManager..QuotaManager+clock)
        * [.clockInterval](#module_QuotaManager..QuotaManager+clockInterval)
        * [.usage](#module_QuotaManager..QuotaManager+usage)
        * [.local](#module_QuotaManager..QuotaManager+local)
        * [.usageValues](#module_QuotaManager..QuotaManager+usageValues)
        * [.use()](#module_QuotaManager..QuotaManager+use) ⇒ <code>boolean</code>
        * [.canRun()](#module_QuotaManager..QuotaManager+canRun) ⇒ <code>boolean</code>
        * [.checkQuota()](#module_QuotaManager..QuotaManager+checkQuota)
        * [.reset()](#module_QuotaManager..QuotaManager+reset)
        * [.localSync()](#module_QuotaManager..QuotaManager+localSync)
    * [~{function} localSync - Syncs the local copy of usage with current usage()](#module_QuotaManager..{function} localSync - Syncs the local copy of usage with current usage)

<a name="module_QuotaManager..QuotaManager"></a>

### QuotaManager~QuotaManager
**Kind**: inner class of [<code>QuotaManager</code>](#module_QuotaManager)  

* [~QuotaManager](#module_QuotaManager..QuotaManager)
    * [new QuotaManager(quota, fileName)](#new_module_QuotaManager..QuotaManager_new)
    * [.fileName](#module_QuotaManager..QuotaManager+fileName)
    * [.quota](#module_QuotaManager..QuotaManager+quota)
    * [.left](#module_QuotaManager..QuotaManager+left)
    * [.initTime](#module_QuotaManager..QuotaManager+initTime)
    * [.clock](#module_QuotaManager..QuotaManager+clock)
    * [.clockInterval](#module_QuotaManager..QuotaManager+clockInterval)
    * [.usage](#module_QuotaManager..QuotaManager+usage)
    * [.local](#module_QuotaManager..QuotaManager+local)
    * [.usageValues](#module_QuotaManager..QuotaManager+usageValues)
    * [.use()](#module_QuotaManager..QuotaManager+use) ⇒ <code>boolean</code>
    * [.canRun()](#module_QuotaManager..QuotaManager+canRun) ⇒ <code>boolean</code>
    * [.checkQuota()](#module_QuotaManager..QuotaManager+checkQuota)
    * [.reset()](#module_QuotaManager..QuotaManager+reset)
    * [.localSync()](#module_QuotaManager..QuotaManager+localSync)

<a name="new_module_QuotaManager..QuotaManager_new"></a>

#### new QuotaManager(quota, fileName)

| Param | Type | Default |
| --- | --- | --- |
| quota | <code>number</code> | <code>10000</code> | 
| fileName | <code>string</code> | <code>&quot;QuotaUsage.json&quot;</code> | 

<a name="module_QuotaManager..QuotaManager+fileName"></a>

#### quotaManager.fileName
Represents the File destination where Quota usage stats will be stored

**Kind**: instance property of [<code>QuotaManager</code>](#module_QuotaManager..QuotaManager)  
<a name="module_QuotaManager..QuotaManager+quota"></a>

#### quotaManager.quota
Total Quota Available

**Kind**: instance property of [<code>QuotaManager</code>](#module_QuotaManager..QuotaManager)  
<a name="module_QuotaManager..QuotaManager+left"></a>

#### quotaManager.left
Total Quota Left

**Kind**: instance property of [<code>QuotaManager</code>](#module_QuotaManager..QuotaManager)  
<a name="module_QuotaManager..QuotaManager+initTime"></a>

#### quotaManager.initTime
The Time when quota was created

**Kind**: instance property of [<code>QuotaManager</code>](#module_QuotaManager..QuotaManager)  
<a name="module_QuotaManager..QuotaManager+clock"></a>

#### quotaManager.clock
Current Running clock Time in miliseconds

**Kind**: instance property of [<code>QuotaManager</code>](#module_QuotaManager..QuotaManager)  
<a name="module_QuotaManager..QuotaManager+clockInterval"></a>

#### quotaManager.clockInterval
The setInterval thats runs evry half a second( 50ms ) and updates the time

**Kind**: instance property of [<code>QuotaManager</code>](#module_QuotaManager..QuotaManager)  
<a name="module_QuotaManager..QuotaManager+usage"></a>

#### quotaManager.usage
Quota Usage Data

**Kind**: instance property of [<code>QuotaManager</code>](#module_QuotaManager..QuotaManager)  
<a name="module_QuotaManager..QuotaManager+local"></a>

#### quotaManager.local
A copy of Local JSON Data

**Kind**: instance property of [<code>QuotaManager</code>](#module_QuotaManager..QuotaManager)  
<a name="module_QuotaManager..QuotaManager+usageValues"></a>

#### quotaManager.usageValues
The Usage Values of how much quota it will consume per trype of request

**Kind**: instance property of [<code>QuotaManager</code>](#module_QuotaManager..QuotaManager)  
<a name="module_QuotaManager..QuotaManager+use"></a>

#### quotaManager.use() ⇒ <code>boolean</code>
Use the use() method to log the consumption of quota

**Kind**: instance method of [<code>QuotaManager</code>](#module_QuotaManager..QuotaManager)  
**Returns**: <code>boolean</code> - whether the quota is consumed or not  

| Param | Type |
| --- | --- |
| "{requestName}.{MethodName}" | <code>string</code> | 

**Example**  
```js
new QuotaManager(10000, "QuotaUsage.json").use("videos.insert");new QuotaManager(10000, "QuotaUsage.json").use("thumbnails.set");new QuotaManager(10000, "QuotaUsage.json").use("watermarks.set");
```
<a name="module_QuotaManager..QuotaManager+canRun"></a>

#### quotaManager.canRun() ⇒ <code>boolean</code>
Checks whether you can perform a specific api action using your current quota

**Kind**: instance method of [<code>QuotaManager</code>](#module_QuotaManager..QuotaManager)  
**Returns**: <code>boolean</code> - whether you can run the action or not  

| Param | Type |
| --- | --- |
| "{requestName}.{MethodName}" | <code>string</code> | 

**Example**  
```js
new QuotaManager(10000, "QuotaUsage.json").canRun("videos.insert");
```
**Example**  
```js
new QuotaManager(10000, "QuotaUsage.json").canRun("thumbnails.set");
```
<a name="module_QuotaManager..QuotaManager+checkQuota"></a>

#### quotaManager.checkQuota()
Internal Method that checks for Quota Renewablity i.e whether its next day

**Kind**: instance method of [<code>QuotaManager</code>](#module_QuotaManager..QuotaManager)  
**Example**  
```js
new QuotaManager(10000, "QuotaUsage.json").checkQuota;
```
<a name="module_QuotaManager..QuotaManager+reset"></a>

#### quotaManager.reset()
Resets the Quota back to default values and clears the usage

**Kind**: instance method of [<code>QuotaManager</code>](#module_QuotaManager..QuotaManager)  
**Example**  
```js
new QuotaManager(10000, "QuotaUsage.json").reset();
```
<a name="module_QuotaManager..QuotaManager+localSync"></a>

#### quotaManager.localSync()
Syncs the Quota Usage data to a local json file

**Kind**: instance method of [<code>QuotaManager</code>](#module_QuotaManager..QuotaManager)  
**Example**  
```js
new QuotaManager(10000, "QuotaUsage.json").localSync();
```
<a name="module_QuotaManager..{function} localSync - Syncs the local copy of usage with current usage"></a>

### QuotaManager~{function} localSync - Syncs the local copy of usage with current usage()
Manages and keep track of Data

**Kind**: inner method of [<code>QuotaManager</code>](#module_QuotaManager)  
**Author**: Arnav Kumar  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| fileName | <code>string</code> | Name of the file to be used for local storage |
| quota | <code>number</code> | Full Quota |
| left | <code>number</code> | Current Left Quota |
| initTime | <code>number</code> | The Time at whick quota was created (in miliseconds) |
| clock | <code>number</code> | Current Time (in miliseconds) |
| usage | <code>object</code> | Usage of the Quota |
| local | <code>object</code> | Local copy of usage |
| usageValues | <code>object</code> | Object containing the values of quota consumed each type of operation |

**Example**  
```js
const Quota = new QuotaManager();Quota.use("videos.insert");Quota.use("videos.insert");Quota.use("videos.update");Quota.use("videos.delete");Quota.use("watermarks.set");Quota.use("videos.insert");Quota.reset();Quota.use("videos.insert");
```
