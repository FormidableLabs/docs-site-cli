# docs-site-cli
This CLI adds the scaffolding to an existing project to generate static docs sites.

## Installation & Usage
```
npm install -g docs-site-cli

cd my-project
$ docs-site-cli new
$ docs-site-cli build
```

## Commands
```
new                 creates new docs-site scaffolding
build               creates a build

-h, --help          show usage information
-v, --version       version number
```

## Structure
The `docs-site-cli` cli will add these directories to your project. If they already exist, a warning will be thrown.
```
/docs
  index.md
  example-page.md
  example-page-2.md
/docs-site
  index.js
  template.js
```

Default template:
``` template.js
<Header />
  <Sidebar alphabetical />
  <Content>
    {content}
  </Content>
</Footer>
```

- Support `playground`
- Support `react-component`
- Use markdown.it
