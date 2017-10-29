var urlJoin = require('url-join')
var assert = require('assert')
var xtend = require('xtend')
var path = require('path')
var xhr = require('xhr')

module.exports = expose

function expose (datUrl) {
  return function plugin (state, emitter, app) {
    try {
      var archive = new DatArchive(datUrl || window.location.toString())
    } catch (err) {
      return noArchive()
    }

    var fs = makeDatFs(archive)

    state.events = state.events || { }
    state.dropout = {
      loaded: false,
      saving: false,
      error: '',
      library: { },
      config: {
        microservice: '',
        dateformat: 'mmmm dS'
      },
      dat: { }
    }

    state.events.DROPOUT_WRITEPAGE = 'dropout-writepage'
    state.events.DROPOUT_DELETEPAGE = 'dropout-deletepage'
    state.events.DROPOUT_SAVEPAGE = 'dropout-savepage'

    emitter.on(state.events.DOMCONTENTLOADED, loaded)
    emitter.on(state.events.DROPOUT_WRITEPAGE, writePage)
    emitter.on(state.events.DROPOUT_DELETEPAGE, deletePage)
    emitter.on(state.events.DROPOUT_SAVEPAGE, savePage)

    async function loaded () {
      var config = await archive.readFile('/dropout.json')

      state.dropout.config = xtend(state.dropout.config, JSON.parse(config))
      state.dropout.dat = await archive.getInfo()
      state.dropout.loaded = true

      refresh()
    }

    async function refresh () {
      var input = await fs.readdir(state.dropout.config.directory)

      input
        .filter(file => !/(^[.#]|(?:__|~)$)/.test(file))
        .forEach(async function (file) {
          var content = await readPage(file)
          state.dropout.library[file] = content
          emitter.emit(state.events.RENDER)
        })
    }

    async function readPage (basename) {
      var dirParent = path.join(state.dropout.config.directory, basename)
      var content = await archive.readFile(path.join(dirParent, 'index.json'))
      return JSON.parse(content)
    }

    async function writePage (data) {
      assert.equal(typeof data, 'object', 'DROPOUT_WRITEPAGE arg1 data must be type object')
      assert.equal(typeof data.basename, 'string', 'DROPOUT_WRITEPAGE arg1 data.basename must be type string')

      var dirParent = path.join(state.dropout.config.directory, data.basename)
      var dataPage = state.dropout.library[data.basename]
      var pageExists = !!dataPage
      var dataOutput = xtend(dataPage, data)

      if (!pageExists) await fs.mkdir(dirParent)
      await fs.writeFile(path.join(dirParent, 'index.json'), JSON.stringify(dataOutput, { }, 2))
      state.dropout.saving = false
      state.dropout.library[data.basename] = dataOutput
    }

    async function deletePage (data) {
      assert.equal(typeof data, 'object', 'DROPOUT_DELETEPAGE arg1 data must be type object')
      assert.equal(typeof data.basename, 'string', 'DROPOUT_DELETEPAGE arg1 data.basename must be type string')

      var dirParent = path.join(state.dropout.config.directory, data.basename)

      await fs.rmdir(dirParent, { recursive: true })
      delete state.dropout.library[data.basename]
      if (data.redirect) emitter.emit(state.events.PUSHSTATE, data.redirect)
    }

    async function savePage (data) {
      assert.equal(typeof data, 'object', 'DROPOUT_SAVEPAGE arg1 data must be type object')
      assert.equal(typeof data.url, 'string', 'DROPOUT_SAVEPAGE arg1 data.url must be type string')

      state.dropout.saving = true
      emitter.emit(state.events.RENDER)

      xhr.post({
        url: state.dropout.config.microservice,
        body: 'url=' + data.url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }, function (err, resp, body) {
        state.dropout.saving = false
        if (err) {
          emitter.emit(state.events.RENDER)
          throw err
        }
        var response = JSON.parse(body, { }, 2)
        await writePage(response)
        if (typeof data.callback === 'function') data.callback(response)
        if (data.render !== false) emitter.emit(state.events.RENDER)
      })
    }

    function noArchive () {
      state.dropout = false
      emitter.emit(state.events.RENDER)
    }
  }
}

function makeDatFs (archive) {
  return {
    readFile: readFile,
    writeFile: writeFile,
    readdir: readdir,
    mkdir: mkdir,
    rmdir: rmdir,
    unlink: unlink,
    stat: stat
  }
    
  async function readFile (dir, opts) {
    return await archive.readFile(dir, opts)
  }

  async function writeFile (dir, data) {
    return await archive.writeFile(dir, data)
  }

  async function readdir (dir, opts) {
    return await archive.readdir(dir, opts)
  }

  async function mkdir (dir, opts) {
    return await archive.mkdir(dir, opts)
  }

  async function rmdir (dir, opts) {
    return await archive.rmdir(dir, opts)
  }

  async function unlink (dir) {
    return await archive.unlink(dir)
  }

  async function stat (dir) {
    return await archive.stat(dir)
  }
}