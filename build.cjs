const fs=require('fs'),path=require('path');
const source=__dirname,root=path.dirname(source);
let html=fs.readFileSync(path.join(source,'shell.html'),'utf8');
const css=fs.readFileSync(path.join(source,'styles.css'),'utf8');
const scripts=['core.js','data.js','maps.js','app.js'].map(f=>fs.readFileSync(path.join(source,f),'utf8'));
if(scripts.some(s=>/<\/script/i.test(s)))throw new Error('Unexpected script closing tag');
html=html.replace('<!--STYLE-->','<style>\n'+css+'\n</style>').replace('<!--SCRIPTS-->',scripts.map(s=>'<script>\n'+s+'\n</script>').join('\n'));
fs.writeFileSync(path.join(root,'index.html'),html);
console.log('index.html ready');
