const fs = require("fs");
const { cwd } = process;
const { join } = require("path");
/** 
 * @module QuotaManager
 * @example
 * const QuotaManager = require("QuotaManager");
 * const Quota = new QuotaManager(10000, "Quotausage.json");
 * Quota.use("videos.insert");
 */

/** 
 * Manages and keep track of Data
 * @author Arnav Kumar
 * @class QuotaManager
 * @property {string} fileName  - Name of the file to be used for local storage  
 * @property {number} quota - Full Quota
 * @property {number} left - Current Left Quota
 * @property {number} initTime - The Time at whick quota was created (in miliseconds)
 * @property {number} clock - Current Time (in miliseconds)
 * @property {object} usage - Usage of the Quota
 * @property {object} local - Local copy of usage
 * @property {object} usageValues - Object containing the values of quota consumed each type of operation
 * @method {function} use - Consumes the quota as per given method name
 * @method {function} canRun - Checks whether a operation can be using the current left quota
 * @method {function} checkQuota - checks for Quota Renewablity i.e whether its next day
 * @method {function} reset - resets the quota to default values
 * @method {function} localSync - Syncs the local copy of usage with current usage
 * @example
 * const Quota = new QuotaManager();
 * Quota.use("videos.insert");
 * Quota.use("videos.insert");
 * Quota.use("videos.update");
 * Quota.use("videos.delete");
 * Quota.use("watermarks.set");
 * Quota.use("videos.insert");
 * Quota.reset();
 * Quota.use("videos.insert");
 */
class QuotaManager {
  /**
   * 
   * @param {number} quota 
   * @param {string} fileName 
   */
  constructor(quota = 10000, fileName = "QuotaUsage.json") {
    /**
     * Represents the File destination where Quota usage stats will be stored
     */
    this.fileName = fileName;
    /**
     * Total Quota Available
     */
    this.quota = quota;
    /**
     * Total Quota Left
     */
    this.left = this.quota;
    /**
     * The Time when quota was created
     */
    this.initTime = new Date().getTime(); // The Time when quota was created
    /**
     * Current Running clock Time in miliseconds
     */
    this.clock = new Date().getTime();
    /**
     * The setInterval thats runs evry half a second( 50ms ) and updates the time
     */
    this.clockInterval = setInterval(() => {
      this.clock = new Date().getTime();
    }, 500); // Checks time every half second
    /**
     * Quota Usage Data
     */
    this.usage = {};
    /**
     * A copy of Local JSON Data
     */
    this.local = {};
    if (!fs.existsSync(this.fileName)) {
      fs.writeFileSync(this.fileName, JSON.stringify({
        totalQuota: this.quota,
        quotaLeft: this.left,
        initTime: this.initTime,
        syncTime: this.clock,
        fileName: this.fileName,
        usage: {

        }
      }, null, 2));
      this.local = require(join(cwd(), fileName));
    }
    else {
      this.local = require(join(cwd(), fileName));
      this.usage = this.local.usage ?? this.usage;
      this.quota = this.local.totalQuota ?? this.quota;
      this.left = this.local.quotaLeft ?? this.left;
      this.initTime = this.local.initTime ?? this.initTime;
      this.fileName = this.local.fileName ?? this.fileName;
    }
    /**
     * The Usage Values of how much quota it will consume per trype of request
     */
    this.usageValues = {
      activities: {
        list: 1,
        update: 0,
        insert: 0,
        delete: 0,
        markAsSpam: 0,
        setModerationStatus: 0,
        rate: 0,
        getRating: 0,
        reportAbuse: 0,
        set: 0,
        unset: 0
      },
      captions: {
        list: 50,
        update: 450,
        insert: 400,
        delete: 50,
        markAsSpam: 0,
        setModerationStatus: 0,
        rate: 0,
        getRating: 0,
        reportAbuse: 0,
        set: 0,
        unset: 0
      },
      channelBanners: {
        list: 0,
        update: 0,
        insert: 50,
        delete: 0,
        markAsSpam: 0,
        setModerationStatus: 0,
        rate: 0,
        getRating: 0,
        reportAbuse: 0,
        set: 0,
        unset: 0
      },
      channels: {
        list: 1,
        update: 50,
        insert: 0,
        delete: 0,
        markAsSpam: 0,
        setModerationStatus: 0,
        rate: 0,
        getRating: 0,
        reportAbuse: 0,
        set: 0,
        unset: 0
      },
      channelSections: {
        list: 1,
        update: 50,
        insert: 50,
        delete: 50,
        markAsSpam: 0,
        setModerationStatus: 0,
        rate: 0,
        getRating: 0,
        reportAbuse: 0,
        set: 0,
        unset: 0
      },
      comments: {
        list: 1,
        update: 50,
        insert: 50,
        delete: 50,
        markAsSpam: 50,
        setModerationStatus: 50,
        rate: 0,
        getRating: 0,
        reportAbuse: 0,
        set: 0,
        unset: 0
      },
      commentThreads: {
        list: 1,
        update: 50,
        insert: 50,
        delete: 0,
        markAsSpam: 0,
        setModerationStatus: 0,
        rate: 0,
        getRating: 0,
        reportAbuse: 0,
        set: 0,
        unset: 0
      },
      guideCategories: {
        list: 1,
        update: 0,
        insert: 0,
        delete: 0,
        markAsSpam: 0,
        setModerationStatus: 0,
        rate: 0,
        getRating: 0,
        reportAbuse: 0,
        set: 0,
        unset: 0
      },
      i18nLanguages: {
        list: 1,
        update: 0,
        insert: 0,
        delete: 0,
        markAsSpam: 0,
        setModerationStatus: 0,
        rate: 0,
        getRating: 0,
        reportAbuse: 0,
        set: 0,
        unset: 0
      },
      i18nRegions: {
        list: 1,
        update: 0,
        insert: 0,
        delete: 0,
        markAsSpam: 0,
        setModerationStatus: 0,
        rate: 0,
        getRating: 0,
        reportAbuse: 0,
        set: 0,
        unset: 0
      },
      members: {
        list: 1,
        update: 0,
        insert: 0,
        delete: 0,
        markAsSpam: 0,
        setModerationStatus: 0,
        rate: 0,
        getRating: 0,
        reportAbuse: 0,
        set: 0,
        unset: 0
      },
      membershipsLevels: {
        list: 1,
        update: 0,
        insert: 0,
        delete: 0,
        markAsSpam: 0,
        setModerationStatus: 0,
        rate: 0,
        getRating: 0,
        reportAbuse: 0,
        set: 0,
        unset: 0
      },
      playlistItems: {
        list: 1,
        update: 50,
        insert: 50,
        delete: 50,
        markAsSpam: 0,
        setModerationStatus: 0,
        rate: 0,
        getRating: 0,
        reportAbuse: 0,
        set: 0,
        unset: 0
      },
      playlists: {
        list: 1,
        update: 50,
        insert: 50,
        delete: 50,
        markAsSpam: 0,
        setModerationStatus: 0,
        rate: 0,
        getRating: 0,
        reportAbuse: 0,
        set: 0,
        unset: 0
      },
      search: {
        list: 100,
        update: 0,
        insert: 0,
        delete: 0,
        markAsSpam: 0,
        setModerationStatus: 0,
        rate: 0,
        getRating: 0,
        reportAbuse: 0,
        set: 0,
        unset: 0
      },
      subscriptions: {
        list: 1,
        update: 0,
        insert: 50,
        delete: 50,
        markAsSpam: 0,
        setModerationStatus: 0,
        rate: 0,
        getRating: 0,
        reportAbuse: 0,
        set: 0,
        unset: 0
      },
      thumbnails: {
        list: 0,
        update: 0,
        insert: 0,
        delete: 0,
        markAsSpam: 0,
        setModerationStatus: 0,
        rate: 0,
        getRating: 0,
        reportAbuse: 0,
        set: 50,
        unset: 0
      },
      videoAbuseReportReasons: {
        list: 1,
        update: 0,
        insert: 0,
        delete: 0,
        markAsSpam: 0,
        setModerationStatus: 0,
        rate: 0,
        getRating: 0,
        reportAbuse: 0,
        set: 0,
        unset: 0
      },
      videoCategories: {
        list: 1,
        update: 0,
        insert: 0,
        delete: 0,
        markAsSpam: 0,
        setModerationStatus: 0,
        rate: 0,
        getRating: 0,
        reportAbuse: 0,
        set: 0,
        unset: 0
      },
      videos: {
        list: 1,
        update: 50,
        insert: 1600,
        delete: 50,
        markAsSpam: 0,
        setModerationStatus: 0,
        rate: 50,
        getRating: 1,
        reportAbuse: 50,
        set: 0,
        unset: 0
      },
      watermarks: {
        list: 0,
        update: 0,
        insert: 0,
        delete: 0,
        markAsSpam: 0,
        setModerationStatus: 0,
        rate: 0,
        getRating: 0,
        reportAbuse: 0,
        set: 50,
        unset: 50
      }
    }
  }
  /**
   * Use the use() method to log the consumption of quota
   * @param {string} "{requestName}.{MethodName}"
   * @example new QuotaManager(10000, "QuotaUsage.json").use("videos.insert");
   * new QuotaManager(10000, "QuotaUsage.json").use("thumbnails.set");
   * new QuotaManager(10000, "QuotaUsage.json").use("watermarks.set");
   * @returns {boolean} whether the quota is consumed or not
   */
  use(methodName) {
    var request, method;
    try {
      request = methodName.trim().split(".")[0];
      method = methodName.trim().split(".")[1];
      if (!this.usageValues.hasOwnProperty(request)) {
        throw new Error("[Quota Manager]: " + request + " is not in the lists of requests!");
      }
      if (!this.usageValues[request].hasOwnProperty(method)) {
        throw new Error("[Quota Manager]: " + method + " is not in the lists of methods in " + request);
      }
      if (!this.canRun(methodName)) {
        return console.log("[Quota Manager]: There aren't sufficient units in quota to use for the operation: " + methodName);
      }
      this.left -= parseInt(this.usageValues[request][method]);
      if (this.usage[request] && this.usage[request].hasOwnProperty(method)) {
        this.usage[request][method] += parseInt(this.usageValues[request][method]);
      }
      else {
        if (!this.usage[request]) {
          this.usage[request] = {};
        }
        this.usage[request][method] = parseInt(this.usageValues[request][method]);
      }
      this.localSync();
      console.log("[Quota Manager]: Successfully Used " + this.usageValues[request][method] + " Units from the quota using method: " + methodName + " \nCurrent Quota left: " + this.left);
      return true;
    }
    catch (e) {
      if (!e.toString().startsWith("[Quota Manager]:")) {
        throw new Error("[Quota Manager]: " + "You have to provide paramater in the form \"${requestName}.${methodName}\" \n\nError: " + e);
      }
      return false;
    }
  }
  /**
   * Checks whether you can perform a specific api action using your current quota 
   * @param {string} "{requestName}.{MethodName}"
   * @example new QuotaManager(10000, "QuotaUsage.json").canRun("videos.insert");
   * @example new QuotaManager(10000, "QuotaUsage.json").canRun("thumbnails.set");
   * @returns {boolean} whether you can run the action or not
   */
  canRun(methodName) {
    var request, method;
    try {
      request = methodName.trim().split(".")[0];
      method = methodName.trim().split(".")[1];
      if (!this.usageValues.hasOwnProperty(request)) {
        throw new Error("[Quota Manager]: " + request + " is not in the lists of requests!");
      }
      if (!this.usageValues[request].hasOwnProperty(method)) {
        throw new Error("[Quota Manager]: " + method + " is not in the lists of methods in " + request);
      }
      const quotaRequired = this.usageValues[request][method];
      if ((this.left - quotaRequired) < 0) {
        // console.log("[Quota Manager]: There aren't sufficient units in Quota to use for the operation: " + methodName);
        return false;
      }
      else {
        return true;
      }
    }
    catch (e) {
      if (!e.toString().startsWith("[Quota Manager]:")) {
        throw new Error("[Quota Manager]: " + "You have to provide paramater in the form \"${requestName}.${methodName}\" \n\nError: " + e);
      }
    }
  }
  /**
   * Internal Method that checks for Quota Renewablity i.e whether its next day
   * @example new QuotaManager(10000, "QuotaUsage.json").checkQuota;
   */
  checkQuota() {
    if (this.clock == (this.initTime + 24 * 60 * 60 * 100)) {
      // Quota Renewed
      this.reset();
    }
    // OR
    // var hours = date.getHours();
    // if(hours == 12){
    //   this.reset();
    // }
  }
  /**
   * Resets the Quota back to default values and clears the usage
   * @example new QuotaManager(10000, "QuotaUsage.json").reset();
   */
  reset() {
    this.local = {
      totalQuota: this.quota,
      quotaLeft: this.quota,
      initTime: this.initTime,
      syncTime: this.clock,
      fileName: this.fileName,
      usage: {}
    }
    fs.writeFileSync(this.fileName, JSON.stringify(this.local, null, 2));
    console.log("[Quota Manager]: Quota Successfully Reseted at " + new Date().toString());
  }
  /**
   * Syncs the Quota Usage data to a local json file
   * @example new QuotaManager(10000, "QuotaUsage.json").localSync();
   */
  localSync() {
    this.local.usage = this.usage;
    this.local = {
      totalQuota: this.quota,
      quotaLeft: this.left,
      initTime: this.initTime,
      syncTime: this.clock,
      fileName: this.fileName,
      usage: this.usage
    }
    fs.writeFileSync(this.fileName, JSON.stringify(this.local, null, 2));
  }
}

module.exports = QuotaManager;