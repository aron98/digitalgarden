---
{"dg-publish":true,"permalink":"/portfolio/projects/seat-mapp/","metatags":["description: \"SeatMapp is a simple and affordable seat reservation platform for small businesses and startups. With a focus on ease of use and tenant separation, SeatMapp offers a cost-effective alternative to traditional reservation systems. Learn more about its features, pricing, and development story.\"","\"og:image\": \"https://macrosaas.me/img/seatmapp-preview.jpeg\""],"created":"2025-05-30 17:32"}
---


At my 'real' work, we had a service for reserving seats (*I will not name it, as I don't talk shit about others, I'll call it Reserve.ly*). It is a good concept. Organisations who don't want to have designated desks for their employees, but want them to be able to organize where they sit can buy this service.
It's good for both the employer and employee. Employers don't need to deal with the overhead of having a space for everyone, and also they get to see office room usage statistics, easier home office administration. Employees can make sure that they have a space ready for them on the day they want to go in.

However I always got the feeling, that the developers of Reserve.ly really wanted a lot of features, but on the way they forgot simplicity. For 90% of the use cases the following is enough:
- Organisations can add floor-plans, add seats and meeting rooms to it.
- Basic user management / sso.
- Employees can reserve these resources for a time interval in a date.
- Users can see on the floor-plan if a seat / meeting room is available on a day they want to go in.
- I can also see an api being useful in some cases.
Thats it. If an app has these capabilities, with simplicity kept in mind, I would call it a success. Unfortunately neither Reserve.ly, nor any of its competitors can achieve to have these features and keeping it simple.

Another thing that bothers me is the pricing model for these apps. I have to give credit to Reserve.ly, it is the most friendly model, but even so here's what I find annoying in this industry:
- Has minimum amount of users (eg. You have to pay for 50 users even if you only have 10 people in your startup).
- Per user prices range from 2€ to 5€ per month, which I find crazy.
- Limits a lot of functionalities if not on a premium plan, which can cost up to 10€ per person per month. On Reserve.ly for example user role management is in this category (!!!)
My problem is not about their plans. I do believe that a good customer service and sophisticated features accommodate a lot of big businesses well. But small 10-50 employee organisations are rightfully getting frustrated.

# This is where SeatMapp comes in

I know, the name is really cheesy, but I was very tired when I came up with it. It is a small and simple application, but it has everything a small business needs, most importantly tenant separation and GDPR compliance.
In addition since I am the only developer, and the app is pretty lightweight, I am able to work on it and host it pretty easily bringing the costs drastically down.
But what does it do?

## Straightforward Seat and Zone reservation

I believe that in 99% of cases, seat and zone reservations should be done in max 2 clicks.
My solution does just this. There are 4 default time interval presets, but the user can pick a custom time to reserve it.
Of course, the users can delete their own reservations.

![easy reservation and details](/img/user/Portfolio/images/reservation.gif)

## Easy Resource Management

The administration of floor-plans, seats and zones is self explanatory.  Simply head over to the admin area to add a floor-plan to your organisation.

![simply add the floor plan](/img/user/Portfolio/images/add-floorplan.gif)

Once uploaded, you can head over to the resource management area to add seats and zones.

![add seats](/img/user/Portfolio/images/adding-seats.gif)

![adding zones](/img/user/Portfolio/images/adding-zone.gif)

# Stack

For this whole project I'm relying on the Cloudflare Workers and Pages stack, for multiple reasons:
- Very scaleable and a very generous hosting plan.
- Security
- Amazing Cloudflare resources (KV, D1)
It is surprisingly easy to get started with this platform. You will find a lot of posts about the whole developer experience on CLoudflare on my blog in the upcoming weeks.

One of the best features Cloudflare has to offer is the binding between workers and resources. It removes all of the overhead of trying to fit together the pieces and simplifies it what I can only compare to putting together a lego set.

# Pricing model

With Cloudflare's generous prices I will be able to give organisations and startups a 1€ / user / month fee, no matter how many users you would have. And as I disagree with penalizing smaller companies, there will never be another price category for more advanced features. You get everything. 

# Project status

Although the application I working well, even with tenant separation, it is not ready to be released yet. I am still working on the automatic provisioning and payment system implementation. If you're interested, join the launch newsletter on [seatm.app](https://seatm.app). Of course being on the list will allow you to test out the application before the official release and get a discount price.