<h1 align="center">dropout-app</h1>

Dropout of the centralized web and into the p2p web! This is a webapp for using [`dropout`](https://github.com/jondashkyle/dropout) with [Beaker Browser](https://beakerbrowser.com). It’s sort of like your own fully customizable and offline version of Instapaper. In addition to being a fully usable webapp, this might also be a nice peek into Choo architecture and Beaker’s web API.

## usage

First [download and install Beaker Browser](https://beakerbrowser.com/docs/install/), then visit the Dat URL. Once there, click the Fork button in the lower right!

```
dat://dropout.jon-kyle.com
dat://8b79c46e3484ae0f1fbe530711a762214543f2c37c4d323cb523450927b6f042
```

Dropout uses Beaker’s experimental [web api to read and write](https://beakerbrowser.com/docs/apis/) to the Dat archive, which requires you to be connected through `dat://` and not `https://`. If the web api is not available a message is displayed detailing the necessary steps to get going.

[![](http://drop.jon-kyle.com/modules/dropout-beaker-2.png)](http://dropout.jon-kyle.com)

## structure and functionality

### scraping and saving

[Dropout](https://github.com/jondashkyle/dropout) (the module) scrapes a URL and retrieves the document and cleans it up, providing you with only the content. This process requires the [`node-readability`](https://github.com/luin/readability) module.

Sites deployed with Dat and viewable in Beaker are static, meaning they can not execute modules which utilize binaries. The readability module must be run on a server. To get around this limitation a request to an easily [self-deployable microservice](https://github.com/jondashkyle/dropout-service) is made from within the webapp. Of course, this requires an internet connection, however the limitation would be present even if able to run strictly within the client as a request to the page being scraped must be made.

To run you very own instance, simply navigate to [Glitch and click the Fork button](https://glitch.com/edit/#!/melodic-comfort?path=index.js:1:0). Glitch will generate a URL for you. Copy that and open `dropout.json` in the root of your app. Paste it as the value of `microservice`. That’s it!

You might be wondering, “If you can’t run server side code, how do you save data without using localstorage?” What’s awesome about Dat and Beaker is “Everything Is A File.” Beaker’s web api mirrors that of Node’s `fs` module. Saving data is as simple as reading and writing folders and files.

## customization

### design and functionality

The webapp is built with [`choo`](https://github.com/choojs/choo), a super lightweight and understandable front-end framework. Open your site directory in terminal and run `npm install`. The site’s source is contained in `src/`, and can be hacked away however you’d like.

You can also adjust the design of the page content without being required to install and run any build process. Just edit `content.css` and you’re golden!

### privacy

With Beaker, it’s possible to see the source files of your Dropout library. It’s also possible to fork/clone your full site. These are great features, but sometimes it’s nice to keep things private. To do so, just add the `content` directory to `.datignore`.

## known bugs

Want to contribute? Please do! Alternatively, donations and funding are being accepted for dedicating time to design and development of features you’d like to see. Get in touch if you’re curious.

### image assets do not load

Beaker requires all connections to be over https, preventing external assets such as images from being loaded over http. Of course this is desired functionality, and ultimately media assets (images, videos, audio) should be detected and scraped, too. This is a somewhat more extensive feature which will hopefully be added soon.

## elsewhere

- Set in [Cotham](https://github.com/sebsan/Cotham) by Sebastien Sanfilippo of [Love Letters](http://www.love-letters.be/)

## todo

- [ ] General design
- [ ] Scrape image assets (breaks with http)
- [ ] Search/filter page list
- [ ] Settings Panel
- [ ] Mark as read when reaching bottom of page
- [ ] Keyboard shortcuts
- [ ] Swap out arrow icons for non sf-mono svgs

## change log

### 10/28/2017

First release! Apart from making the damn thing there were these other items:

- [x] Sticky navigation
- [x] Deploy on server and add dat
- [x] Show fork instead of add if not Dat Owner
- [X] Cloning/Forking UI
