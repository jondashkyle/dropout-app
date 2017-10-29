<h1 align="center">dropout-beaker</h1>

dropout of the centralized web and drop into beaker

## customizing

The webapp is built with [`choo`](https://github.com/choojs/choo), a super lightweight and understandable front-end framework. Open your site directory in terminal and run `npm install`. The site’s source is contained in `src/`, and can be hacked away however you’d like.

You can also adjust the design of the page content without being required to install and run any build process. Just edit `content.css` and you’re golden!

## known bugs

Want to contribute? Please do! Alternatively, donations and funding are being accepted for dedicating time to designing and developing the features you’d like to see. Get in touch if you’re curious.

### Image assets do not load

Beaker requires all connections to be over https, preventing external assets such as images from being loaded over http. Of course this is desired functionality, and ultimately media assets (images, videos, audio) should be detected and scraped, too. This is a somewhat more extensive feature which will hopefully be added soon.

## todo

- [ ] Scrape image assets (breaks with http)
- [ ] Sticky navigation
- [ ] Search/filter page list
- [ ] Cloning
- [ ] Settings Panel

## change log

### 10/28/2017

First release!