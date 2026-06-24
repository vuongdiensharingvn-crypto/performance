// cli/index.ts
import { Command } from 'commander';
import { generateUtmLink } from './utm-generator';

const program = new Command();

program
  .name('perf-cli')
  .description('CLI Tool for Performance Marketing Funnel Automation')
  .version('1.0.0');

program.command('utm')
  .description('Tạo UTM link chuẩn')
  .requiredOption('-u, --url <url>', 'Base URL')
  .requiredOption('-s, --source <source>', 'Traffic Source')
  .requiredOption('-m, --medium <medium>', 'Traffic Medium')
  .requiredOption('-c, --campaign <campaign>', 'Campaign Name')
  .action((options) => {
    const link = generateUtmLink({
      baseUrl: options.url,
      source: options.source,
      medium: options.medium,
      campaign: options.campaign
    });
    console.log('\n✅ Link Tracking của bạn:\n');
    console.log(link);
    console.log('\n');
  });

program.parse(process.argv);
