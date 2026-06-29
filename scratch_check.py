from html.parser import HTMLParser

class MyHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.void_tags = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr', '!doctype'}

    def handle_starttag(self, tag, attrs):
        if tag.lower() not in self.void_tags:
            self.stack.append((tag, self.getpos()[0]))

    def handle_endtag(self, tag):
        if tag.lower() not in self.void_tags:
            if not self.stack:
                print(f"Error: Unmatched end tag </{tag}> at line {self.getpos()[0]}")
            else:
                last_tag, last_line = self.stack.pop()
                if last_tag != tag:
                    print(f"Error: Mismatched tags, expected </{last_tag}> (from line {last_line}) but got </{tag}> at line {self.getpos()[0]}")

parser = MyHTMLParser()
parser.feed(open('index.html', 'r', encoding='utf-8').read())
print("Remaining unclosed tags:", parser.stack)
