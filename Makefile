.PHONY: help build run update


build:
	npm run docs:build
	cp -r docs/pri_assets docs/.vuepress/dist/

run:
	npm run docs:dev

update:
	cp -r ./docs/.vuepress/dist/* ~/http/newbook/
