# sportacle.io
Sportacle github pages site

# Landing page
https://github.com/tailwindtoolbox/App-Landing-Page

# Development
## Tailwind CSS
Watch for changes in the input.css file and output to the output.css file
`npx tailwindcss -i ./src/input.css -o ./docs/output.css --watch`

Jekyll requires Ruby 3.0.0 or higher.  Setup a Ruby environment manager
`chruby ruby-install xz`
```
# Add the following to ~/.zprofile
# update for ruby
source /opt/homebrew/opt/chruby/share/chruby/chruby.sh
source /opt/homebrew/opt/chruby/share/chruby/auto.sh

ruby-install ruby
```

## How to run locally
Gemfile needs to be updated to use the jekyll instead of github-pages gem.  Once this is changed, we can service locally with the following command:
`bundle exec jekyll serve --livereload` and access at http://localhost:4000/docs/

