scraper_path = r'C:\Users\Chris\drift-backend\src\scraper\index.js'
with open(scraper_path, 'r', encoding='utf-8') as f:
    sc = f.read()

# 1. Fix ambiguous short service names
sc = sc.replace(
    "  'ring', 'nest', 'costco', 'walmart+',",
    "  'ring doorbell', 'google nest', 'costco membership', 'walmart+',"
)

# 2. Replace loose matching with stricter matching
old_block = """        // Check if it mentions a service we track AND contains change keywords
        const matchedService = SERVICE_NAMES.find(svc => combined.includes(svc));
        const matchedKeyword = CHANGE_KEYWORDS.find(kw => combined.includes(kw));

        if (matchedService && matchedKeyword) {"""

new_block = """        // Check if it mentions a service we track AND contains change keywords
        // Use word boundaries to avoid false matches
        const matchedService = SERVICE_NAMES.find(svc => {
          const escaped = svc.replace(/[.*+?^""" + """$""" + """{}()|[\\]\\\\]/g, '\\\\$&');
          const regex = new RegExp('\\\\b' + escaped + '\\\\b', 'i');
          return regex.test(combined);
        });
        const matchedKeyword = CHANGE_KEYWORDS.find(kw => combined.includes(kw));

        // Title must also mention the service to avoid false positives
        const titleHasService = matchedService ? (() => {
          const escaped = matchedService.replace(/[.*+?^""" + """$""" + """{}()|[\\]\\\\]/g, '\\\\$&');
          return new RegExp('\\\\b' + escaped + '\\\\b', 'i').test(title);
        })() : false;

        if (matchedService && matchedKeyword && titleHasService) {"""

sc = sc.replace(old_block, new_block)

# 3. Strip HTML from description before storing
old_desc = "description: description.substring(0, 500),"
new_desc = "description: description.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&#038;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\\s+/g, ' ').trim().substring(0, 500),"
sc = sc.replace(old_desc, new_desc)

with open(scraper_path, 'w', encoding='utf-8') as f:
    f.write(sc)
print('Scraper fixed!')
