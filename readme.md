<h1 align="center">dropout-beaker</h1>

Dropout of the centralized web and drop into Beaker Browser, a p2p web browser. This is an interface for using `dropout` within Beaker. It uses a self-deployable microservice ([`dropout-service`](https://github.com/jondashkyle/dropout-service)) to scrape pages and return the results to Beaker.

## usage

Visit either:

- [https://dropout.jon-kyle.com](https://dropout.jon-kyle.com)
- [dat://dropout.jon-kyle.com](dat://dropout.jon-kyle.com)
- [dat://0167c188c2de9bc68ca4cc9b8543e00952f9920c4b7d987a70b2e2fd4a7158e2/](dat://0167c188c2de9bc68ca4cc9b8543e00952f9920c4b7d987a70b2e2fd4a7158e2/)

![](http://drop.jon-kyle.com/modules/dropout-beaker-2.png)

## customization

The webapp is built with [`choo`](https://github.com/choojs/choo), a super lightweight and understandable front-end framework. Open your site directory in terminal and run `npm install`. The site’s source is contained in `src/`, and can be hacked away however you’d like.

You can also adjust the design of the page content without being required to install and run any build process. Just edit `content.css` and you’re golden!

## known bugs

Want to contribute? Please do! Alternatively, donations and funding are being accepted for dedicating time to design and development of features you’d like to see. Get in touch if you’re curious.

### Image assets do not load

Beaker requires all connections to be over https, preventing external assets such as images from being loaded over http. Of course this is desired functionality, and ultimately media assets (images, videos, audio) should be detected and scraped, too. This is a somewhat more extensive feature which will hopefully be added soon.

## elsewhere

- Set in [Cotham](https://github.com/sebsan/Cotham) by Sebastien Sanfilippo of [Love Letters](http://www.love-letters.be/)

## todo

- [ ] Scrape image assets (breaks with http)
- [ ] Search/filter page list
- [ ] Cloning/Forking UI
- [ ] Reset
- [ ] Settings Panel
- [ ] Prev/Next in footer
- [ ] Mark as read when reaching bottom of page
- [ ] Keyboard shortcuts

## change log

### 10/28/2017

First release! Apart from making the damn thing there were these other items:

- [x] Sticky navigation
- [x] Deploy on server and add dat