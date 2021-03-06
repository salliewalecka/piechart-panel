To Run Grafana
grafana-server --config=/usr/local/etc/grafana/grafana.ini --homepath /usr/local/share/grafana cfg:default.paths.logs=/usr/local/var/log/grafana cfg:default.paths.data=/usr/local/var/lib/grafana cfg:default.paths.plugins=path/to/repo
Use the new grafana-cli tool to install piechart-panel from the commandline:

```
grafana-cli plugins install grafana-piechart-panel
```

The plugin will be installed into your grafana plugins directory; the default is /var/lib/grafana/plugins if you installed the grafana package.

More instructions on the cli tool can be found [here](http://docs.grafana.org/v3.0/plugins/installation/).

You need the lastest grafana build for Grafana 3.0 to enable plugin support. You can get it here : http://grafana.org/download/builds.html

## Alternative installation method

It is also possible to clone this repo directly into your plugins directory.

Afterwards restart grafana-server and the plugin should be automatically detected and used.

```
git clone https://github.com/grafana/piechart-panel.git
sudo service grafana-server restart
```


## Clone into a directory of your choice

If the plugin is cloned to a directory that is not the default plugins directory then you need to edit your grafana.ini config file (Default location is at /etc/grafana/grafana.ini) and add this:

```ini
[plugin.piechart]
path = /home/your/clone/dir/piechart-panel
```

Note that if you clone it into the grafana plugins directory you do not need to add the above config option. That is only
if you want to place the plugin in a directory outside the standard plugins directory. Be aware that grafana-server
needs read access to the directory.

# Changelog

## 1.1.4
* Add support for combining small slices (https://github.com/grafana/piechart-panel/pull/43)
* Add option to show percentage in legend https://github.com/grafana/piechart-panel/pull/41

## 1.0.2

* Add piechart piece divider setting
* Remove Unused code
* Adds fontsize option for labels on graph
* Only show the displaied piechart value in legend
* Add possibility to pick stat to use for piechart

