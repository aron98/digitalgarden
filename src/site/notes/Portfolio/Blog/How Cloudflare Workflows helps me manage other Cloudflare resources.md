---
{"dg-publish":true,"permalink":"/portfolio/blog/how-cloudflare-workflows-helps-me-manage-other-cloudflare-resources/","metatags":["description: \"Learn how Cloudflare Workflows simplifies managing Cloudflare resources, such as creating DNS records and adding custom domains to Pages projects, with a focus on reliability, retry mechanisms, and extensive logging.\"","\"og:image\": \"https://static-assets.seatm.app/Cloudflare%20Workflows.webp\""],"created":"2025-06-04 17:33"}
---

I've spoken about this before and will speak about this again probably, but I find the Cloudflare Stack wonderful. It is perfect for experimenting, building prototypes, removing a lot of overhead from a security and deployment perspective. It is also super fast and it has a very generous free tier. Definitely check it out.
I've been experimenting with Workers and Pages quite a lot in the last few days (you can check out the result [[Portfolio/Projects/seatm.app\|seatm.app]]), but I had a big problem.
# Pages don't like wildcard subdomains

I was messing around with a full tenant separation functionality in my app and the root point of the separation is the different subdomains that the users might connect from. For example users logging into *Tenant 1* might log in from `tenant-1.seatm.app`, while for another tenant, *Tenant 2* might login from `tenant-2.seatm.app`.
This is pretty easy to implement on the code side. You identify an organisation by the subdomain and take a look at the user's saved organisation. If it matches great, if not, then you handle the error.
The problem is, that currently Cloudflare Pages can't handle having a wildcard domain pointing at it. From the [Known Issues Page](https://developers.cloudflare.com/pages/platform/known-issues/#enable-access-on-your-pagesdev-domain):

![no custom wildcard domain](/img/user/Portfolio/images/cf-pages-wildcard.png)

This means the domains have to be manually added by a user on the Cloudflare Dashboard. Or you can...

# Manage Cloudflare Resources through the API

There is an extensive documentation about the [Cloudflare API](https://developers.cloudflare.com/api/). All you need to do is create an API Token - preferably an account token. To do this you can select what the token has access to. I won't go too much into details, but for my purposes the following settings were enough:

![cloudflare api settings](/img/user/Portfolio/images/cloudflare-api-settings.png)

This way I could access the two endpoints with my key:
- Create new DNS records for the `seatm.app` domain
- Add custom domain to the pages project.

Now that I had the endpoints, I wanted to create a worker which can safely call these apis, with a failsafe, retry mechanism, and extensive logging. This is where Cloudflare Workflows comes in.

# What are Cloudflare Workflows

From the [Cloudflare Workflows Documentation](https://developers.cloudflare.com/workflows/):

> Workflows is a durable execution engine built on Cloudflare Workers. They allow you to build multi-step applications that can automatically retry, persist state and run for minutes, hours, days, or weeks. It introduces a programming model that makes it easier to build reliable, long-running tasks, observe as they progress, and programatically trigger instances based on events across your services.

The gist of it is that you can define steps, output a status for a workflow run, with all of the retry and other overhead handled by Cloudflare.
It consist of an EntryPoint and multiple WorkflowSteps. In my case I added a step to create a CNAME record pointing towards my Pages in the first step, and if it doesn't fail, then add that subdomain to the Pages Project as a custom domain in the next step. If a step does fail, it fails gracefully, and you can tailor the output to your needs.

```JavaScript
import { WorkflowEntrypoint, WorkflowEvent, WorkflowStep } from "cloudflare:workers"

type Params = {}

// Create your own class that implements a Workflow
export class MyWorkflow extends WorkflowEntrypoint<Env, Params> {
	// Define a run() method
	async run(event: WorkflowEvent<Params>, step: WorkflowStep) {
	
		// Define one or more steps that optionally return state.
		step.do("create-dns-record", async () => {
			// Call to Cloudflare API
		})
		
		step.do("add-pages-domain", async () => {
			// Call to Cloudflare API
		})
	}
}
```

I also added some validation steps, just to be safe. 
And thats it. It's as simple as that.

# Observability
Cloudlfare also provides a very nice logging system in the dashboard. Here you can check out specific runs and statuses.

![list of workflow runs](/img/user/Portfolio/images/workflows-bulk.png)

You can check out a specific run to see the steps:

![step by step workflow status for specific run](/img/user/Portfolio/images/specific-workflow-run.png)

# Conclusion

Before starting this project I didn't have a use-case for a Workflow, but since then I'm wondering whether a lot of other processes can be moved to this architecture. I would think any multi-step feature should be implemented in a Workflow rather than a Worker.

I hope you found this useful, and I will be coming back, with some more Cloudflare content.