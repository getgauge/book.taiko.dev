.DEFAULT_GOAL := html

bundle:
	bundle install --path vendor/bundle --quiet

html: bundle
	bundle exec asciidoctor taiko.asc -o index.html
