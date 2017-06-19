## Customizing Behavior with Settings

Behavior of your Auth0 Extend installation is controlled with a large number of installation-wide settings. The most commonly adjusted settings are listed below. If you are interested in customizing settings of your installation, or explore more advanced configuration options, please contact [support](#support). 

* **inactivity_timeout** (default: 30 seconds): time after which a webtask container with no new incoming execution requests is subject to recycling. This setting also implies the longest lifetime of any single webtask execution you are guaranteed. You may want to increase this if your webtasks take longer than 30 seconds to run. 

* **life_timeout** (default: 20 minutes): maximum time after which any webtask container (active or not) is subject to recycling. You may want to decrese this timeout as a mitigation of unintended leaks in your users' code or any of the modules they depend on. 

* **max_code_length** (default: 100KB): Maximum length of webtask code. You may want to increase this to accommodate larger webtasks. 

* **quarantine_timeout** (default: 5 seconds): Time span during which a container that was inorderly terminated by the webtask code (e.g. due to uncaught exception) is put under quarantine. During this time all requests targeting subject container are be rejected with HTTP 429. This timeout prevents badly written user code that executes frequently from exhausting system resources. 

* **tripwire_timeout** (default: 2 seconds): Maximum time user code is allowed to block Node.js event loop before it is considered run-away and terminated. This prevents run-away user code from exhausting computing resources. You may want to increase this in specialized cases of CPU-intensive workloads. **NOTE** run-away code will put the container it is running in under quarantine when it is terminated. 

* **cron_max_jobs_per_container** (default: 10): Maximum number of CRON jobs that can be created in a single container. 

There are many more configuration options that address advanced scenarios and specialized workloads. Please [contact support](#support) with questions. 
