import { Chart } from 'chart.js';

export const legendSpacingPlugin = {
  id: 'legendSpacing',
  beforeInit(chart: Chart) {
    const originalFit = (chart.legend as any).fit;
    (chart.legend as any).fit = function fit() {
      originalFit.bind(chart.legend)();
      this.height += 20;
    }
  }
};
