html: 
	rm -rf dist
	cp -r fonts/ dist
	bundle exec asciidoctor -a stylesheet=styles.css --destination-dir=./dist --out-file=index.html taiko-book/src/book/book.adoc
