import {Component, ViewChild} from '@angular/core';



import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexXAxis,
  ApexLegend,
  ApexTitleSubtitle
} from "ng-apexcharts";
import {data} from "../anayltics-data/revenue";

export type ChartOptions = {
  series: any;
  chart: any;
  dataLabels: any;
  markers: any;
  title: any;
  fill: any;
  yaxis: any;
  xaxis: any;
  tooltip: any;
  stroke: any;
  annotations: any;
  colors: any;
  toolbar: any;
  grid: any;
  plotOptions: any;
  legend: any;
};

export type ChartOptionsFunnel = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  colors: string[];
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

export type ChartOptionsDonut = {
  series: any;
  chart: any;
  responsive: any;
  labels: any;
  fill: any;
  legend: any;
  dataLabels: ApexDataLabels;
};

type UpdateOptionsData = {
  "1m": { xaxis: { min: number; max: number } };
  "6m": { xaxis: { min: number; max: number } };
  "1y": { xaxis: { min: number; max: number } };
  "1yd": { xaxis: { min: number; max: number } };
  all: { xaxis: { min: undefined; max: undefined } };
};

@Component({
  selector: 'app-reporting-dashboard',
  templateUrl: './reporting-dashboard.component.html',
  styleUrls: ['./reporting-dashboard.component.scss']
})
export class ReportingDashboardComponent {
  @ViewChild("chart", {static: false}) chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  public activeOptionButton = "all";
  public updateOptionsData: UpdateOptionsData = {
    "1m": {
      xaxis: {
        min: new Date("28 Jan 2013").getTime(),
        max: new Date("27 Feb 2013").getTime()
      }
    },
    "6m": {
      xaxis: {
        min: new Date("27 Sep 2012").getTime(),
        max: new Date("27 Feb 2013").getTime()
      }
    },
    "1y": {
      xaxis: {
        min: new Date("27 Feb 2012").getTime(),
        max: new Date("27 Feb 2013").getTime()
      }
    },
    "1yd": {
      xaxis: {
        min: new Date("01 Jan 2013").getTime(),
        max: new Date("27 Feb 2013").getTime()
      }
    },
    all: {
      xaxis: {
        min: undefined,
        max: undefined
      }
    }
  };

  public chartOptionsFunnel: Partial<ChartOptionsFunnel> = {
    series: [],
    chart: {
      type: "bar"
    },
    dataLabels: {},
    plotOptions: {},
    xaxis: {},
    colors: [],
    legend: {},
    title: {}
  };

  public chartOptionsDonut: Partial<ChartOptionsDonut> = {
    dataLabels: {},
  }

  constructor() {
    this.initChart();

    this.chartOptionsFunnel = {
      series: [
        {
          name: "Funnel Series",
          data: [1380, 1100, 990, 880, 740, 548, 330, 200]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 0,
          horizontal: true,
          barHeight: "80%",
          isFunnel: true
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any, opt: any) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
        },
        dropShadow: {
          enabled: true
        },
      },
      title: {
        text: "Product Funnel",
        align: "center"
      },
      xaxis: {
        categories: [
          "Smartphones",
          "Laptops",
          "Gaming Consoles",
          "Smart Watches",
          "Tablets",
          "Accessories",
          "Lows",
          "a",
        ],
      },
      legend: {
        show: false
      }
    } as Partial<ChartOptionsFunnel>;

    this.chartOptionsDonut = {
      series: [44, 55, 41, 17, 15],
      chart: {
        width: 380,
        type: "donut"
      },
      dataLabels: {
        enabled: true
      },
      fill: {
        type: "gradient"
      },
      legend: {
        formatter: function (val: any, opts: any) {
          const productNames = [
            "Smartphones",
            "Laptops",
            "Tablets",
            "Smart Watches",
            "Headphones"
          ];
          return productNames[opts.seriesIndex] + " - " + opts.w.globals.series[opts.seriesIndex];
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    } as Partial<ChartOptionsDonut>;
  }

  initChart(): void {
    this.chartOptions = {
      series: [
        {
          data: data
        }
      ],
      chart: {
        type: "area",
        height: 350
      },
      annotations: {
        yaxis: [
          {
            y: 30,
            borderColor: "#999",
            label: {
              text: "Support",
              style: {
                color: "#fff",
                background: "#00E396"
              }
            }
          }
        ],
        xaxis: [
          {
            x: new Date("14 Nov 2012").getTime(),
            borderColor: "#999",
            label: {
              text: "Rally",
              style: {
                color: "#fff",
                background: "#775DD0"
              }
            }
          }
        ]
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: "datetime",
        min: new Date("01 Mar 2012").getTime(),
        tickAmount: 6
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy"
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100]
        }
      }
    } as Partial<ChartOptions>;
  }

  public updateOptions(option: keyof UpdateOptionsData): void {
    this.activeOptionButton = option;
    this.chart.updateOptions(this.updateOptionsData[option], false, true, true);
  }

}

