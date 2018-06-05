# json-log-stream

JSON log stream processor

## Install

```
$ npm install -g json-log-stream
```

## How to Use

### Create proc.js

```js
module.exports = async (item) => {
  // filter
  if (item.target === 'my_require') {
    return item;
  }
}
```

### Run command

```
$ gunzip -c application-json.log.gz | jls proc.js > output_json.log
```