import {MetricsPanelCtrl} from 'app/plugins/sdk';
import _ from 'lodash';
import kbn from 'app/core/utils/kbn';
import TimeSeries from 'app/core/time_series';
import rendering from './rendering';
import legend from './legend';

export class PieChartCtrl extends MetricsPanelCtrl {

  constructor($scope, $injector, $rootScope) {
    super($scope, $injector);
    this.$rootScope = $rootScope;

    var panelDefaults = {
      pieType: 'pie',
      legend: {
        show: true, // disable/enable legend
        values: true
      },
      links: [],
      datasource: null,
      maxDataPoints: 3,
      interval: null,
      targets: [{}],
      dataExists: false,
      cacheTimeout: null,
      nullPointMode: 'connected',
      legendType: 'Under graph',
      aliasColors: {},
      format: 'short',
      valueName: 'current',
      strokeWidth: 1,
      fontSize: '80%',
	  combine: {
	    threshold: 0.0,
	    label: 'Others'
	  }
    };

    _.defaults(this.panel, panelDefaults);
    _.defaults(this.panel.legend, panelDefaults.legend);

    this.events.on('render', this.onRender.bind(this));
    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
  }

  onRender() {
    console.log("On render!");
    console.log(this.series);
    this.data = this.parseSeries(this.series);
  }

  parseSeries(series) {
    return _.map(this.series, (serie, i) => {
      return {
        label: serie.alias,
        data: serie.stats[this.panel.valueName],
        color: this.panel.aliasColors[serie.alias] || this.$rootScope.colors[i]
      };
    });
  }

  onDataReceived(dataList) {
      console.log("Received data!")
      this.series = dataList.map(this.seriesHandler.bind(this));
      this.data = this.parseSeries(this.series);
      this.render(this.data);
      console.log(this.data)
      this.longest = this.findMax(this.data)
      this.longest.label = this.cleanupJobName(this.longest.label)
      this.panel.dataExists = true;
      console.log("max is " + this.longest.data)
    }

    cleanupJobName(name){
      return name.substring(name.indexOf(":") + 1, name.length - 1)
    }

    findMax(jobs) {
      var maxLength = Math.max.apply(Math, jobs.map(function(job){return job.data}))
      console.log("Max is " + maxLength)
      var longestJob = jobs.find((job) => {
        console.log("Job is ")
        console.log(job)
        return job.data == maxLength
      })
      return longestJob
    }

  seriesHandler(seriesData) {
    var series = new TimeSeries({
      datapoints: seriesData.datapoints,
      alias: seriesData.target
    });

    series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
    return series;
  }

  link(scope, elem, attrs, ctrl) {
    rendering(scope, elem, attrs, ctrl);
  }
}

PieChartCtrl.templateUrl = 'module.html';
