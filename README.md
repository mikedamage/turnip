# Turnip 💡

Monitor sensors and execute actions based on their readings.

## About

Turnip monitors data sources (sensors), reading values from them at user-defined intervals. It uses rules to decide what
to do based on the readings.

It was initially built with temperature control in mind, but it's flexible enough to be used for any application where
simple decisions need to be made based on current conditions.

## Installation

TODO

## Configuration

Turnip is configured via a JSON file that has the following sections:

- `socket`: a UNIX domain socket to listen for control commands on. Used by `tufwctl` to interact with a running `tufwd` process.
- `sensors`: an array of objects naming and configuring data sources
- `outputs`: an array of objects naming and configuring "outputs" - e.g. GPIO pins, scripts to run, etc.
- `rules`: an array containing rule objects describing what to do when sensors return particular values

### Example Config

```json
{
  "socket": "/tmp/tufw.sock",
  "sensors": [
    {
      "name": "thermometer",
      "driver": "ds18b20",
      "options": {
        "scale": "F",
        "basePath": "/sys/bus/w1/devices",
        "path": "28-041652dd05ff"
      }
    }
  ],
  "outputs": [
    {
      "name": "heatLamp",
      "driver": "relay",
      "options": {
        "pin": 25,
        "onValue": 0
      }
    }
  ],
  "rules": [
    {
      "threshold": 32,
      "comparison": "lte",
      "interval": "5m",
      "sensor": "thermometer",
      "immediate": true,
      "action": {
        "output": "heatLamp",
        "state": "on"
      }
    }
  ]
}
```

## Usage

Turnip starts up in the foreground by default, to make it easier to run as a systemd service. By default it will look for a config file at `$XDG_CONFIG_PATH/turnip/config.json`.