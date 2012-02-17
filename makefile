css_output_file = assets/css/styles.min.css
javascript_output_file = assets/javascript/scripts.min.js

css_input = assets/css/normalize.css/normalize.css\
			assets/css/pygments/native.css

less_input = assets/less/main.less

javascript_input = 	assets/javascript/mootools.js\
					assets/javascript/main.js

default: css javascript site

css:
	(cat $(css_input); if [ "${less_input}" ]; then lessc $(less_input); fi) | cleancss -o $(css_output_file)

javascript:
	cat $(javascript_input) | uglifyjs -nc -o $(javascript_output_file)

update-submodules:
	git submodule foreach git pull origin master

site:
	jekyll --pygments

server:
	jekyll --auto --server --pygments