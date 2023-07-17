

export function parseMetricsResponse(response: string) {
  const metrics: Record<string, number> = {};
  response
    .replace(/^#.+/gm, '') // remove comments
    .replace(/\n+/g, '\n') // merge multiple new lines
    .replace(/^\n/g, '') // remove empty new line
    .replace(/{}/g, '') // remove curly braces
    .split('\n')
    .forEach((str: string) => {
      const [key, value] = str.split(' ');
      metrics[key] = Number(value);
    });

  return metrics
}