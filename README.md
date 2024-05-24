# dlnacast

Cast local or streaming media to your TV through UPnP/DLNA.
Based on thibauts [node-upnp-mediarenderer-client](https://github.com/thibauts/node-upnp-mediarenderer-client).
A fork of Simon Kusterer (xat)/[dlnacast](https://github.com/xat/dlnacast).
Thanks to Miroslav Rudišin (miero)/(https://github.com/miero).

### Usage

```
dlnacast [--type <mime>] [--address <tv-ip>] [--subtitle <file>] <file>
dlnacast [--type <mime>] [--address <tv-ip>] --stream <stream>
dlnacast --listRenderer
```
My zoo looks like this:
```
iMedia: http://192.168.88.254:38388/deviceDescription/MediaRenderer
ATV_254: http://192.168.88.254:49153/description.xml
EZCast: http://192.168.88.230:60099/
```
stream is a casting url or m3u8 playlist.
tv-ip is a device name or http://ip-address:port from listRenderer command.

### Installation

`npm install dlnacast -g`


## License
MIT
