const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) { 
      results.push(file);
    }
  });
  return results;
}

const files = walk('/Users/nick/Desktop/ScrutexityFinal/Website/scrutexity-next/src');
let modifiedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  if (content.includes('govbtn')) { 
    // Replace govbtn with clay-cta and some base utility classes to mimic the old govbtn style
    content = content.replace(/\bgovbtn\b/g, 'clay-cta px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 transition-all'); 
    changed = true; 
  }
  if (content.includes('bg-ivory')) { 
    content = content.replace(/\bbg-ivory\b/g, 'bg-cream'); 
    changed = true; 
  }
  if (content.includes('bg-terracotta')) { 
    content = content.replace(/\bbg-terracotta\b/g, 'bg-clay'); 
    changed = true; 
  }
  if (content.includes('text-terracotta')) { 
    content = content.replace(/\btext-terracotta\b/g, 'text-clay'); 
    changed = true; 
  }
  if (content.includes('border-terracotta')) { 
    content = content.replace(/\bborder-terracotta\b/g, 'border-clay'); 
    changed = true; 
  }
  
  if (changed) {
    fs.writeFileSync(file, content);
    console.log('Modified:', file);
    modifiedCount++;
  }
});

console.log(`Successfully migrated legacy classes in ${modifiedCount} files.`);
