# Homepagerizer

Make simple, fast homepages completely for free. [Try it for yourself](https://homepagerizer.vercel.app/)!

- HTML, JavaScript, and CSS all in one file, so it loads fast (and technically doesn't require an Internet connection!).
- MIT-licensed code, so you can change it however you want.
- No ads or tracking whatsoever.

Note that Homepagerizer does _not_ provide hosting for your homepage. The output of Homepagerizer is an HTML file.

## Usage

First, go to https://homepagerizer.vercel.app/. Features like adding links or rows should be straightforward.

- **Using the homepage you've made**: after clicking the "Save" button at the upper right of the page, you'll get an `.html` file. Follow the instructions for your browser for how to make that file your homepage:
  - [Chrome](https://support.google.com/chrome/answer/95314)
  - [Firefox](https://support.mozilla.org/en-US/kb/how-to-set-the-home-page)
  - [Safari](https://support.apple.com/guide/safari/change-your-homepage-ibrw1020/mac)
  - [Edge](https://support.microsoft.com/en-us/microsoft-edge/change-your-browser-home-page-a531e1b8-ed54-d057-0262-cc5983a065c6)
- **Editing your homepage**: either click the "Import existing homepage" button at the upper left of [Homepagerizer](https://homepagerizer.vercel.app/) or click "Edit Homepage" at the bottom of your resulting homepage. Make your edits, then save the homepage again, ideally overwriting your original `.html` file so that you don't need to update your browser's homepage location again.
- **Changing the text size**: use your browser's zoom feature for this. For most browsers, you can press ctrl+plus (or ⌘plus) to zoom in. You need to do this for [Homepagerizer itself](https://homepagerizer.vercel.app/) _and_ for your resulting homepage.
- **Rearranging links**: simply drag a link onto any other link to relocate it. You can even do this between rows.
- **Rearranging rows**: drag by the "handle" on the left of a row to relocate it.
- **Setting the font**: the font you customize under "Font Family" can be any font on your own machine, e.g. "Times New Roman", "Verdana", "[Hack](https://sourcefoundry.org/hack/)", or even something generic [like these](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family).
- **Text-only items**: if you _don't_ set a URL on an item, it will render as text, and it will get the "Text Color" property that you choose. This can be helpful for setting categories (e.g. "Social media:", "Videos/movies:", etc.).
- **Clearing a keyboard shortcut**: if you set a keyboard shortcut for a link that you'd like to remove, start setting a new shortcut and press **backspace**.
- **Non-https protocols**: typing something like `example.com` will create a link that navigates to `https://example.com`. If you want to override this (e.g. for `http://localhost:3000`), explicitly type a protocol in.

## Why use this over bookmarks or my browser's new-tab page?

Most browsers display your frequently visited links on the new-tab page. If you're happy with that, then by all means, continue to use it!

I've been using a Homepagerizer-esque homepage for ~17-18 years now, and here's where I see the benefits:

- **Everything is where you expect it**: the new-tab page changes over the years, links move around, and it differs between browsers. It's nice to have links exactly where you put them. You develop a muscle memory for the links you want to open.
- **More in-your-face than bookmarks**: I am more likely to curate my homepage than my sprawling list of bookmarks.
- **Show less-frequently used links**: sometimes you forget that a site even exists. Alternatively, maybe you're trying to build a habit either by adding a link you want to visit frequently or removing one that you visit _too_ often.
- **Opening many links**: I sometimes middle-click 3-4 links from my homepage to open them all in new tabs. I know about bookmark folders, but the links I open aren't always in the same grouping every time.
- **Keyboard shortcuts**: Homepagerizer lets you assign keyboard shortcuts to your links. Being able to press alt+home to go to my homepage and then press a keyboard shortcut to go to an obscure link is amazing!

## Random notes

- **Small text**: the small-text checkbox is there for long links or for keyboard-driven links. For example, I like to set my mail to "m", calendar to "c", etc. Since I mostly use the keyboard, there's no need to make those links take up a lot of space.
- **Case-sensitive keyboard shortcuts**: hotkeys are case-sensitive, so "a" and "A" are different even though they may appear to be the same within a link.
- **Changing the new-tab page _into_ your homepage**: at least in Chrome, this is only possible via [an extension](https://chrome.google.com/webstore/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna). Keep in mind that opening your homepage via the new-tab keyboard shortcut will require you to press tab before you can use Homepagerizer's keyboard shortcuts (since the focus will be on your browser's address bar).
- **Ideas for links to include**: email, calendar, social media, banking, search, media (e.g. YouTube, Netflix), and any links you tend to forget.

## Development

### Building and running

Requirements: Node.js and NPM.

- Clone this repo
- `npm install`
- `npm run dev`
- Navigate to localhost:3000

### Hand-editing the resulting HTML

The homepage isn't resilient to hand edits. For example, if you wanted to customize the CSS of the resulting page, you would essentially be forking your editable homepage.

### Adding images to the homepage

While it would be possible to add this, there are a couple of reasons why I don't plan on allowing images:

- **Export/import flow**: exporting the homepage consists of serializing all customized properties into JSON. Images would fall into this category of data to be serialized. Given that the images could be thumbnails, they could be gzipped, base64-encoded blobs that make it into the JSON. To import this JSON blob, query params are used, and each browser has its own limit on query-param length. Space could be saved by storing a _URL_ to the image and cropping parameters, but then the images have to be fetched every time the homepage is loaded.
- **Development burden**: designing it and developing it would take time, and I've already spent a good chunk of time making Homepagerizer.

## Credits

- Code: Adam13531 - [Twitch](https://twitch.tv/Adam13531) | [Discord](https://discord.gg/AdamLearns)
- Design by Steven McCurrach - [Site](https://stevenmccurrach.com/) | [Twitter](https://twitter.com/WebBooooy)
