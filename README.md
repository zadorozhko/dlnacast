# dlnacast

Cast local or streaming media to your TV through UPnP/DLNA.
Based on thibauts [node-upnp-mediarenderer-client](https://github.com/thibauts/node-upnp-mediarenderer-client).
A fork of Simon Kusterer[xat]/[dlnacast](https://github.com/xat/dlnacast).
Thanks to Miroslav Rudišin [miero](https://github.com/miero).

### usage

```
dlnacast [--type <mime>] [--address <tv-ip>] [--subtitle <file>] <file>
dlnacast [--type <mime>] [--address <tv-ip>] --stream <stream>
dlnacast --listRenderer
```
<stream> is a casting url or m3u8 playlist.
### installation

`npm install dlnacast -g`


## License
MIT
