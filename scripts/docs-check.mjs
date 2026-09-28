import fs from 'node:fs';
import path from 'node:path';
const files=fs.readdirSync('md').filter(f=>f.endsWith('.md'));
if(files.length!==22)throw new Error(`Expected the 22 supplied specifications, found ${files.length}`);
let links=0;
for(const file of files){
  const text=fs.readFileSync(path.join('md',file),'utf8');
  if(!text.startsWith('# '))throw new Error(`Missing title: ${file}`);
  for(const match of text.matchAll(/\]\(([^)#]+\.md)(?:#[^)]*)?\)/g)){
    if(!fs.existsSync(path.resolve('md',match[1])))throw new Error(`Broken local link ${file} -> ${match[1]}`);
    links++;
  }
}
console.log(`Checked ${files.length} specification files and ${links} local Markdown links.`);
